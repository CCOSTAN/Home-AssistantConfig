"""Extensions to unittest for web frameworks.

Use the WebCase.getPage method to request a page from your HTTP server.

Framework Integration
=====================

If you have control over your server process, you can handle errors
in the server-side of the HTTP conversation a bit better. You must run
both the client (your WebCase tests) and the server in the same process
(but in separate threads, obviously).

When an error occurs in the framework, call server_error. It will print
the traceback to stdout, and keep any assertions you have from running
(the assumption is that, if the server errors, the page output will not
be of further significance to your tests).
"""

import pprint
import re
import socket
import sys
import time
import traceback
import types
import os
import json

import unittest

import six

from cherrypy._cpcompat import text_or_bytes, HTTPConnection
from cherrypy._cpcompat import HTTPSConnection


def interface(host):
    """Return an IP address for a client connection given the server host.

    If the server is listening on '0.0.0.0' (INADDR_ANY)
    or '::' (IN6ADDR_ANY), this will return the proper localhost."""
    if host == '0.0.0.0':
        # INADDR_ANY, which should respond on localhost.
        return "127.0.0.1"
    if host == '::':
        # IN6ADDR_ANY, which should respond on localhost.
        return "::1"
    return host


class TerseTestResult(unittest._TextTestResult):

    def printErrors(self):
        # Overridden to avoid unnecessary empty line
        if self.errors or self.failures:
            if self.dots or self.showAll:
                self.stream.writeln()
            self.printErrorList('ERROR', self.errors)
            self.printErrorList('FAIL', self.failures)


class TerseTestRunner(unittest.TextTestRunner):

    """A test runner class that displays results in textual form."""

    def _makeResult(self):
        return TerseTestResult(self.stream, self.descriptions, self.verbosity)

    def run(self, test):
        "Run the given test case or test suite."
        # Overridden to remove unnecessary empty lines and separators
        result = self._makeResult()
        test(result)
        result.printErrors()
        if not result.wasSuccessful():
            self.stream.write("FAILED (")
            failed, errored = list(map(len, (result.failures, result.errors)))
            if failed:
                self.stream.write("failures=%d" % failed)
            if errored:
                if failed:
                    self.stream.write(", ")
                self.stream.write("errors=%d" % errored)
            self.stream.writeln(")")
        return result


class ReloadingTestLoader(unittest.TestLoader):

    def loadTestsFromName(self, name, module=None):
        """Return a suite of all tests cases given a string specifier.

        The name may resolve either to a module, a test case class, a
        test method within a test case class, or a callable object which
        returns a TestCase or TestSuite instance.

        The method optionally resolves the names relative to a given module.
        """
        parts = name.split('.')
        unused_parts = []
        if module is None:
            if not parts:
                raise ValueError("incomplete test name: %s" % name)
            else:
                parts_copy = parts[:]
                while parts_copy:
                    target = ".".join(parts_copy)
                    if target in sys.modules:
                        module = reload(sys.modules[target])
                        parts = unused_parts
                        break
                    else:
                        try:
                            module = __import__(target)
                            parts = unused_parts
                            break
                        except ImportError:
                            unused_parts.insert(0, parts_copy[-1])
                            del parts_copy[-1]
                            if not parts_copy:
                                raise
                parts = parts[1:]
        obj = module
        for part in parts:
            obj = getattr(obj, part)

        if isinstance(obj, types.ModuleType):
            return self.loadTestsFromModule(obj)
        elif (((six.PY3 and isinstance(obj, type))
               or isinstance(obj, (type, types.ClassType)))
              and issubclass(obj, unittest.TestCase)):
            return self.loadTestsFromTestCase(obj)
        elif isinstance(obj, types.UnboundMethodType):
            if six.PY3:
                return obj.__self__.__class__(obj.__name__)
            else:
                return obj.im_class(obj.__name__)
        elif hasattr(obj, '__call__'):
            test = obj()
            if not isinstance(test, unittest.TestCase) and \
               not isinstance(test, unittest.TestSuite):
                raise ValueError("calling %s returned %s, "
                                 "not a test" % (obj, test))
            return test
        else:
            raise ValueError("do not know how to make test from: %s" % obj)


try:
    # Jython support
    if sys.platform[:4] == 'java':
        def getchar():
            # Hopefully this is enough
            return sys.stdin.read(1)
    else:
        # On Windows, msvcrt.getch reads a single char without output.
        import msvcrt

        def getchar():
            return msvcrt.getch()
except ImportError:
    # Unix getchr
    import tty
    import termios

    def getchar():
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(sys.stdin.fileno())
            ch = sys.stdin.read(1)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
        return ch


# from jaraco.properties
class NonDataProperty(object):
    def __init__(self, fget):
        assert fget is not None, "fget cannot be none"
        assert callable(fget), "fget must be callable"
        self.fget = fget

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.fget(obj)


class WebCase(unittest.TestCase):
    HOST = "127.0.0.1"
    PORT = 8000
    HTTP_CONN = HTTPConnection
    PROTOCOL = "HTTP/1.1"

    scheme = "http"
    url = None

    status = None
    headers = None
    body = None

    encoding = 'utf-8'

    time = None

    def get_conn(self, auto_open=False):
        """Return a connection to our HTTP server."""
        if self.scheme == "https":
            cls = HTTPSConnection
        else:
            cls = HTTPConnection
        conn = cls(self.interface(), self.PORT)
        # Automatically re-connect?
        conn.auto_open = auto_open
        conn.connect()
        return conn

    def set_persistent(self, on=True, auto_open=False):
        """Make our HTTP_CONN persistent (or not).

        If the 'on' argument is True (the default), then self.HTTP_CONN
        will be set to an instance of HTTPConnection (or HTTPS
        if self.scheme is "https"). This will then persist across requests.

        We only allow for a single open connection, so if you call this
        and we currently have an open connection, it will be closed.
        """
        try:
            self.HTTP_CONN.close()
        except (TypeError, AttributeError):
            pass

        if on:
            self.HTTP_CONN = self.get_conn(auto_open=auto_open)
        else:
            if self.scheme == "https":
                self.HTTP_CONN = HTTPSConnection
            else:
                self.HTTP_CONN = HTTPConnection

    def _get_persistent(self):
        return hasattr(self.HTTP_CONN, "__class__")

    def _set_persistent(self, on):
        self.set_persistent(on)
    persistent = property(_get_persistent, _set_persistent)

    def interface(self):
        """Return an IP address for a client connection.

        If the server is listening on '0.0.0.0' (INADDR_ANY)
        or '::' (IN6ADDR_ANY), this will return the proper localhost."""
        return interface(self.HOST)

    def getPage(self, url, headers=None, method="GET", body=None,
                protocol=None, raise_subcls=None):
        """Open the url with debugging support. Return status, headers, body.

        `raise_subcls` must be a tuple with the exceptions classes
        or a single exception class that are not going to be considered
        a socket.error regardless that they were are subclass of a
        socket.error and therefore not considered for a connection retry.
        """
        ServerError.on = False

        if isinstance(url, six.text_type):
            url = url.encode('utf-8')
        if isinstance(body, six.text_type):
            body = body.encode('utf-8')

        self.url = url
        self.time = None
        start = time.time()
        result = openURL(url, headers, method, body, self.HOST, self.PORT,
                         self.HTTP_CONN, protocol or self.PROTOCOL,
                         raise_subcls)
        self.time = time.time() - start
        self.status, self.headers, self.body = result

        # Build a list of request cookies from the previous response cookies.
        self.cookies = [('Cookie', v) for k, v in self.headers
                        if k.lower() == 'set-cookie']

        if ServerError.on:
            raise ServerError()
        return result

    @NonDataProperty
    def interactive(self):
        """
        Load interactivity setting from environment, where
        the value can be numeric or a string like true or
        False or 1 or 0.
        """
        env_str = os.environ.get('WEBTEST_INTERACTIVE', 'True')
        return bool(json.loads(env_str.lower()))

    console_height = 30

    def _handlewebError(self, msg):
        print("")
        print("    ERROR: %s" % msg)

        if not self.interactive:
            raise self.failureException(msg)

        p = ("    Show: "
             "[B]ody [H]eaders [S]tatus [U]RL; "
             "[I]gnore, [R]aise, or sys.e[X]it >> ")
        sys.stdout.write(p)
        sys.stdout.flush()
        while True:
            i = getchar().upper()
            if not isinstance(i, type("")):
                i = i.decode('ascii')
            if i not in "BHSUIRX":
                continue
            print(i.upper())  # Also prints new line
            if i == "B":
                for x, line in enumerate(self.body.splitlines()):
                    if (x + 1) % self.console_height == 0:
                        # The \r and comma should make the next line overwrite
                        sys.stdout.write("<-- More -->\r")
                        m = getchar().lower()
                        # Erase our "More" prompt
                        sys.stdout.write("            \r")
                        if m == "q":
                            break
                    print(line)
            elif i == "H":
                pprint.pprint(self.headers)
            elif i == "S":
                print(self.status)
            elif i == "U":
                print(self.url)
            elif i == "I":
                # return without raising the normal exception
                return
            elif i == "R":
                raise self.failureException(msg)
            elif i == "X":
                self.exit()
            sys.stdout.write(p)
            sys.stdout.flush()

    def exit(self):
        sys.exit()

    def assertStatus(self, status, msg=None):
        """Fail if self.status != status."""
        if isinstance(status, text_or_bytes):
            if not self.status == status:
                if msg is None:
                    msg = 'Status (%r) != %r' % (self.status, status)
                self._handlewebError(msg)
        elif isinstance(status, int):
            code = int(self.status[:3])
            if code != status:
                if msg is None:
                    msg = 'Status (%r) != %r' % (self.status, status)
                self._handlewebError(msg)
        else:
            # status is a tuple or list.
            match = False
            for s in status:
                if isinstance(s, text_or_bytes):
                    if self.status == s:
                        match = True
                        break
                elif int(self.status[:3]) == s:
                    match = True
                    break
            if not match:
                if msg is None:
                    msg = 'Status (%r) not in %r' % (self.status, status)
                self._handlewebError(msg)

    def assertHeader(self, key, value=None, msg=None):
        """Fail if (key, [value]) not in self.headers."""
        lowkey = key.lower()
        for k, v in self.headers:
            if k.lower() == lowkey:
                if value is None or str(value) == v:
                    return v

        if msg is None:
            if value is None:
                msg = '%r not in headers' % key
            else:
                msg = '%r:%r not in headers' % (key, value)
        self._handlewebError(msg)

    def assertHeaderIn(self, key, values, msg=None):
        """Fail if header indicated by key doesn't have one of the values."""
        lowkey = key.lower()
        for k, v in self.headers:
            if k.lower() == lowkey:
                matches = [value for value in values if str(value) == v]
                if matches:
                    return matches

        if msg is None:
            msg = '%(key)r not in %(values)r' % vars()
        self._handlewebError(msg)

    def assertHeaderItemValue(self, key, value, msg=None):
        """Fail if the header does not contain the specified value"""
        actual_value = self.assertHeader(key, msg=msg)
        header_values = map(str.strip, actual_value.split(','))
        if value in header_values:
            return value

        if msg is None:
            msg = "%r not in %r" % (value, header_values)
        self._handlewebError(msg)

    def assertNoHeader(self, key, msg=None):
        """Fail if key in self.headers."""
        lowkey = key.lower()
        matches = [k for k, v in self.headers if k.lower() == lowkey]
        if matches:
            if msg is None:
                msg = '%r in headers' % key
            self._handlewebError(msg)

    def assertBody(self, value, msg=None):
        """Fail if value != self.body."""
        if isinstance(value, six.text_type):
            value = value.encode(self.encoding)
        if value != self.body:
            if msg is None:
                msg = 'expected body:\n%r\n\nactual body:\n%r' % (
                    value, self.body)
            self._handlewebError(msg)

    def assertInBody(self, value, msg=None):
        """Fail if value not in self.body."""
        if isinstance(value, six.text_type):
            value = value.encode(self.encoding)
        if value not in self.body:
            if msg is None:
                msg = '%r not in body: %s' % (value, self.body)
            self._handlewebError(msg)

    def assertNotInBody(self, value, msg=None):
        """Fail if value in self.body."""
        if isinstance(value, six.text_type):
            value = value.encode(self.encoding)
        if value in self.body:
            if msg is None:
                msg = '%r found in body' % value
            self._handlewebError(msg)

    def assertMatchesBody(self, pattern, msg=None, flags=0):
        """Fail if value (a regex pattern) is not in self.body."""
        if isinstance(pattern, six.text_type):
            pattern = pattern.encode(self.encoding)
        if re.search(pattern, self.body, flags) is None:
            if msg is None:
                msg = 'No match for %r in body' % pattern
            self._handlewebError(msg)


methods_with_bodies = ("POST", "PUT")


def cleanHeaders(headers, method, body, host, port):
    """Return request headers, with required headers added (if missing)."""
    if headers is None:
        headers = []

    # Add the required Host request header if not present.
    # [This specifies the host:port of the server, not the client.]
    found = False
    for k, v in headers:
        if k.lower() == 'host':
            found = True
            break
    if not found:
        if port == 80:
            headers.append(("Host", host))
        else:
            headers.append(("Host", "%s:%s" % (host, port)))

    if method in methods_with_bodies:
        # Stick in default type and length headers if not present
        found = False
        for k, v in headers:
            if k.lower() == 'content-type':
                found = True
                break
        if not found:
            headers.append(
                ("Content-Type", "application/x-www-form-urlencoded"))
            headers.append(("Content-Length", str(len(body or ""))))

    return headers


def shb(response):
    """Return status, headers, body the way we like from a response."""
    if six.PY3:
        h = response.getheaders()
    else:
        h = []
        key, value = None, None
        for line in response.msg.headers:
            if line:
                if line[0] in " \t":
                    value += line.strip()
                else:
                    if key and value:
                        h.append((key, value))
                    key, value = line.split(":", 1)
                    key = key.strip()
                    value = value.strip()
        if key and value:
            h.append((key, value))

    return "%s %s" % (response.status, response.reason), h, response.read()


def openURL(url, headers=None, method="GET", body=None,
            host="127.0.0.1", port=8000, http_conn=HTTPConnection,
            protocol="HTTP/1.1", raise_subcls=None):
    """
    Open the given HTTP resource and return status, headers, and body.

    `raise_subcls` must be a tuple with the exceptions classes
    or a single exception class that are not going to be considered
    a socket.error regardless that they were are subclass of a
    socket.error and therefore not considered for a connection retry.
    """
    headers = cleanHeaders(headers, method, body, host, port)

    # Trying 10 times is simply in case of socket errors.
    # Normal case--it should run once.
    for trial in range(10):
        try:
            # Allow http_conn to be a class or an instance
            if hasattr(http_conn, "host"):
                conn = http_conn
            else:
                conn = http_conn(interface(host), port)

            conn._http_vsn_str = protocol
            conn._http_vsn = int("".join([x for x in protocol if x.isdigit()]))

            if six.PY3 and isinstance(url, bytes):
                url = url.decode()
            conn.putrequest(method.upper(), url, skip_host=True,
                            skip_accept_encoding=True)

            for key, value in headers:
                conn.putheader(key, value.encode("Latin-1"))
            conn.endheaders()

            if body is not None:
                conn.send(body)

            # Handle response
            response = conn.getresponse()

            s, h, b = shb(response)

            if not hasattr(http_conn, "host"):
                # We made our own conn instance. Close it.
                conn.close()

            return s, h, b
        except socket.error as e:
            if raise_subcls is not None and isinstance(e, raise_subcls):
                raise
            else:
                time.sleep(0.5)
                if trial == 9:
                    raise




# Add any exceptions which your web framework handles
# normally (that you don't want server_error to trap).
ignored_exceptions = []

# You'll want set this to True when you can't guarantee
# that each response will immediately follow each request;
# for example, when handling requests via multiple threads.
ignore_all = False


class ServerError(Exception):
    on = False


def server_error(exc=None):
    """Server debug hook. Return True if exception handled, False if ignored.

    You probably want to wrap this, so you can still handle an error using
    your framework when it's ignored.
    """
    if exc is None:
        exc = sys.exc_info()

    if ignore_all or exc[0] in ignored_exceptions:
        return False
    else:
        ServerError.on = True
        print("")
        print("".join(traceback.format_exception(*exc)))
        return True
