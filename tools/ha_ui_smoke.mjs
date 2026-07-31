#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";


const require = createRequire(import.meta.url);
require("node:module").Module._initPaths();


function parseArguments(argv) {
  const values = {
    baseUrl: process.env.HASS_PLAYWRIGHT_BASE_URL || "http://192.168.10.10:8123",
    outputDir: process.env.HASS_PLAYWRIGHT_OUTPUT_DIR || "output/playwright/ha-ui-smoke",
    routesJson: process.env.HASS_UI_ROUTES_JSON || "[]",
    headed: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--headed") {
      values.headed = true;
      continue;
    }
    const next = argv[index + 1];
    if (!next) {
      throw new Error(`Missing value for ${argument}`);
    }
    if (argument === "--base-url") {
      values.baseUrl = next;
    } else if (argument === "--output-dir") {
      values.outputDir = next;
    } else if (argument === "--routes-json") {
      values.routesJson = next;
    } else {
      throw new Error(`Unknown argument ${argument}`);
    }
    index += 1;
  }
  return values;
}


function loadPlaywright() {
  const modulePath = process.env.PLAYWRIGHT_MODULE_PATH;
  try {
    return modulePath ? require(modulePath) : require("playwright");
  } catch (error) {
    throw new Error(
      "Playwright is not available. Install the playwright package or set "
        + "PLAYWRIGHT_MODULE_PATH to its module directory. "
        + `Original error: ${error.message}`,
    );
  }
}


function findBrowserExecutable(chromium) {
  const configured = process.env.HASS_PLAYWRIGHT_EXECUTABLE_PATH;
  if (configured) {
    if (!fs.existsSync(configured)) {
      throw new Error(`Configured browser executable does not exist: ${configured}`);
    }
    return configured;
  }

  const candidates = [];
  try {
    candidates.push(chromium.executablePath());
  } catch {
    // Fall through to installed browser candidates.
  }
  if (process.platform === "win32") {
    candidates.push(
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    );
  }
  return candidates.find((candidate) => candidate && fs.existsSync(candidate));
}


function safeScreenshotName(route) {
  const value = route.replace(/^\/+/, "").replace(/[^A-Za-z0-9_-]+/g, "-");
  return value || "root";
}


function expectedView(route) {
  const parts = route.split("/").filter(Boolean);
  if (parts.length <= 1) {
    return { index: 0, path: null };
  }
  const requested = parts[parts.length - 1];
  if (/^\d+$/.test(requested)) {
    return { index: Number(requested), path: null };
  }
  return { index: null, path: requested };
}


function isIgnoredConsoleError(message) {
  return [
    /ResizeObserver loop/i,
    /favicon\.ico/i,
    /^Failed to load resource: the server responded with a status of \d+ \([^)]+\)$/,
  ].some((pattern) => pattern.test(message));
}


function isIgnoredFailedResponse(response) {
  if (response.status() !== 404) {
    return false;
  }
  const url = new URL(response.url());
  // Bubble Card probes this legacy optional file when Bubble Card Tools is absent.
  return url.pathname === "/local/bubble/bubble-modules.yaml";
}


async function validateRoute(page, baseUrl, route, outputDir) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedResponses = [];
  const onConsole = (message) => {
    if (message.type() === "error" && !isIgnoredConsoleError(message.text())) {
      consoleErrors.push(message.text());
    }
  };
  const onPageError = (error) => pageErrors.push(error.message);
  const onResponse = (response) => {
    if (response.status() >= 400 && !isIgnoredFailedResponse(response)) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  };
  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("response", onResponse);

  const failures = [];
  const screenshotPath = path.join(outputDir, `${safeScreenshotName(route)}.png`);
  const url = `${baseUrl.replace(/\/$/, "")}${route}`;
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    if (!response || response.status() < 200 || response.status() >= 400) {
      failures.push(`HTTP status ${response ? response.status() : "missing"}`);
    }
    if (/\/(login|auth\/authorize)\b/.test(page.url())) {
      failures.push(`redirected to authentication at ${page.url()}`);
    }

    await page.locator("home-assistant").waitFor({ state: "attached", timeout: 20_000 });
    await page.locator("hui-root").waitFor({ state: "attached", timeout: 20_000 });
    await page.locator("hui-root").evaluate(async (element) => {
      const deadline = Date.now() + 20_000;
      while (!element.lovelace?.config?.views) {
        if (Date.now() >= deadline) {
          throw new Error("Lovelace configuration did not finish loading");
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    });
    await page.waitForTimeout(1_200);

    const renderedViews = await page.locator("hui-view").count();
    if (renderedViews < 1) {
      failures.push("no rendered hui-view found");
    }
    // Some async custom cards briefly render an error card before their HA
    // entity attributes arrive. Re-check after hydration before failing the
    // route so the smoke test measures the settled UI rather than the load
    // transition.
    let errorCards = await page.locator("hui-error-card").count();
    if (errorCards > 0) {
      await page.waitForTimeout(4_000);
      errorCards = await page.locator("hui-error-card").count();
    }
    if (errorCards > 0) {
      failures.push(`${errorCards} hui-error-card element(s) rendered`);
    }

    const lovelace = await page.locator("hui-root").evaluate((element) => ({
      paths: (element.lovelace?.config?.views || []).map((view) => view.path ?? null),
    }));
    const renderedIndex = await page.locator("hui-view").evaluate((element) => element.index);
    const expected = expectedView(route);
    if (expected.index !== null && renderedIndex !== expected.index) {
      failures.push(
        `requested view index ${expected.index}, Lovelace rendered ${renderedIndex}`,
      );
    }
    if (expected.path !== null) {
      const expectedIndex = lovelace.paths.indexOf(expected.path);
      if (expectedIndex < 0) {
        failures.push(`requested view path ${expected.path} is not configured`);
      } else if (renderedIndex !== expectedIndex) {
        failures.push(
          `requested view path ${expected.path} at index ${expectedIndex}, `
            + `Lovelace rendered index ${renderedIndex}`,
        );
      }
    }

    if (pageErrors.length > 0) {
      failures.push(`page errors: ${pageErrors.join(" | ")}`);
    }
    if (consoleErrors.length > 0) {
      failures.push(`console errors: ${consoleErrors.join(" | ")}`);
    }
    if (failedResponses.length > 0) {
      failures.push(`failed responses: ${failedResponses.join(" | ")}`);
    }
  } catch (error) {
    failures.push(error.message);
  } finally {
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    page.off("response", onResponse);
  }

  if (failures.length > 0) {
    fs.mkdirSync(outputDir, { recursive: true });
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (error) {
      failures.push(`screenshot failed: ${error.message}`);
    }
    return { route, failures, screenshotPath };
  }
  if (fs.existsSync(screenshotPath)) {
    fs.unlinkSync(screenshotPath);
  }
  return { route, failures: [], screenshotPath: null };
}


async function main() {
  const options = parseArguments(process.argv.slice(2));
  let routes;
  try {
    routes = JSON.parse(options.routesJson);
  } catch (error) {
    throw new Error(`Invalid routes JSON: ${error.message}`);
  }
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error("At least one validated dashboard route is required");
  }
  if (routes.some((route) => typeof route !== "string" || !route.startsWith("/"))) {
    throw new Error("Every dashboard route must be an absolute path string");
  }

  const { chromium } = loadPlaywright();
  const executablePath = findBrowserExecutable(chromium);
  const launchOptions = {
    headless: !options.headed,
    ...(executablePath ? { executablePath } : {}),
  };
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const results = [];
  try {
    for (const route of routes) {
      const page = await context.newPage();
      try {
        const result = await validateRoute(page, options.baseUrl, route, options.outputDir);
        results.push(result);
        if (result.failures.length === 0) {
          console.log(`OK   ${route}`);
        } else {
          console.error(`FAIL ${route}: ${result.failures.join("; ")}`);
          console.error(`     screenshot: ${result.screenshotPath}`);
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  const failed = results.filter((result) => result.failures.length > 0);
  if (failed.length > 0) {
    console.error(`UI smoke failed: ${failed.length}/${results.length} routes failed`);
    process.exitCode = 2;
    return;
  }
  console.log(`UI smoke passed: ${results.length} rendered Lovelace routes validated`);
}


main().catch((error) => {
  console.error(`UI smoke setup failed: ${error.message}`);
  process.exitCode = 2;
});
