import unittest
from .core import Roku, COMMANDS

TEST_APPS = (
    ('11', '1.0.1', 'Fake Roku Channel Store'),
    ('22', '2.0.2', 'Fake Netflix'),
    ('33', '3.0.3', 'Fake YouTube'),
)

TEST_DEV_INFO = ''.join([
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<device-info>',
    '    <udn>00000000-1111-2222-3333-444444444444</udn>',
    '    <serial-number>111111111111</serial-number>',
    '    <device-id>222222222222</device-id>',
    '    <vendor-name>Roku</vendor-name>',
    '    <model-number>4200X</model-number>',
    '    <model-name>Roku 3</model-name>',
    '    <wifi-mac>00:11:22:33:44:55</wifi-mac>',
    '    <ethernet-mac>00:11:22:33:44:56</ethernet-mac>',
    '    <network-type>ethernet</network-type>',
    '    <user-device-name/>',
    '    <software-version>7.00</software-version>',
    '    <software-build>09044</software-build>',
    '    <secure-device>true</secure-device>',
    '    <language>en</language>',
    '    <country>US</country>',
    '    <locale>en_US</locale>',
    '    <time-zone>US/Eastern</time-zone>',
    '    <time-zone-offset>-300</time-zone-offset>',
    '    <power-mode>PowerOn</power-mode>',
    '    <developer-enabled>false</developer-enabled>',
    '    <search-enabled>true</search-enabled>',
    '    <voice-search-enabled>true</voice-search-enabled>',
    '    <notifications-enabled>true</notifications-enabled>',
    '    <notifications-first-use>false</notifications-first-use>',
    '    <headphones-connected>false</headphones-connected>',
    '</device-info>'
])


class TestRoku(Roku):

    def __init__(self, *args, **kwargs):
        super(TestRoku, self).__init__(*args, **kwargs)
        self._calls = []

    def _call(self, method, path, *args, **kwargs):

        resp = None

        if path == '/query/apps':
            fmt = '<app id="%s" version="%s">%s</app>'
            resp = '<apps>%s</apps>' % "".join(fmt % a for a in TEST_APPS)
        elif path == '/query/device-info':
            resp = TEST_DEV_INFO

        self._calls.append((method, path, args, kwargs, resp))

        return resp

    def calls(self):
        return self._calls

    def last_call(self):
        return self._calls[-1]


class RokuTestCase(unittest.TestCase):

    def setUp(self):
        self.roku = TestRoku('0.0.0.0')

    def testApps(self):

        apps = self.roku.apps
        self.assertEqual(len(apps), 3)

        for i, app in enumerate(apps):
            self.assertEqual(app.id, TEST_APPS[i][0])
            self.assertEqual(app.version, TEST_APPS[i][1])
            self.assertEqual(app.name, TEST_APPS[i][2])

        app = self.roku['22']
        self.assertEqual(app.id, TEST_APPS[1][0])
        self.assertEqual(app.version, TEST_APPS[1][1])
        self.assertEqual(app.name, TEST_APPS[1][2])

        app = self.roku['Fake YouTube']
        self.assertEqual(app.id, TEST_APPS[2][0])
        self.assertEqual(app.version, TEST_APPS[2][1])
        self.assertEqual(app.name, TEST_APPS[2][2])

    def testDeviceInfo(self):

        d = self.roku.device_info

        self.assertEqual(d.modelname, 'Roku 3')
        self.assertEqual(d.modelnum, '4200X')
        self.assertEqual(d.swversion, '7.00.09044')
        self.assertEqual(d.sernum, '111111111111')

    def testCommands(self):

        for cmd in self.roku.commands:

            if cmd == 'literal':
                continue

            getattr(self.roku, cmd)()
            call = self.roku.last_call()

            self.assertEqual(call[0], 'POST')
            self.assertEqual(call[1], '/keypress/%s' % COMMANDS[cmd])
            self.assertEqual(call[2], ())
            self.assertEqual(call[3], {})

    def testLiteral(self):

        text = 'Stargate'
        self.roku.literal(text)

        for i, call in enumerate(self.roku.calls()):
            self.assertEqual(call[0], 'POST')
            self.assertEqual(call[1], '/keypress/Lit_%s' % text[i].upper())
            self.assertEqual(call[2], ())
            self.assertEqual(call[3], {})

    def testStore(self):

        for app in self.roku.apps:

            self.roku.store(app)
            call = self.roku.last_call()

            self.assertEqual(call[0], 'POST')
            self.assertEqual(call[1], '/launch/11')
            self.assertEqual(call[2], ())
            self.assertEqual(call[3], {'params': {'contentID': app.id}})

    def testLaunch(self):

        for app in self.roku.apps:

            self.roku.launch(app)
            call = self.roku.last_call()

            self.assertEqual(call[0], 'POST')
            self.assertEqual(call[1], '/launch/%s' % app.id)
            self.assertEqual(call[2], ())
            self.assertEqual(call[3], {'params': {'contentID': app.id}})


if __name__ == '__main__':
    unittest.main()
