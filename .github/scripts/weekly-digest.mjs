const repository = process.env.GITHUB_REPOSITORY || "CCOSTAN/Home-AssistantConfig";
const [owner, repo] = repository.split("/");
const serverUrl = process.env.GITHUB_SERVER_URL || "https://github.com";
const apiUrl = process.env.GITHUB_API_URL || "https://api.github.com";
const token = process.env.GITHUB_TOKEN || "";
const dryRun = process.env.DIGEST_DRY_RUN === "1" || process.argv.includes("--dry-run");

if (!owner || !repo) {
  throw new Error(`GITHUB_REPOSITORY must be owner/repo, got "${repository}"`);
}

if (!token && !dryRun) {
  throw new Error("GITHUB_TOKEN is required unless DIGEST_DRY_RUN=1 is set.");
}

const now = process.env.DIGEST_NOW ? new Date(process.env.DIGEST_NOW) : new Date();
const end = process.env.DIGEST_END ? new Date(process.env.DIGEST_END) : now;
const start = process.env.DIGEST_START
  ? new Date(process.env.DIGEST_START)
  : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

for (const [name, date] of [["DIGEST_START", start], ["DIGEST_END", end]]) {
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${name} is not a valid date.`);
  }
}

const defaultHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "home-assistant-config-weekly-digest",
};

if (token) {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

function formatDigestDate(date) {
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "UTC" }).format(date);
  const month = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(date);
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "UTC" }).format(date);
  return `${day} ${month}, ${year}`;
}

function formatCountVerb(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function searchRange(field) {
  return `${field}:${start.toISOString()}..${end.toISOString()}`;
}

function isWithinWindow(value) {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date >= start && date <= end;
}

function markdownLink(label, url) {
  const safeLabel = String(label || "unknown").replace(/[[\]]/g, "\\$&");
  return `[${safeLabel}](${url})`;
}

function userLink(user) {
  if (!user || !user.login) {
    return "unknown";
  }

  return markdownLink(user.login, user.html_url || `${serverUrl}/${user.login}`);
}

function issueLine(item, icon) {
  return `${icon} #${item.number} ${markdownLink(item.title, item.html_url)}, by ${userLink(item.user)}`;
}

function commitLine(commit) {
  const title = commit.commit?.message?.split("\n")[0] || commit.sha;
  const author = commit.author
    ? userLink(commit.author)
    : commit.commit?.author?.name || "unknown";
  return `:hammer_and_wrench: ${markdownLink(title, commit.html_url)} by ${author}`;
}

function releaseLine(release) {
  const label = release.name || release.tag_name;
  return `:bookmark: ${markdownLink(label, release.html_url)}`;
}

function stargazerLine(star) {
  return `:star: ${userLink(star.user)}`;
}

function sectionDivider(lines) {
  lines.push("");
  lines.push(" - - - ");
}

async function githubRequest(method, path, options = {}) {
  const query = options.query || {};
  const url = new URL(`${apiUrl}${path}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || text || response.statusText;
    throw new Error(`${method} ${url.pathname} failed: ${response.status} ${message}`);
  }

  return { data, headers: response.headers };
}

async function getAllPages(path, options = {}) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await githubRequest("GET", path, {
      ...options,
      query: {
        ...(options.query || {}),
        per_page: 100,
        page,
      },
    });

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    results.push(...data);

    if (data.length < 100) {
      break;
    }

    page += 1;
  }

  return results;
}

async function searchIssues(query) {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await githubRequest("GET", "/search/issues", {
      query: {
        q: query,
        sort: "created",
        order: "asc",
        per_page: 100,
        page,
      },
    });

    const items = data.items || [];
    results.push(...items);

    if (items.length < 100 || results.length >= data.total_count) {
      break;
    }

    page += 1;
  }

  return results;
}

function hasLabel(item, labelName) {
  return (item.labels || []).some((label) => label.name === labelName);
}

async function getCreatedIssueItems() {
  const items = await searchIssues(`repo:${owner}/${repo} ${searchRange("created")}`);
  return items.filter((item) => !hasLabel(item, "weekly-digest"));
}

async function getPullRequests() {
  const updated = await searchIssues(`repo:${owner}/${repo} is:pr ${searchRange("updated")}`);
  const merged = await searchIssues(`repo:${owner}/${repo} is:pr ${searchRange("merged")}`);
  const byNumber = new Map();

  for (const item of [...updated, ...merged]) {
    byNumber.set(item.number, item);
  }

  const pulls = [];
  for (const item of byNumber.values()) {
    const { data } = await githubRequest("GET", `/repos/${owner}/${repo}/pulls/${item.number}`);
    pulls.push({
      ...item,
      merged_at: data.merged_at,
    });
  }

  return pulls.sort((a, b) => a.number - b.number);
}

async function getCommits() {
  const commits = await getAllPages(`/repos/${owner}/${repo}/commits`, {
    query: {
      since: start.toISOString(),
      until: end.toISOString(),
    },
  });

  return commits.sort((a, b) => new Date(a.commit.author.date) - new Date(b.commit.author.date));
}

async function getReleases() {
  const releases = await getAllPages(`/repos/${owner}/${repo}/releases`);
  return releases
    .filter((release) => isWithinWindow(release.published_at || release.created_at))
    .sort((a, b) => new Date(a.published_at || a.created_at) - new Date(b.published_at || b.created_at));
}

async function getStargazers() {
  const stars = await getAllPages(`/repos/${owner}/${repo}/stargazers`, {
    headers: {
      Accept: "application/vnd.github.star+json",
    },
  });

  return stars
    .filter((star) => isWithinWindow(star.starred_at))
    .sort((a, b) => new Date(a.starred_at) - new Date(b.starred_at));
}

function getReactionTotal(item) {
  const reactions = item.reactions || {};
  return (reactions["+1"] || 0) + (reactions.smile || 0) + (reactions.tada || 0) + (reactions.heart || 0);
}

function appendIssues(lines, createdItems) {
  const openItems = createdItems.filter((item) => item.state === "open");
  const closedItems = createdItems.filter((item) => item.state === "closed");
  const likedItem = [...createdItems].sort((a, b) => getReactionTotal(b) - getReactionTotal(a))[0];
  const noisyItem = [...createdItems].sort((a, b) => (b.comments || 0) - (a.comments || 0))[0];

  lines.push("# ISSUES");
  lines.push(`Last week ${createdItems.length} issues were created.`);
  lines.push(`Of these, ${closedItems.length} issues have been closed and ${openItems.length} issues are still open.`);

  if (openItems.length > 0) {
    lines.push("## OPEN ISSUES");
    lines.push(...openItems.map((item) => issueLine(item, ":green_heart:")));
  }

  if (closedItems.length > 0) {
    lines.push("## CLOSED ISSUES");
    lines.push(...closedItems.map((item) => issueLine(item, ":heart:")));
  }

  if (likedItem && getReactionTotal(likedItem) > 0) {
    const reactions = likedItem.reactions || {};
    lines.push("## LIKED ISSUE");
    lines.push(issueLine(likedItem, ":+1:"));
    lines.push(
      `It received :+1: x${reactions["+1"] || 0}, :smile: x${reactions.smile || 0}, :tada: x${
        reactions.tada || 0
      } and :heart: x${reactions.heart || 0}.`,
    );
  }

  if (noisyItem && noisyItem.comments > 0) {
    lines.push("## NOISY ISSUE");
    lines.push(issueLine(noisyItem, ":speaker:"));
    lines.push(`It received ${noisyItem.comments} comments.`);
  }
}

function appendPullRequests(lines, pulls) {
  const openPulls = pulls.filter((pull) => pull.state === "open");
  const mergedPulls = pulls.filter((pull) => isWithinWindow(pull.merged_at));
  const closedPulls = pulls.filter((pull) => pull.state === "closed" && !isWithinWindow(pull.merged_at));

  lines.push("# PULL REQUESTS");

  if (pulls.length === 0) {
    lines.push("Last week, no pull requests were created, updated or merged.");
    return;
  }

  lines.push(`Last week, ${pulls.length} pull requests were created, updated or merged.`);

  if (openPulls.length > 0) {
    lines.push(`## OPEN PULL ${formatCountVerb(openPulls.length, "REQUEST", "REQUESTS")}`);
    lines.push(...openPulls.map((item) => issueLine(item, ":green_heart:")));
  }

  if (closedPulls.length > 0) {
    lines.push(`## CLOSED PULL ${formatCountVerb(closedPulls.length, "REQUEST", "REQUESTS")}`);
    lines.push(...closedPulls.map((item) => issueLine(item, ":heart:")));
  }

  if (mergedPulls.length > 0) {
    lines.push(`## MERGED PULL ${formatCountVerb(mergedPulls.length, "REQUEST", "REQUESTS")}`);
    lines.push(...mergedPulls.map((item) => issueLine(item, ":purple_heart:")));
  }
}

function appendCommits(lines, commits) {
  lines.push("# COMMITS");

  if (commits.length === 0) {
    lines.push("Last week there were no commits.");
    return;
  }

  lines.push(`Last week there were ${commits.length} commits.`);
  lines.push(...commits.map(commitLine));
}

function appendContributors(lines, commits, createdItems, pulls) {
  const contributors = new Map();

  for (const commit of commits) {
    if (commit.author?.login) {
      contributors.set(commit.author.login, commit.author);
    }
  }

  if (contributors.size === 0) {
    for (const item of [...createdItems, ...pulls]) {
      if (item.user?.login) {
        contributors.set(item.user.login, item.user);
      }
    }
  }

  lines.push("# CONTRIBUTORS");
  lines.push(`Last week there ${formatCountVerb(contributors.size, "was", "were")} ${contributors.size} contributors.`);
  lines.push(...[...contributors.values()].map((user) => `:bust_in_silhouette: ${userLink(user)}`));
}

function appendStargazers(lines, stargazers) {
  lines.push("# STARGAZERS");

  if (stargazers.length === 0) {
    lines.push("Last week there were no stagazers.");
    return;
  }

  lines.push(`Last week there were ${stargazers.length} stagazers.`);
  lines.push(...stargazers.slice(0, 75).map(stargazerLine));

  if (stargazers.length > 75) {
    lines.push(`...and ${stargazers.length - 75} more.`);
  }

  lines.push("You all are the stars! :star2:");
}

function appendReleases(lines, releases) {
  lines.push("# RELEASES");

  if (releases.length === 0) {
    lines.push("Last week there were no releases.");
    return;
  }

  lines.push(`Last week there ${formatCountVerb(releases.length, "was", "were")} ${releases.length} releases.`);
  lines.push(...releases.map(releaseLine));
}

function buildDigestBody({ createdItems, pulls, commits, stargazers, releases }) {
  const repoUrl = `${serverUrl}/${owner}/${repo}`;
  const lines = [
    `Here's the **Weekly Digest** for [*${owner}/${repo}*](${repoUrl}):`,
  ];

  sectionDivider(lines);
  appendIssues(lines, createdItems);
  sectionDivider(lines);
  appendPullRequests(lines, pulls);
  sectionDivider(lines);
  appendCommits(lines, commits);
  sectionDivider(lines);
  appendContributors(lines, commits, createdItems, pulls);
  sectionDivider(lines);
  appendStargazers(lines, stargazers);
  sectionDivider(lines);
  appendReleases(lines, releases);
  sectionDivider(lines);
  lines.push("");
  lines.push(
    `That's all for last week, please :eyes: **Watch** and :star: **Star** the repository [*${owner}/${repo}*](${repoUrl}) to receive next weekly updates. :smiley:`,
  );
  lines.push("");
  lines.push(
    `*You can also [view all Weekly Digests by clicking here](${repoUrl}/issues?q=is:open+is:issue+label:weekly-digest).* `,
  );
  lines.push("");
  lines.push(`> Your [**Weekly Digest**](${repoUrl}/actions/workflows/weekly-digest.yml) bot. :calendar:`);

  return lines.join("\n");
}

async function getOpenDigestIssues() {
  return getAllPages(`/repos/${owner}/${repo}/issues`, {
    query: {
      state: "open",
      labels: "weekly-digest",
    },
  });
}

async function createDigestIssue(title, body) {
  const { data } = await githubRequest("POST", `/repos/${owner}/${repo}/issues`, {
    body: {
      title,
      body,
      labels: ["weekly-digest"],
    },
  });

  return data;
}

async function closeOldDigestIssue(issue, newIssue) {
  const labels = new Set((issue.labels || []).map((label) => label.name));
  labels.add("oldnews");

  await githubRequest("POST", `/repos/${owner}/${repo}/issues/${issue.number}/comments`, {
    body: {
      body: `A new weekly digest is available: #${newIssue.number}. Closing this older digest so only the latest one stays open.`,
    },
  });

  await githubRequest("PATCH", `/repos/${owner}/${repo}/issues/${issue.number}`, {
    body: {
      state: "closed",
      state_reason: "completed",
    },
  });

  try {
    await githubRequest("PATCH", `/repos/${owner}/${repo}/issues/${issue.number}`, {
      body: {
        labels: [...labels],
      },
    });
  } catch (error) {
    console.warn(`Could not add oldnews label to #${issue.number}: ${error.message}`);
  }
}

async function main() {
  const title = `Weekly Digest (${formatDigestDate(start)} - ${formatDigestDate(end)})`;
  const openDigestIssues = await getOpenDigestIssues();
  const [createdItems, pulls, commits, stargazers, releases] = await Promise.all([
    getCreatedIssueItems(),
    getPullRequests(),
    getCommits(),
    getStargazers(),
    getReleases(),
  ]);
  const body = buildDigestBody({ createdItems, pulls, commits, stargazers, releases });

  if (dryRun) {
    console.log(`DRY RUN: would create "${title}"`);
    console.log(body);
    console.log(`DRY RUN: would close ${openDigestIssues.length} older digest issues.`);
    return;
  }

  const newIssue = await createDigestIssue(title, body);
  const oldIssues = openDigestIssues.filter((issue) => issue.number !== newIssue.number);

  for (const issue of oldIssues) {
    await closeOldDigestIssue(issue, newIssue);
  }

  console.log(`Created ${newIssue.html_url}`);
  console.log(`Closed ${oldIssues.length} older digest issues.`);
}

await main();
