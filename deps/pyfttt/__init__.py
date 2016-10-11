# -*- coding: utf-8 -*-

VERSION = (0, 3)
__version__ = ".".join(map(str, VERSION[0:2])) + "".join(VERSION[2:])
__license__ = "BSD"

from pyfttt.sending import *
