#!/usr/bin/env python3
"""Collect MariaDB telemetry snapshots for Home Assistant command_line sensors."""

from __future__ import annotations

import json
import re
import sys
from decimal import Decimal
from pathlib import Path
from typing import Any

from sqlalchemy import create_engine, text

SECRETS_PATH = Path("/config/secrets.yaml")
RECORDER_DB_URL_KEY = "recorder_db_url"

QUERIES = {
    "live": """
        SELECT
          'running' AS status,
          ROUND(
            MAX(
              CASE
                WHEN VARIABLE_NAME = 'Queries' THEN CAST(VARIABLE_VALUE AS DECIMAL(20, 0))
              END
            ) /
            NULLIF(
              MAX(
                CASE
                  WHEN VARIABLE_NAME = 'Uptime' THEN CAST(VARIABLE_VALUE AS DECIMAL(20, 0))
                END
              ),
              0
            ),
            0
          ) AS performance,
          MAX(
            CASE
              WHEN VARIABLE_NAME = 'Threads_connected' THEN CAST(VARIABLE_VALUE AS UNSIGNED)
            END
          ) AS connections,
          MAX(
            CASE
              WHEN VARIABLE_NAME = 'Questions' THEN CAST(VARIABLE_VALUE AS UNSIGNED)
            END
          ) AS questions,
          MAX(
            CASE
              WHEN VARIABLE_NAME = 'Uptime' THEN CAST(VARIABLE_VALUE AS UNSIGNED)
            END
          ) AS uptime_seconds
        FROM information_schema.GLOBAL_STATUS
        WHERE VARIABLE_NAME IN ('Queries', 'Questions', 'Threads_connected', 'Uptime');
    """,
    "recorder": """
        WITH state_stats AS (
          SELECT
            MIN(last_updated_ts) AS min_last_updated_ts,
            COUNT(*) AS total_records
          FROM states
        )
        SELECT
          ROUND(SUM(t.data_length + t.index_length) / 1024 / 1024, 2) AS database_size_mib,
          COUNT(*) AS database_tables_count,
          DATE_FORMAT(
            FROM_UNIXTIME(ss.min_last_updated_ts),
            '%Y-%m-%d'
          ) AS database_oldest_record,
          ss.total_records AS database_total_records,
          ROUND(
            ss.total_records /
            GREATEST(DATEDIFF(NOW(), FROM_UNIXTIME(ss.min_last_updated_ts)), 1),
            0
          ) AS database_records_per_day
        FROM information_schema.tables t
        CROSS JOIN state_stats ss
        WHERE t.table_schema = 'homeassistant';
    """,
    "admin": """
        SELECT
          @@version AS version,
          ROUND(@@innodb_buffer_pool_size / 1024 / 1024 / 1024, 1) AS buffer_pool_gib,
          @@max_connections AS max_connections,
          ROUND(@@innodb_log_file_size / 1024 / 1024, 0) AS log_file_size_mib,
          ROUND(@@tmp_table_size / 1024 / 1024, 0) AS tmp_table_size_mib,
          @@innodb_io_capacity AS io_capacity,
          @@innodb_read_io_threads AS io_threads_read,
          @@innodb_write_io_threads AS io_threads_write,
          @@table_open_cache AS table_cache,
          ROUND(@@sort_buffer_size / 1024 / 1024, 0) AS sort_buffer_mib,
          ROUND(@@read_buffer_size / 1024 / 1024, 0) AS read_buffer_mib,
          ROUND(@@join_buffer_size / 1024 / 1024, 0) AS join_buffer_mib;
    """,
}


def _load_db_url() -> str:
    """Read recorder_db_url from Home Assistant secrets.yaml."""
    secrets_text = SECRETS_PATH.read_text(encoding="utf-8")
    match = re.search(
        rf"^{re.escape(RECORDER_DB_URL_KEY)}:\s*[\"']?(.*?)[\"']?\s*$",
        secrets_text,
        re.MULTILINE,
    )
    if match is None:
        raise RuntimeError(f"Missing {RECORDER_DB_URL_KEY} in {SECRETS_PATH}")
    return match.group(1)


def _json_safe(value: Any) -> Any:
    """Convert SQLAlchemy result values into JSON-serializable values."""
    if isinstance(value, Decimal):
        return float(value)
    return value


def main() -> int:
    """Run the requested query mode and emit a compact JSON payload."""
    mode = sys.argv[1].strip().lower() if len(sys.argv) > 1 else ""

    if len(sys.argv) != 2 or mode not in QUERIES:
        print(
            json.dumps(
                {
                    "error": "usage",
                    "message": "expected one mode: admin, live, recorder",
                },
                separators=(",", ":"),
            ),
            file=sys.stderr,
        )
        return 2

    engine = create_engine(_load_db_url(), pool_pre_ping=True)

    try:
        with engine.connect() as connection:
            row = connection.execute(text(QUERIES[mode])).mappings().one()
    except Exception as err:  # pragma: no cover - runtime safety path
        print(
            json.dumps(
                {"error": "query_failed", "message": str(err)},
                separators=(",", ":"),
            ),
            file=sys.stderr,
        )
        return 1

    payload = {key: _json_safe(value) for key, value in row.items()}
    print(json.dumps(payload, separators=(",", ":")))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
