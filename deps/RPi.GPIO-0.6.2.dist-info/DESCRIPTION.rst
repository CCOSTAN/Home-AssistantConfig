This package provides a class to control the GPIO on a Raspberry Pi.

Note that this module is unsuitable for real-time or timing critical applications.  This is because you
can not predict when Python will be busy garbage collecting.  It also runs under the Linux kernel which
is not suitable for real time applications - it is multitasking O/S and another process may be given
priority over the CPU, causing jitter in your program.  If you are after true real-time performance and
predictability, buy yourself an Arduino http://www.arduino.cc !

Note that the current release does not support SPI, I2C, hardware PWM or serial functionality on the RPi yet.
This is planned for the near future - watch this space!  One-wire functionality is also planned.

Although hardware PWM is not available yet, software PWM is available to use on all channels.

For examples and documentation, visit http://sourceforge.net/p/raspberry-gpio-python/wiki/Home/

Change Log
==========

0.6.2
-----
- Rewrote Debian packaging mechanism
- RPI_INFO reports Pi 3
- Changed module layout - moved C components to RPi._GPIO

0.6.1
-----
- Update RPI_INFO to detect more board types
- Issue 118 - add_event_detect sometimes gives runtime error with unpriv user 
- Issue 120 - setmode() remembers invalid mode

0.6.0a3
-------
- Now uses /dev/gpiomem if available to avoid being run as root
- Fix warnings with pull up/down on pins 3/5
- Correct base address on Pi 2 when devicetree is disabled
- caddr_t error on compile (Issue 109)
- Error on invalid parameters to setup() (issue 93)
- Add timeout parameter to wait_for_edge() (issue 91)

0.5.11
------
- Fix - pins > 26 missing when using BOARD mode
- Add getmode()
- Raise exception when a mix of modes is used
- GPIO.cleanaup() unsets the current pin mode

0.5.10
------
- Issue 95 - support RPi 2 boards
- Introduce RPI_INFO
- Deprecate RPI_REVISION
- Issue 97 - fixed docstring for setup()

0.5.9
-----
- Issue 87 - warn about pull up/down on i2c pins
- Issue 86/75 - wait_for_edge() bugfix
- Issue 84 - recognise RPi properly when using a custom kernel
- Issue 90 - cleanup() on a list/tuple of channels

0.5.8
-----
- Allow lists/tuples of channels in GPIO.setup()
- GPIO.output() now allows lists/tuples of values
- GPIO.wait_for_edge() bug fixes (issue 78)

0.5.7
-----
- Issue 67 - speed up repeated calls to GPIO.wait_for_event()
- Added bouncetime keyword to GPIO.wait_for_event()
- Added extra edge/interrupt unit tests
- GPIO.wait_for_event() can now be mixed with GPIO.add_event_detect()
- Improved cleanups of events
- Issue 69 resolved

0.5.6
-----
- Issue 68 - support for RPi Model B+
- Fix gpio_function()

0.5.5
-----
- Issue 52 - 'unallocate' a channel
- Issue 35 - use switchbounce with GPIO.event_detected()
- Refactored events code
- Rewrote tests to use unittest mechanism and new test board with loopbacks
- Fixed adding events after a GPIO.cleanup()
- Issue 64 - misleading /dev/mem permissions error
- Issue 59 - name collision with PWM constant and class

0.5.4
-----
- Changed release status (from alpha to full release)
- Warn when GPIO.cleanup() used with nothing to clean up (issue 44)
- Avoid collisions in constants (e.g. HIGH / RISING / PUD_DOWN)
- Accept BOARD numbers in gpio_function (issue 34)
- More return values for gpio_function (INPUT, OUTPUT, SPI, I2C, PWM, SERIAL, UNKNOWN)
- Tidy up docstrings
- Fix /dev/mem access error with gpio_function

0.5.3a
------
- Allow pydoc for non-root users (issue 27)
- Fix add_event_detect error when run as daemon (issue 32)
- Simplified exception types
- Changed from distribute to pip

0.5.2a
------
- Added software PWM (experimental)
- Added switch bounce handling to event callbacks
- Added channel number parameter to event callbacks (issue 31)
- Internal refactoring and code tidy up

0.5.1a
------
- Fixed callbacks for multiple GPIOs (issue 28)

0.5.0a
------
- Added new edge detection events (interrupt handling)
  - Added add_event_detect()
  - Added remove_event_detect()
  - Added add_event_callback()
  - Added wait_for_edge()
- Removed old experimental event functions
  - Removed set_rising_event()
  - Removed set_falling_event()
  - Removed set_high_event()
  - Removed set_low_event()
- Changed event_detected() for new edge detection functionality
- input() now returns 0/LOW == False or 1/HIGH == True (integers) instead of False or True (booleans).
- Fix error on repeated import (issue 3)
- Change SetupException to a RuntimeError so it can be caught on import (issue 25, Chris Hager <chris@linuxuser.at>)
- Improved docstrings of functions

0.4.2a
------
- Fix for installing on Arch Linux (Python 3.3) (issue 20)
- Initial value when setting a channel as an output (issue 19)

0.4.1a
------
- Added VERSION
- Permit input() of channels set as outputs (Eric Ptak <trouch@trouch.com>)

0.4.0a
------
- Added support for Revision 2 boards
- Added RPI_REVISION
- Added cleanup() function and removed automatic reset functionality on program exit
- Added get_function() to read existing GPIO channel functionality (suggestion from Eric Ptak <trouch@trouch.com>)
- Added set_rising_event()
- Added set_falling_event()
- Added set_high_event()
- Added set_low_event()
- Added event_detected()
- Added test/test.py
- Converted debian to armhf
- Fixed C function short_wait() (thanks to Thibault Porteboeuf <thibaultporteboeuf@gmail.com>)

0.3.1a
------
- Fixed critical bug with swapped high/low state on outputs
- Added pull-up / pull-down setup functionality for inputs

0.3.0a
------
- Rewritten as a C extension
- Now uses /dev/mem and SoC registers instead of /sys/class/gpio
- Faster!
- Make call to GPIO.setmode() mandatory
- Added GPIO.HIGH and GPIO.LOW constants

0.2.0
-----
- Changed status from alpha to beta
- Added setmode() to be able to use BCM GPIO 00.nn channel numbers
- Renamed InvalidPinException to InvalidChannelException

0.1.0
------
- Fixed direction bug
- Added MANIFEST.in (to include missing file)
- Changed GPIO channel number to pin number
- Tested and working!

0.0.3a
------
- Added GPIO table
- Refactored
- Fixed a few critical bugs
- Still completely untested!

0.0.2a
------
- Internal refactoring.  Still completely untested!

0.0.1a
------
- First version.  Completely untested until I can get hold of a Raspberry Pi!



