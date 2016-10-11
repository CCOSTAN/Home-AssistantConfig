"""
Methods to interface with the YouTube application.
"""
from .config import APP_ID
from .error import NoChromecastFoundError


def play_youtube_video(video_id, host=None, cast=None, **filters):
    """ Starts the YouTube app if it is not running and plays
        specified video. """

    data = {"v": video_id}

    _start_youtube(data, host, cast, **filters)


def play_youtube_playlist(playlist_id, host=None, cast=None, **filters):
    """ Starts the YouTube app if it is not running and plays
        specified playlist. """

    data = {"listType": "playlist", "list": playlist_id}

    _start_youtube(data, host, cast, **filters)


def _start_youtube(data, host, cast, **filters):
    """ Helper method to launch the YouTube application. """

    # For backwards compatibility with 0.4.4
    if host:
        filters['ip'] = host

    if not cast:
        from . import get_chromecast

        cast = get_chromecast(strict=False, **filters)

    if not cast:
        raise NoChromecastFoundError()

    cast.start_app(APP_ID["YOUTUBE"], data)
