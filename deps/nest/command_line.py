#! /usr/bin/python
# -*- coding:utf-8 -*-

'''
nest.py -- a python interface to the Nest Thermostats
'''

from __future__ import print_function

import argparse
import os
import sys

from . import nest
from . import utils
from . import helpers


def parse_args():
    prog = os.path.basename(sys.argv[0])
    config_file = os.path.sep.join(('~', '.config', prog, 'config'))

    conf_parser = argparse.ArgumentParser(prog=prog, add_help=False)
    conf_parser.add_argument('--conf', default=config_file,
                             help='config file (default %s)' % config_file,
                             metavar='FILE')

    args, remaining_argv = conf_parser.parse_known_args()

    defaults = helpers.get_config(config_path=args.conf)

    description = 'Command line interface to Nest™ Thermostats'
    parser = argparse.ArgumentParser(description=description,
                                     parents=[conf_parser])

    parser.set_defaults(**defaults)

    parser.add_argument('--token-cache', dest='token_cache',
                        help='auth access token cache file',
                        metavar='TOKEN_CACHE_FILE')

    parser.add_argument('-t', '--token', dest='token',
                        help='auth access token', metavar='TOKEN')

    parser.add_argument('-u', '--user', dest='user',
                        help='username for nest.com', metavar='USER')

    parser.add_argument('-p', '--password', dest='password',
                        help='password for nest.com', metavar='PASSWORD')

    parser.add_argument('-c', '--celsius', dest='celsius', action='store_true',
                        help='use celsius instead of farenheit')

    parser.add_argument('-s', '--serial', dest='serial',
                        help='optional, specify serial number of nest '
                             'thermostat to talk to')

    parser.add_argument('-S', '--structure', dest='structure',
                        help='optional, specify structure name to'
                             'scope device actions')

    parser.add_argument('-i', '--index', dest='index', default=0, type=int,
                        help='optional, specify index number of nest to '
                             'talk to')

    subparsers = parser.add_subparsers(dest='command',
                                       help='command help')
    temp = subparsers.add_parser('temp', help='show/set temperature')
    temp.add_argument('temperature', nargs='*', type=float,
                      help='target tempterature to set device to')

    fan = subparsers.add_parser('fan', help='set fan "on" or "auto"')
    fan_group = fan.add_mutually_exclusive_group()
    fan_group.add_argument('--auto', action='store_true', default=False,
                           help='set fan to auto')
    fan_group.add_argument('--on', action='store_true', default=False,
                           help='set fan to on')

    mode = subparsers.add_parser('mode', help='show/set current mode')
    mode_group = mode.add_mutually_exclusive_group()
    mode_group.add_argument('--cool', action='store_true', default=False,
                            help='set mode to cool')
    mode_group.add_argument('--heat', action='store_true', default=False,
                            help='set mode to heat')
    mode_group.add_argument('--range', action='store_true', default=False,
                            help='set mode to range')
    mode_group.add_argument('--off', action='store_true', default=False,
                            help='set mode to off')

    away = subparsers.add_parser('away', help='show/set current away status')
    away_group = away.add_mutually_exclusive_group()
    away_group.add_argument('--away', action='store_true', default=False,
                            help='set away status to "away"')
    away_group.add_argument('--home', action='store_true', default=False,
                            help='set away status to "home"')

    subparsers.add_parser('target', help='show current temp target')
    subparsers.add_parser('humid', help='show current humidity')

    target_hum = subparsers.add_parser('target_hum',
                                       help='show/set target humidty')
    target_hum.add_argument('humidity', nargs='*',
                            help='specify target humidity value or auto '
                                 'to auto-select a humidity based on outside '
                                 'temp')

    subparsers.add_parser('show', help='show everything')

    return parser.parse_args()


def main():
    args = parse_args()

    def _identity(x):
        return x

    if args.celsius:
        display_temp = _identity
        convert_temp = _identity

    else:
        display_temp = utils.c_to_f
        convert_temp = utils.f_to_c

    cmd = args.command

    token_cache = None
    if args.token_cache:
        token_cache = os.path.expanduser(args.token_cache)

    # NOTE(jkoelker) Token caching is currently broken
    token_cache = None

    with nest.Nest(args.user, args.password, access_token=args.token,
                   access_token_cache_file=token_cache) as napi:
        if cmd == 'away':
            structure = None

            if args.structure:
                struct = [s for s in napi.structures
                          if s.name == args.structure]
                if struct:
                    structure = struct[0]

            else:
                if args.serial:
                    serial = args.serial
                else:
                    serial = napi.devices[args.index]._serial

                struct = [s for s in napi.structures for d in s.devices
                          if d._serial == serial]
                if struct:
                    structure = struct[0]

            if not structure:
                structure = napi.structures[0]

            if args.away:
                structure.away = True

            elif args.home:
                structure.away = False

            print(structure.away)
            return

        if args.serial:
            device = nest.Device(args.serial, napi)

        elif args.structure:
            struct = [s for s in napi.structures if s.name == args.structure]
            if struct:
                device = struct[0].devices[args.index]

            else:
                device = napi.structures[0].devices[args.index]

        else:
            device = napi.devices[args.index]

        if cmd == 'temp':
            if args.temperature:
                if len(args.temperature) > 1:
                    if device.mode != 'range':
                        device.mode = 'range'

                    lower = convert_temp(args.temperature[0])
                    upper = convert_temp(args.temperature[1])
                    device.temperature = (lower, upper)

                else:
                    temp = convert_temp(args.temperature[0])
                    device.temperature = temp

            print('%0.1f' % display_temp(device.temperature))

        elif cmd == 'fan':
            if args.auto:
                device.fan = False

            elif args.on:
                device.fan = True

            print(device.fan)

        elif cmd == 'mode':
            if args.cool:
                device.mode = 'cool'

            elif args.heat:
                device.mode = 'heat'

            elif args.range:
                device.mode = 'range'

            elif args.off:
                device.mode = 'off'

            print(device.mode)

        elif cmd == 'humid':
            print(device.humidity)

        elif cmd == 'target_hum':
            if args.humidity:
                device.target_humidity = args.humidity[0]

            print(device.target_humidity)

        elif cmd == 'target':
            target = device.target

            if isinstance(target, tuple):
                print('Lower: %0.1f' % display_temp(target[0]))
                print('Upper: %0.1f' % display_temp(target[1]))

            else:
                print('%0.1f' % display_temp(target))

        elif cmd == 'show':
            data = device._shared.copy()
            data.update(device._device)

            for k in sorted(data.keys()):
                intag = any(intag in k for intag in ('temp', 'away',
                                                     'threshold'))
                nottag = any(notag in k for notag in ('type', 'pin_hash',
                                                      'scale', 'enabled'))
                if intag and not nottag:
                    try:
                        temp_data = '%0.1f' % display_temp(data[k])
                        print(k + '.'*(35-len(k)) + ':', temp_data)

                    except Exception:
                        print(k + '.'*(35-len(k)) + ':', data[k])

                else:
                    print(k + '.'*(35-len(k)) + ':', data[k])


if __name__ == '__main__':
    main()
