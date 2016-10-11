# -*- coding:utf-8 -*-
# a module of helper functions
# mostly for the configuration

import contextlib
import os

from . import nest

# use six for python2/python3 compatibility
from six.moves import configparser


class MissingCredentialsError(ValueError):
    pass


def get_config(config_path=None, prog='nest'):
    if not config_path:
        config_path = os.path.sep.join(('~', '.config', prog, 'config'))

    defaults = {'celsius': False}
    config_file = os.path.expanduser(config_path)
    if os.path.exists(config_file):
        config = configparser.SafeConfigParser()
        config.read([config_file])
        if config.has_section('nest'):
            defaults.update(dict(config.items('nest')))

    return defaults


def get_auth_credentials(config_path=None):
    config = get_config(config_path)
    username = config.get('user')
    password = config.get('password')
    return username, password


@contextlib.contextmanager
def nest_login(config_path=None, username=None, password=None, **kwargs):
    """
    This a context manager for creating a Nest object using
    authentication credentials either provided as keyword arguments
    or read from the configuration file.

    :param config_path: Path to the config file.
        The default is used if none is provided.
        Optional if the the credentials are provided as arguments.
    :param username: Optional if the config file contains the username.
    :param password: Optional if the config file contains the password.
    :param kwargs: Keyword arguments to pass onto the Nest initializer.
    :return: Nest object
    """

    credentials_config = get_auth_credentials(config_path)
    if not username:
        username = credentials_config[0]
    if not password:
        password = credentials_config[1]

    if username and password:
        yield nest.Nest(username, password, **kwargs)
    else:
        raise MissingCredentialsError(
            'The login credentials have not been provided.')
