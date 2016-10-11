"""
Controller to interface with the YouTube-app.

Use the media controller to play, pause etc.
"""
from . import BaseController

MESSAGE_TYPE = "type"
TYPE_STATUS = "mdxSessionStatus"
ATTR_SCREEN_ID = "screenId"


class YouTubeController(BaseController):
    """ Controller to interact with Youtube namespace. """

    def __init__(self):
        super(YouTubeController, self).__init__(
            "urn:x-cast:com.google.youtube.mdx", "233637DE")

        self.screen_id = None

    def receive_message(self, message, data):
        """ Called when a media message is received. """
        if data[MESSAGE_TYPE] == TYPE_STATUS:
            self._process_status(data.get('data'))

            return True

        else:
            return False

    def play_video(self, youtube_id):
        """
        Starts playing a video in the YouTube app.

        Only works if there is no video playing.
        """
        self.launch()

        msg = {
            "type": "flingVideo",
            "data": {
                "currentTime": 0,
                "videoId": youtube_id
            }
        }

        self.send_message(msg, inc_session_id=True)

    def _process_status(self, status):
        """ Process latest status update. """
        self.screen_id = status.get(ATTR_SCREEN_ID)
