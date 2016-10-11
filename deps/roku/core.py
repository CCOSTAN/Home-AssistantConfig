import logging
import requests
import xml.etree.ElementTree as ET

from six.moves.urllib_parse import urlparse

from roku import discovery

__version__ = '3.1.2'

roku_logger = logging.getLogger('roku')

COMMANDS = {
    'home': 'Home',
    'reverse': 'Rev',
    'forward': 'Fwd',
    'play': 'Play',
    'select': 'Select',
    'left': 'Left',
    'right': 'Right',
    'down': 'Down',
    'up': 'Up',
    'back': 'Back',
    'replay': 'InstantReplay',
    'info': 'Info',
    'backspace': 'Backspace',
    'search': 'Search',
    'enter': 'Enter',
    'literal': 'Lit',
    'volume_down': 'VolumeDown',
    'volume_mute': 'VolumeMute',
    'volume_up': 'VolumeUp',
}

SENSORS = ('acceleration', 'magnetic', 'orientation', 'rotation')

TOUCH_OPS = ('up', 'down', 'press', 'move', 'cancel')


class RokuException(Exception):
    pass


class Application(object):

    def __init__(self, id, version, name, roku=None):
        self.id = str(id)
        self.version = version
        self.name = name
        self.roku = roku

    def __repr__(self):
        return ('<Application: [%s] %s v%s>' %
                (self.id, self.name, self.version))

    @property
    def icon(self):
        if self.roku:
            return self.roku.icon(self)

    def launch(self):
        if self.roku:
            self.roku.launch(self)

    def store(self):
        if self.roku:
            self.roku.store(self)


class DeviceInfo(object):

    def __init__(self, modelname, modelnum, swversion, sernum, userdevicename):
        self.modelname = modelname
        self.modelnum = modelnum
        self.swversion = swversion
        self.sernum = sernum
        self.userdevicename = userdevicename

    def __repr__(self):
        return ('<DeviceInfo: %s-%s, SW v%s, Ser# %s, Name %s>' %
                (self.modelname, self.modelnum, self.swversion, self.sernum, self.userdevicename))


class Roku(object):

    @classmethod
    def discover(self, *args, **kwargs):
        rokus = []
        for device in discovery.discover(*args, **kwargs):
            o = urlparse(device.location)
            rokus.append(Roku(o.hostname, o.port))
        return rokus

    def __init__(self, host, port=8060):
        self.host = host
        self.port = port
        self._conn = None

    def __repr__(self):
        return "<Roku: %s:%s>" % (self.host, self.port)

    def __getattr__(self, name):

        if name not in COMMANDS and name not in SENSORS:
            raise AttributeError('%s is not a valid method' % name)

        def command(*args):
            if name in SENSORS:
                keys = ['%s.%s' % (name, axis) for axis in ('x', 'y', 'z')]
                params = dict(zip(keys, args))
                self.input(params)
            elif name == 'literal':
                for char in args[0]:
                    path = '/keypress/%s_%s' % (COMMANDS[name], char.upper())
                    self._post(path)
            else:
                path = '/keypress/%s' % COMMANDS[name]
                self._post(path)

        return command

    def __getitem__(self, key):
        key = str(key)
        app = self._app_for_name(key)
        if not app:
            app = self._app_for_id(key)
        return app

    def _app_for_name(self, name):
        for app in self.apps:
            if app.name == name:
                return app

    def _app_for_id(self, app_id):
        for app in self.apps:
            if app.id == app_id:
                return app

    def _connect(self):
        if self._conn is None:
            self._conn = requests.Session()

    def _get(self, path, *args, **kwargs):
        return self._call('GET', path, *args, **kwargs)

    def _post(self, path, *args, **kwargs):
        return self._call('POST', path, *args, **kwargs)

    def _call(self, method, path, *args, **kwargs):

        self._connect()

        roku_logger.debug(path)

        url = 'http://%s:%s%s' % (self.host, self.port, path)

        if method not in ('GET', 'POST'):
            raise ValueError('only GET and POST HTTP methods are supported')

        func = getattr(self._conn, method.lower())
        resp = func(url, *args, **kwargs)

        if resp.status_code != 200:
            raise RokuException(resp.content)

        return resp.content

    @property
    def apps(self):
        applications = []
        resp = self._get('/query/apps')
        root = ET.fromstring(resp)
        for app_node in root:
            app = Application(
                id=app_node.get('id'),
                version=app_node.get('version'),
                name=app_node.text,
                roku=self,
            )
            applications.append(app)
        return applications

    @property
    def device_info(self):
        resp = self._get('/query/device-info')
        root = ET.fromstring(resp)

        dinfo = DeviceInfo(
            modelname=root.find('model-name').text,
            modelnum=root.find('model-number').text,
            swversion=''.join([
                root.find('software-version').text,
                '.',
                root.find('software-build').text
            ]),
            sernum=root.find('serial-number').text,
            userdevicename=root.find('user-device-name').text
        )
        return dinfo

    @property
    def commands(self):
        return sorted(COMMANDS.keys())

    def icon(self, app):
        return self._get('/query/icon/%s' % app.id)

    def launch(self, app):
        if app.roku and app.roku != self:
            raise RokuException('this app belongs to another Roku')
        return self._post('/launch/%s' % app.id)

    def store(self, app):
        return self._post('/launch/11', params={'contentID': app.id})

    def input(self, params):
        return self._post('/input', params=params)

    def touch(self, x, y, op='down'):

        if op not in TOUCH_OPS:
            raise RokuException('%s is not a valid touch operation' % op)

        params = {
            'touch.0.x': x,
            'touch.0.y': y,
            'touch.0.op': op,
        }

        self.input(params)

    @property
    def current_app(self):
        resp = self._get('/query/active-app')
        root = ET.fromstring(resp)

        app_node = root.find('screensaver')
        if app_node is None:
            app_node = root.find('app')

        if app_node is None:
            return None

        return Application(
            id=app_node.get('id'),
            version=app_node.get('version'),
            name=app_node.text,
            roku=self,
        )
