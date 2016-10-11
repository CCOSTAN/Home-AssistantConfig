import os
import sys
import socket
import atexit
import tempfile

import cherrypy
from cherrypy.test import helper
from cherrypy._cpcompat import HTTPConnection

def usocket_path():
    fd, path = tempfile.mkstemp('cp_test.sock')
    os.close(fd)
    os.remove(path)
    return path

USOCKET_PATH = usocket_path()

class USocketHTTPConnection(HTTPConnection):
    """
    HTTPConnection over a unix socket.
    """

    def __init__(self, path):
        HTTPConnection.__init__(self, 'localhost')
        self.path = path

    def __call__(self, *args, **kwargs):
        """
        Catch-all method just to present itself as a constructor for the
        HTTPConnection.
        """
        return self

    def connect(self):
        """
        Override the connect method and assign a unix socket as a transport.
        """
        sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        sock.connect(self.path)
        self.sock = sock
        atexit.register(lambda: os.remove(self.path))


def skip_on_windows(method):
    """
    Decorator to skip the method call if the test is executing on Windows.
    """
    def wrapper(self):
        if sys.platform == "win32":
            return self.skip("No UNIX Socket support in Windows.")
        else:
            return method(self)
    wrapper.__doc__ = method.__doc__
    wrapper.__name__ = method.__name__
    return wrapper



class WSGI_UnixSocket_Test(helper.CPWebCase):
    """
    Test basic behavior on a cherrypy wsgi server listening
    on a unix socket.

    It exercises the config option `server.socket_file`.
    """
    HTTP_CONN = USocketHTTPConnection(USOCKET_PATH)


    @staticmethod
    def setup_server():
        class Root(object):

            @cherrypy.expose
            def index(self):
                return "Test OK"

            @cherrypy.expose
            def error(self):
                raise Exception("Invalid page")

        config = {
            'server.socket_file': USOCKET_PATH
        }
        cherrypy.config.update(config)
        cherrypy.tree.mount(Root())

    def tearDown(self):
        cherrypy.config.update({'server.socket_file': None})

    @skip_on_windows
    def test_simple_request(self):
        self.getPage("/")
        self.assertStatus("200 OK")
        self.assertInBody("Test OK")

    @skip_on_windows
    def test_not_found(self):
        self.getPage("/invalid_path")
        self.assertStatus("404 Not Found")

    @skip_on_windows
    def test_internal_error(self):
        self.getPage("/error")
        self.assertStatus("500 Internal Server Error")
        self.assertInBody("Invalid page")
