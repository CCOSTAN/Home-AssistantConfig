# -*- coding: utf-8 -*-

"""pyfttt.py - Send IFTTT Maker Channel Events"""

import argparse
import os
import sys

import requests
import pyfttt


def parse_arguments():
    """Parse command line arguments"""

    parser = argparse.ArgumentParser(prog=sys.argv[0],
                                     description='Send Maker Channel events to IFTTT',
                                     epilog='Visit https://ifttt.com/channels/maker for more information')
    parser.add_argument('--version', action='version', version=pyfttt.__version__)

    sgroup = parser.add_argument_group(title='sending events')
    sgroup.add_argument('-k', '--key', metavar='K',
                        default=os.environ.get('IFTTT_API_KEY'),
                        help='IFTTT secret key')
    sgroup.add_argument('-e', '--event', metavar='E', required=True,
                        help='The name of the event to trigger')
    sgroup.add_argument('value1', nargs='?',
                        help='Extra data sent with the event (optional)')
    sgroup.add_argument('value2', nargs='?',
                        help='Extra data sent with the event (optional)')
    sgroup.add_argument('value3', nargs='?',
                        help='Extra data sent with the event (optional)')

    return parser.parse_args()


def main():
    """Main function for pyfttt command line tool"""
    args = parse_arguments()

    if args.key is None:
        print("Error: Must provide IFTTT secret key.")
        sys.exit(1)

    try:
        res = pyfttt.send_event(api_key=args.key, event=args.event,
                                value1=args.value1, value2=args.value2,
                                value3=args.value3)
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to IFTTT")
        sys.exit(2)
    except requests.exceptions.HTTPError:
        print("Error: Received invalid response")
        sys.exit(3)
    except requests.exceptions.Timeout:
        print("Error: Request timed out")
        sys.exit(4)
    except requests.exceptions.TooManyRedirects:
        print("Error: Too many redirects")
        sys.exit(5)
    except requests.exceptions.RequestException as reqe:
        print("Error: {e}".format(e=reqe))
        sys.exit(6)


    if res.status_code != requests.codes.ok:
        try:
            j = res.json()
        except ValueError:
            print('Error: Could not parse server response. Event not sent')
            sys.exit(7)

        for err in j['errors']:
            print('Error: {}'.format(err['message']))
        sys.exit(8)


if __name__ == "__main__":
    main()

