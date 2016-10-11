.. -*- mode: rst; coding: utf-8 -*-

static3 - A really simple WSGI way to serve static (or mixed) content.
====================================================================================

.. image:: https://travis-ci.org/rmohr/static3.svg?branch=master
    :target: https://travis-ci.org/rmohr/static3

.. contents:: Table of Contents
  :backlinks: top

This software is a Python3 compatible fork of Luke Arnos library static_.

The library is now Python3 compatible and Genshi_ support (the sucessor of
kid_) is added. On Python2 Genshi and/or kid can be used as template engine. On
Python3 only Genshi is available.

This library provides an easy way to include static content
in your WSGI applications. There is a convenience method for serving
files located via pkg_resources. There are also facilities for serving
mixed (static and dynamic) content using "magic" file handlers.
Python builtin string substitution, kid and Genshi template support are provided
and it is easy to roll your own handlers. Note that this distribution
does not require kid or Genshi unless you want to use that type of template. Also
provides a command of the same name as a convenience when you just want
to share a little content over HTTP, ad hoc.

Installation and Usage
----------------------

Latest release via PIP::

    pip install static3

Installation via GitHub::

    git clone https://github.com/rmohr/static3.git
    cd static3
    pip install .

Cling
^^^^^

`Cling` serves static content only. Just give it the base directory with your
files you want to make accessible. You get a full WSGI app with an example as
simple as that::

    from static import Cling
    from wsgiref.simple_server import make_server
    my_app = Cling("/my/directory")
    make_server("localhost", 9999, my_app).serve_forever()

Now you can access everything in the given directory via http://localhost:9999.D

Serving compressed files
^^^^^^^^^^^^^^^^^^^^^^^^

If a gzip compressed file with the ´gz´ postfix is present, it is served, along with the corresponding headers.
So if the file 'index.html' and the file 'index.html.gz' are present, the file 'index.html.gz' is served, if the the client indicated that it supports gzipped content.

Additionally, you can configure arbitrary headers. You can match files by mime
type, file extension, or prefix. For example, the following would add
Cache-Control headers to paths with a css mime type for 10s, no-cache for all
paths ending in .js for 100s, and add CORS header to all paths under the /imgs/
dir::

    headers = [
        {'type': 'text/css', 'Cache-Control': 'max-age=10'},
        {'ext': '.js', 'Cache-Control': 'no-cache'},
        {'prefix': '/imgs/', 'Access-Control-Allow-Origin': '*'},
    ]
    Cling("/my/directory", headers=headers)


Shock
^^^^^

`Shock` has the same basic functionality like `Cling` but with Shock we can
also have some templating fun. Shock comes with three templating backends.
String substitution, kid and Genshi. The decision which backend to use is done
by examining the extension of the file to serve. The file extensions are 'stp',
'kid' and 'genshi'. So if you want to provide a file called 'index.html'  via
the kid backend, name your file 'index.html.kid'. A short example might look
like this::

    from static import Shock, KidMagic
    from wsgiref.simple_server import make_server
    my_app = Shock("/my/directory", magics=[KidMagic(title="Hello World")])
    make_server("localhost", 9999, my_app).serve_forever()

And the example 'index.html.kid'::

    <html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:py="http://purl.org/kid/ns#"
      xml:lang="en">
      <head>
      </head>
      <body>
        <h1>$title</h1>
      </body>
    </html>

A similar template 'index.html.genshi' for Genshi::

    <html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:py="http://genshi.edgewall.org/"
      xml:lang="en">
      <head>
      </head>
      <body>
        <h1>$title</h1>
      </body>
    </html>

This simple application will replace the placeholder `title` with 'Hello World'
in every provided file which ends in '.kid'.
In this example it already is already obvious, that although different template
engines can be used, they can only be used in a very `static` way. Never the
less `Shock` is perfectly suitable for simple semi-static things like make the
URL to your companies logo, or the company name variable.

Unicode Support
^^^^^^^^^^^^^^^

When using a template system in Python3 it might be necessary to explicitly
set an encoding for the sites provided. This can be done via the
`encoding` attribute of `Shock`::

    from static import Shock
    shock = Shock("/var/www/pub")
    shock.encoding="latin-1"

When using `Cling` or `Shock` to serve static content the
encoding need not to be set, as the content is just streamed through.
If you have templates encoded in different formats, an instance of
`Shock` needs to be instantiated for every codec used.

.. _static: https://pypi.python.org/pypi/static
.. _kid: https://pypi.python.org/pypi/kid
.. _Genshi: https://pypi.python.org/pypi/Genshi


