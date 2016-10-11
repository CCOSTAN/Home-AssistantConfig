# -*- coding: utf-8 -*-

try:                                                                            
    import BaseHTTPServer as server                                   
except ImportError:                                                             
    import http.server as server

try:
    from urlparse import parse_qs
except ImportError:
    from urllib.parse import parse_qs

import json

import pyfttt

# https://wiki.python.org/moin/BaseHttpServer
# https://docs.python.org/2/library/basehttpserver.html
# http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
# make a key with hashlib.sha1(b"hello" + b"world").hexdigest() (should have something unique in there)
# https://docs.python.org/2/library/basehttpserver.html
# TODO: get charset from browser instead of assuming utf-8?
# TODO: handle HEAD (get response, but no body)

# Parse out the url: z=urllib.parse.urlparse('http://blah.com/api/1.0/somekey/blah?woop=21&blah=12')
# parse the query part urllib.parse.parse_qs(z.query)

VALID_KEYS = ['6adfb183a4a2c94a2f92dab5ade762a47889a5a1', 'KEY']

class basic_handler(server.BaseHTTPRequestHandler):

    def parse_path(self):
        """ parse the path, setting api_key, api_version, etc."""

        print("PATH IS [{}]".format(self.path))
        path = self.path[1:].split('/')
        self.valid = True

        if len(path) < 4:
            self.send_error(400, message='Malformed path')
            self.valid = False
            return
        pass

        if path[0] != 'api':
            self.send_error(404)
            self.valid = False
            return

        try:
            self.api_version = float(path[1])
        except ValueError:
            self.send_error(404, message='Unsupported API version')
            self.api_version = None
            self.valid = False
            return

        if self.api_version not in [1.0]:
            self.send_error(404, message='Unsupported API version')
            self.valid = False
            return

        self.api_key = path[2]

        if self.api_key not in VALID_KEYS:
            self.send_error(403)
            self.valid = False
            return

        self.api_command = path[3]
        if self.api_command not in ['test', 'blah']:
            self.send_error(400, message="Unknown command '{}'".format(self.api_command))
            self.valid = False
            return

        self.api_arguments = path[4:]


    def do_GET(self):
        return self.do_GETPOST()


    def do_POST(self):
        return self.do_GETPOST()


    def do_GETPOST(self):
        self.server_version = 'pyfttt/{}'.format(pyfttt.__version__)
        self.parse_path()

        if not self.valid:
            return

        #print("COMMAND: {}".format(self.api_command))
        #print("OPTIONS: {}".format(self.api_arguments))

        if self.command == 'POST':
            data_length = int(self.headers['Content-Length'])

            # Payload must be under 1k
            if data_length > 1000:
                self.send_error(413)
                return

            data_raw = self.rfile.read(data_length)

            if self.headers['Content-Type'] == 'application/json':
                data_parsed = json.loads(bytes.decode(data_raw))
            elif self.headers['Content-Type'] == 'application/x-www-form-urlencoded':
                data_parsed = parse_qs(data_raw)
            else:
                self.send_error(400, message="Unsupported Content Type '{}'".format(self.headers['Content-Type']))
                return

            #print("\tGot Data: [{}]".format(data_parsed))

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        stuff = {'brian': 35, 'lori': 35, 'address': {'house': 2351, 'street': 'fairview ave e'}}
        
        self.wfile.write(json.dumps(stuff, indent=4).encode('UTF-8'))


def run_server(host='', port=7777, handler=basic_handler):
    httpd = server.HTTPServer(server_address=(host,port),
                              RequestHandlerClass=handler)
    httpd.serve_forever()

run_server(port=7777, handler=basic_handler)


#        print("Got a POST request")
#        print("\tClient Address: {}".format(self.client_address))
#        print("\tCommand: {}".format(self.command))
#        print("\tPath: {}".format(self.path.split('/')))
#        print("\tRequest Version: {}".format(self.request_version))
#        print("\tHeaders: {}".format(self.headers))
#        print("\t\tContent-Length: {}".format(int(self.headers['Content-Length'])))
#        print("\tServer Version: {}".format(self.server_version))

