"""Command line tool to print discocvered devices or dump raw data."""
from __future__ import print_function
import sys

from netdisco.discovery import NetworkDiscovery


def main():
    """Handle command line execution."""
    netdisco = NetworkDiscovery()

    netdisco.scan()

    # Pass in command line argument dump to get the raw data
    if sys.argv[-1] == 'dump':
        netdisco.print_raw_data()
        print()
        print()

    print("Discovered devices:")
    count = 0
    for dev in netdisco.discover():
        count += 1
        print(dev, netdisco.get_info(dev))
    print()
    print("Discovered {} devices".format(count))

    netdisco.stop()

if __name__ == '__main__':
    main()
