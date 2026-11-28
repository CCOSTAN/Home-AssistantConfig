"""Summarize completed local days for the Systems Recorder charts (issue #2081)."""

import json
import sqlite3
from collections import Counter
from datetime import date, datetime, time, timedelta
from pathlib import Path

from sqlalchemy import bindparam, text

CACHE = Path("/config/.cache/mariadb/workload.sqlite")
DAY = timedelta(days=1)
TREND_DAYS = 90
WRITER_DAYS = 30
MEAN_DAYS = 7
TOP = 10
WINDOW = "FROM states WHERE last_updated_ts >= :start AND last_updated_ts < :end"


def collect_workload(engine, cache_path=CACHE):
    # The container's TZ is the HA local timezone. Allow the final Recorder
    # commit to settle before sealing yesterday, including on DST transitions.
    end = (datetime.now() - timedelta(minutes=5)).date()
    writer_start = end - WRITER_DAYS * DAY
    trend_start = end - TREND_DAYS * DAY
    first = trend_start - (MEAN_DAYS - 1) * DAY
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache = sqlite3.connect(cache_path, timeout=30)
    try:
        cache.execute(
            "CREATE TABLE IF NOT EXISTS days "
            "(day TEXT PRIMARY KEY, total INTEGER NOT NULL, counts TEXT)"
        )
        with engine.connect() as db:
            db.exec_driver_sql("SET SESSION TRANSACTION READ ONLY")
            db.exec_driver_sql("SET SESSION max_statement_time = 30")
            oldest = db.scalar(text("SELECT MIN(last_updated_ts) FROM states"))
            db.rollback()
            if oldest is None:
                raise ValueError("Recorder contains no state rows")
            # A backfill cannot establish a full count for the first retained day.
            earliest_full = datetime.fromtimestamp(oldest).date() + DAY
            saved = {d for d, in cache.execute("SELECT day FROM days")}
            day = max(first, earliest_full)
            while day < end:
                key = day.isoformat()
                if key not in saved:
                    bounds = {
                        "start": datetime.combine(day, time.min).timestamp(),
                        "end": datetime.combine(day + DAY, time.min).timestamp(),
                    }
                    counts = None
                    if day >= writer_start:
                        rows = db.execute(text("SELECT metadata_id, COUNT(*) " + WINDOW
                                               + " GROUP BY metadata_id"), bounds)
                        counts = {int(mid or 0): n for mid, n in rows}
                        total = sum(counts.values())
                    else:
                        total = db.scalar(text("SELECT COUNT(*) " + WINDOW), bounds)
                    db.rollback()  # Release the MariaDB read view between days.
                    with cache:
                        cache.execute("INSERT OR IGNORE INTO days VALUES (?, ?, ?)",
                                      (key, total, json.dumps(counts) if counts is not None else None))
                day += DAY
            with cache:
                cache.execute("DELETE FROM days WHERE day < ?", (first.isoformat(),))
                cache.execute("UPDATE days SET counts = NULL WHERE day < ? AND counts IS NOT NULL",
                              (writer_start.isoformat(),))

            daily = {}
            writers = Counter()
            top_days = Counter()
            periods = 0
            for key, total, counts in cache.execute("SELECT day, total, counts FROM days WHERE day < ? ORDER BY day", (end.isoformat(),)):
                daily[date.fromisoformat(key)] = total
                if counts is not None and key >= writer_start.isoformat():
                    volumes = {int(mid): n for mid, n in json.loads(counts).items()}
                    writers.update(volumes)
                    top_days.update(sorted(volumes, key=lambda mid: (-volumes[mid], mid))[:TOP])
                    periods += 1

            ranked = sorted((mid for mid in writers if mid), key=lambda mid: (-writers[mid], mid))[:TOP]
            names = dict(db.execute(text("SELECT metadata_id, entity_id FROM states_meta WHERE metadata_id IN :ids")
                                    .bindparams(bindparam("ids", expanding=True)), {"ids": ranked}).all())
        volume = sum(writers.values())
        leaders = [{
            "entity_id": names.get(mid, f"Removed entity ({mid})"),
            "rows": writers[mid],
            "share": round(writers[mid] * 100 / volume, 2),
            "top_days": top_days[mid],
        } for mid in ranked]
        trend = []
        for day, total in daily.items():
            if day < trend_start:
                continue
            week = [daily.get(day - offset * DAY) for offset in range(MEAN_DAYS)]
            mean = round(sum(week) / MEAN_DAYS) if None not in week else None
            trend.append([day.isoformat(), total, mean])
        return {"through": (end - DAY).isoformat(), "daily": trend, "leaders": leaders,
                "writer_days": periods, "writer_rows": volume}
    finally:
        cache.close()
