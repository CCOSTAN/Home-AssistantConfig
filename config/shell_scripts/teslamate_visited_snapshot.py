#!/usr/bin/env python3
"""Cache one authenticated Grafana map render per day for a local-file camera."""

from datetime import datetime, timedelta
from io import BytesIO
import json
from pathlib import Path
import tempfile
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

from PIL import Image

CONFIG = Path('/config/secrets/teslamate_snapshot.json')
OUTPUT = Path('/config/image/teslamate_visited.png')
TIMEZONE = ZoneInfo('America/New_York')
MAX_BYTES = 10 * 1024 * 1024


def refresh(config_path=CONFIG, output=OUTPUT):
    """Replace the cached image only after a complete, valid PNG arrives."""
    now = datetime.now(TIMEZONE)
    due = now.replace(hour=6, minute=0, second=0, microsecond=0)
    if now < due:
        due -= timedelta(days=1)
    updated = datetime.fromtimestamp(output.stat().st_mtime, TIMEZONE) if output.exists() else None
    error = None
    if updated is None or updated < due:
        try:
            config = json.loads(config_path.read_text())
            request = Request(config['render_url'], headers={
                'Authorization': 'Bearer ' + config['token'],
                'Accept': 'image/png',
            })
            with urlopen(request, timeout=150) as response:
                if response.headers.get_content_type() != 'image/png':
                    raise ValueError('Expected a PNG response')
                data = response.read(MAX_BYTES + 1)
            if len(data) > MAX_BYTES:
                raise ValueError('Image exceeds size limit')
            with Image.open(BytesIO(data)) as img:
                if img.format != 'PNG' or img.width < 800 or img.height < 400:
                    raise ValueError('Unexpected image format or dimensions')
                img.verify()
            output.parent.mkdir(parents=True, exist_ok=True)
            with tempfile.NamedTemporaryFile(dir=output.parent, suffix='.png', delete=False) as file:
                temporary = Path(file.name)
                file.write(data)
            try:
                temporary.replace(output)
            finally:
                temporary.unlink(missing_ok=True)
            updated = datetime.fromtimestamp(output.stat().st_mtime, TIMEZONE)
        except Exception as exc:
            # Keep URLs, credentials, and upstream error bodies out of HA state/logs.
            error = type(exc).__name__
    return {
        'updated_at': updated.isoformat() if updated else None,
        'last_error': error,
        'stale': updated is None or updated < due,
    }


if __name__ == '__main__':
    print(json.dumps(refresh()))
