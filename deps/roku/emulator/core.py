from roku import Application

DEFAULT_APPS = [
    Application(1, '1.0', 'Hulu Plus'),
    Application(2, '2.0', 'TWiT'),
    Application(3, '3.0', 'Whisky Media'),
    Application(4, '4.0', 'Netflix'),
]


class Emulator(object):

    def __init__(self, apps=None):
        self._apps = apps or DEFAULT_APPS

    def __call__(self, command, *args, **kwargs):
        pass

    def add_app(self, app):
        pass

    def get_icon(self, app_id):
        pass

    def launch_app(self, app_id):
        pass

    def list_apps(self):
        pass
