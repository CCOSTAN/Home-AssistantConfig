# -*- coding: utf-8 -*-

# Copyright 2009-2016, Simon Kennedy, sffjunkie+code@gmail.com

"""The :mod:`astral` module provides the means to calculate dawn, sunrise,
solar noon, sunset, dusk and rahukaalam times, plus solar azimuth and
elevation, for specific locations or at a specific latitude/longitude. It can
also calculate the moon phase for a specific date.

The module provides 2 main classes :class:`Astral` and :class:`Location`.

:class:`Astral`
    Has 2 main responsibilities

    * Calculates the events in the UTC timezone.
    * Provides access to location data

:class:`Location`
    Holds information about a location and provides functions to calculate
    the event times for the location in the correct time zone.

For example ::

    >>> from astral import *
    >>> a = Astral()
    >>> location = a['London']
    >>> print('Information for %s' % location.name)
    Information for London
    >>> timezone = location.timezone
    >>> print('Timezone: %s' % timezone)
    Timezone: Europe/London
    >>> print('Latitude: %.02f; Longitude: %.02f' % (location.latitude,
    ... location.longitude))
    Latitude: 51.60; Longitude: 0.05
    >>> from datetime import date
    >>> d = date(2009,4,22)
    >>> sun = location.sun(local=True, date=d)
    >>> print('Dawn:    %s' % str(sun['dawn']))
    Dawn:    2009-04-22 05:12:56+01:00

The module currently provides 2 methods of obtaining location information;
:class:`AstralGeocoder` (the default, which uses information from within the
module) and :class:`GoogleGeocoder` (which obtains information from Google's
Map Service.)

To use the :class:`GoogleGeocoder` pass the class as the `geocoder` parameter
to :meth:`Astral.__init__` or by setting the `geocoder` property to an
instance of :class:`GoogleGeocoder`::

    >>> from astral import GoogleGeocoder
    >>> a = Astral(GoogleGeocoder)

or ::

    >>> from astral import GoogleGeocoder
    >>> a = Astral()
    >>> a.geocoder = GoogleGeocoder()
"""

from __future__ import unicode_literals

try:
    import pytz
except ImportError:
    raise ImportError(('The astral module requires the '
                      'pytz module to be available.'))

import datetime
from time import time
from math import cos, sin, tan, acos, asin, atan2, floor, ceil
from math import radians, degrees, pow
import sys

try:
    from urllib import quote_plus
except ImportError:
    from urllib.parse import quote_plus

try:
    from urllib2 import urlopen, URLError
except ImportError:
    from urllib.request import urlopen, URLError

try:
    import simplejson as json
except ImportError:
    import json
    
if sys.version_info[0] >= 3:
    ustr = str
else:
    ustr = unicode
    
__all__ = ['Astral', 'Location',
           'AstralGeocoder', 'GoogleGeocoder',
           'AstralError']

__version__ = "1.2"
__author__ = "Simon Kennedy <sffjunkie+code@gmail.com>"

SUN_RISING = 1
SUN_SETTING = -1

# name,region,latitude,longitude,timezone,elevation
_LOCATION_INFO = """Abu Dhabi,UAE,24°28'N,54°22'E,Asia/Dubai,5
Abu Dhabi,United Arab Emirates,24°28'N,54°22'E,Asia/Dubai,5
Abuja,Nigeria,09°05'N,07°32'E,Africa/Lagos,342
Accra,Ghana,05°35'N,00°06'W,Africa/Accra,61
Addis Ababa,Ethiopia,09°02'N,38°42'E,Africa/Addis_Ababa,2355
Adelaide,Australia,34°56'S,138°36'E,Australia/Adelaide,50
Al Jubail,Saudi Arabia,25°24'N,49°39'W,Asia/Riyadh,8
Algiers,Algeria,36°42'N,03°08'E,Africa/Algiers,224
Amman,Jordan,31°57'N,35°52'E,Asia/Amman,1100
Amsterdam,Netherlands,52°23'N,04°54'E,Europe/Amsterdam,2
Andorra la Vella,Andorra,42°31'N,01°32'E,Europe/Andorra,1023
Ankara,Turkey,39°57'N,32°54'E,Europe/Istanbul,938
Antananarivo,Madagascar,18°55'S,47°31'E,Indian/Antananarivo,1276
Apia,Samoa,13°50'S,171°50'W,Pacific/Apia,2
Ashgabat,Turkmenistan,38°00'N,57°50'E,Asia/Ashgabat,219
Asmara,Eritrea,15°19'N,38°55'E,Africa/Asmara,2325
Astana,Kazakhstan,51°10'N,71°30'E,Asia/Qyzylorda,347
Asuncion,Paraguay,25°10'S,57°30'W,America/Asuncion,124
Athens,Greece,37°58'N,23°46'E,Europe/Athens,338
Avarua,Cook Islands,21°12'N,159°46'W,Etc/GMT-10,208
Baghdad,Iraq,33°20'N,44°30'E,Asia/Baghdad,41
Baku,Azerbaijan,40°29'N,49°56'E,Asia/Baku,30
Bamako,Mali,12°34'N,07°55'W,Africa/Bamako,350
Bandar Seri Begawan,Brunei Darussalam,04°52'N,115°00'E,Asia/Brunei,1
Bangkok,Thailand,13°45'N,100°35'E,Asia/Bangkok,2
Bangui,Central African Republic,04°23'N,18°35'E,Africa/Bangui,373
Banjul,Gambia,13°28'N,16°40'W,Africa/Banjul,5
Basse-Terre,Guadeloupe,16°00'N,61°44'W,America/Guadeloupe,1
Basseterre,Saint Kitts and Nevis,17°17'N,62°43'W,America/St_Kitts,50
Beijing,China,39°55'N,116°20'E,Asia/Harbin,59
Beirut,Lebanon,33°53'N,35°31'E,Asia/Beirut,56
Belfast,Northern Ireland,54°36'N,5°56'W,Europe/Belfast,9
Belgrade,Yugoslavia,44°50'N,20°37'E,Europe/Belgrade,90
Belmopan,Belize,17°18'N,88°30'W,America/Belize,63
Berlin,Germany,52°30'N,13°25'E,Europe/Berlin,35
Bern,Switzerland,46°57'N,07°28'E,Europe/Zurich,510
Bishkek,Kyrgyzstan,42°54'N,74°46'E,Asia/Bishkek,772
Bissau,Guinea-Bissau,11°45'N,15°45'W,Africa/Bissau,0
Bloemfontein,South Africa,29°12'S,26°07'E,Africa/Johannesburg,1398
Bogota,Colombia,04°34'N,74°00'W,America/Bogota,2620
Brasilia,Brazil,15°47'S,47°55'W,Brazil/East,1087
Bratislava,Slovakia,48°10'N,17°07'E,Europe/Bratislava,132
Brazzaville,Congo,04°09'S,15°12'E,Africa/Brazzaville,156
Bridgetown,Barbados,13°05'N,59°30'W,America/Barbados,1
Brisbane,Australia,27°30'S,153°01'E,Australia/Brisbane,25
Brussels,Belgium,50°51'N,04°21'E,Europe/Brussels,62
Bucharest,Romania,44°27'N,26°10'E,Europe/Bucharest,71
Bucuresti,Romania,44°27'N,26°10'E,Europe/Bucharest,71
Budapest,Hungary,47°29'N,19°05'E,Europe/Budapest,120
Buenos Aires,Argentina,34°62'S,58°44'W,America/Buenos_Aires,6
Bujumbura,Burundi,03°16'S,29°18'E,Africa/Bujumbura,782
Cairo,Egypt,30°01'N,31°14'E,Africa/Cairo,74
Canberra,Australia,35°15'S,149°08'E,Australia/Canberra,575
Cape Town,South Africa,33°55'S,18°22'E,Africa/Johannesburg,1700
Caracas,Venezuela,10°30'N,66°55'W,America/Caracas,885
Castries,Saint Lucia,14°02'N,60°58'W,America/St_Lucia,125
Cayenne,French Guiana,05°05'N,52°18'W,America/Cayenne,9
Charlotte Amalie,United States of Virgin Islands,18°21'N,64°56'W,America/Virgin,0
Chisinau,Moldova,47°02'N,28°50'E,Europe/Chisinau,122
Conakry,Guinea,09°29'N,13°49'W,Africa/Conakry,26
Copenhagen,Denmark,55°41'N,12°34'E,Europe/Copenhagen,5
Cotonou,Benin,06°23'N,02°42'E,Africa/Porto-Novo,5
Dakar,Senegal,14°34'N,17°29'W,Africa/Dakar,24
Damascus,Syrian Arab Republic,33°30'N,36°18'E,Asia/Damascus,609
Dammam,Saudi Arabia,26°30'N,50°12'E,Asia/Riyadh,1
Dhaka,Bangladesh,23°43'N,90°26'E,Asia/Dhaka,8
Dili,East Timor,08°29'S,125°34'E,Asia/Dili,11
Djibouti,Djibouti,11°08'N,42°20'E,Africa/Djibouti,19
Dodoma,United Republic of Tanzania,06°08'S,35°45'E,Africa/Dar_es_Salaam,1119
Doha,Qatar,25°15'N,51°35'E,Asia/Qatar,10
Douglas,Isle Of Man,54°9'N,4°29'W,Europe/London,35
Dublin,Ireland,53°21'N,06°15'W,Europe/Dublin,85
Dushanbe,Tajikistan,38°33'N,68°48'E,Asia/Dushanbe,803
El Aaiun,Morocco,27°9'N,13°12'W,UTC,64
Fort-de-France,Martinique,14°36'N,61°02'W,America/Martinique,9
Freetown,Sierra Leone,08°30'N,13°17'W,Africa/Freetown,26
Funafuti,Tuvalu,08°31'S,179°13'E,Pacific/Funafuti,2
Gaborone,Botswana,24°45'S,25°57'E,Africa/Gaborone,1005
George Town,Cayman Islands,19°20'N,81°24'W,America/Cayman,3
Georgetown,Guyana,06°50'N,58°12'W,America/Guyana,30
Gibraltar,Gibraltar,36°9'N,5°21'W,Europe/Gibraltar,3
Guatemala,Guatemala,14°40'N,90°22'W,America/Guatemala,1500
Hanoi,Viet Nam,21°05'N,105°55'E,Asia/Saigon,6
Harare,Zimbabwe,17°43'S,31°02'E,Africa/Harare,1503
Havana,Cuba,23°08'N,82°22'W,America/Havana,59
Helsinki,Finland,60°15'N,25°03'E,Europe/Helsinki,56
Hobart,Tasmania,42°53'S,147°19'E,Australia/Hobart,4
Hong Kong,China,22°16'N,114°09'E,Asia/Hong_Kong,8
Honiara,Solomon Islands,09°27'S,159°57'E,Pacific/Guadalcanal,8
Islamabad,Pakistan,33°40'N,73°10'E,Asia/Karachi,508
Jakarta,Indonesia,06°09'S,106°49'E,Asia/Jakarta,6
Jerusalem,Israel,31°47'N,35°12'E,Asia/Jerusalem,775
Juba,South Sudan,4°51'N,31°36'E,Africa/Juba,550
Jubail,Saudi Arabia,27°02'N,49°39'E,Asia/Riyadh,2
Kabul,Afghanistan,34°28'N,69°11'E,Asia/Kabul,1791
Kampala,Uganda,00°20'N,32°30'E,Africa/Kampala,1155
Kathmandu,Nepal,27°45'N,85°20'E,Asia/Kathmandu,1337
Khartoum,Sudan,15°31'N,32°35'E,Africa/Khartoum,380
Kiev,Ukraine,50°30'N,30°28'E,Europe/Kiev,153
Kigali,Rwanda,01°59'S,30°04'E,Africa/Kigali,1497
Kingston,Jamaica,18°00'N,76°50'W,America/Jamaica,9
Kingston,Norfolk Island,45°20'S,168°43'E,Pacific/Norfolk,113
Kingstown,Saint Vincent and the Grenadines,13°10'N,61°10'W,America/St_Vincent,1
Kinshasa,Democratic Republic of the Congo,04°20'S,15°15'E,Africa/Kinshasa,312
Koror,Palau,07°20'N,134°28'E,Pacific/Palau,33
Kuala Lumpur,Malaysia,03°09'N,101°41'E,Asia/Kuala_Lumpur,22
Kuwait,Kuwait,29°30'N,48°00'E,Asia/Kuwait,55
La Paz,Bolivia,16°20'S,68°10'W,America/La_Paz,4014
Libreville,Gabon,00°25'N,09°26'E,Africa/Libreville,15
Lilongwe,Malawi,14°00'S,33°48'E,Africa/Blantyre,1229
Lima,Peru,12°00'S,77°00'W,America/Lima,13
Lisbon,Portugal,38°42'N,09°10'W,Europe/Lisbon,123
Ljubljana,Slovenia,46°04'N,14°33'E,Europe/Ljubljana,385
Lome,Togo,06°09'N,01°20'E,Africa/Lome,25
London,England,51°30'N,00°07'W,Europe/London,24
Luanda,Angola,08°50'S,13°15'E,Africa/Luanda,6
Lusaka,Zambia,15°28'S,28°16'E,Africa/Lusaka,1154
Luxembourg,Luxembourg,49°37'N,06°09'E,Europe/Luxembourg,232
Macau,Macao,22°12'N,113°33'E,Asia/Macau,6
Madinah,Saudi Arabia,24°28'N,39°36'E,Asia/Riyadh,631
Madrid,Spain,40°25'N,03°45'W,Europe/Madrid,582
Majuro,Marshall Islands,7°4'N,171°16'E,Pacific/Majuro,65
Makkah,Saudi Arabia,21°26'N,39°49'E,Asia/Riyadh,240
Malabo,Equatorial Guinea,03°45'N,08°50'E,Africa/Malabo,56
Male,Maldives,04°00'N,73°28'E,Indian/Maldives,2
Mamoudzou,Mayotte,12°48'S,45°14'E,Indian/Mayotte,420
Managua,Nicaragua,12°06'N,86°20'W,America/Managua,50
Manama,Bahrain,26°10'N,50°30'E,Asia/Bahrain,2
Manila,Philippines,14°40'N,121°03'E,Asia/Manila,21
Maputo,Mozambique,25°58'S,32°32'E,Africa/Maputo,44
Maseru,Lesotho,29°18'S,27°30'E,Africa/Maseru,1628
Masqat,Oman,23°37'N,58°36'E,Asia/Muscat,8
Mbabane,Swaziland,26°18'S,31°06'E,Africa/Mbabane,1243
Mecca,Saudi Arabia,21°26'N,39°49'E,Asia/Riyadh,240
Medina,Saudi Arabia,24°28'N,39°36'E,Asia/Riyadh,631
Mexico,Mexico,19°20'N,99°10'W,America/Mexico_City,2254
Minsk,Belarus,53°52'N,27°30'E,Europe/Minsk,231
Mogadishu,Somalia,02°02'N,45°25'E,Africa/Mogadishu,9
Monaco,Priciplality Of Monaco,43°43'N,7°25'E,Europe/Monaco,206
Monrovia,Liberia,06°18'N,10°47'W,Africa/Monrovia,9
Montevideo,Uruguay,34°50'S,56°11'W,America/Montevideo,32
Moroni,Comoros,11°40'S,43°16'E,Indian/Comoro,29
Moscow,Russian Federation,55°45'N,37°35'E,Europe/Moscow,247
Moskva,Russian Federation,55°45'N,37°35'E,Europe/Moscow,247
Mumbai,India,18°58'N,72°49'E,Asia/Kolkata,14
Muscat,Oman,23°37'N,58°32'E,Asia/Muscat,8
N'Djamena,Chad,12°10'N,14°59'E,Africa/Ndjamena,295
Nairobi,Kenya,01°17'S,36°48'E,Africa/Nairobi,1624
Nassau,Bahamas,25°05'N,77°20'W,America/Nassau,7
Naypyidaw,Myanmar,19°45'N,96°6'E,Asia/Rangoon,104
New Delhi,India,28°37'N,77°13'E,Asia/Kolkata,233
Ngerulmud,Palau,7°30'N,134°37'E,Pacific/Palau,3
Niamey,Niger,13°27'N,02°06'E,Africa/Niamey,223
Nicosia,Cyprus,35°10'N,33°25'E,Asia/Nicosia,162
Nouakchott,Mauritania,20°10'S,57°30'E,Africa/Nouakchott,3
Noumea,New Caledonia,22°17'S,166°30'E,Pacific/Noumea,69
Nuku'alofa,Tonga,21°10'S,174°00'W,Pacific/Tongatapu,6
Nuuk,Greenland,64°10'N,51°35'W,America/Godthab,70
Oranjestad,Aruba,12°32'N,70°02'W,America/Aruba,33
Oslo,Norway,59°55'N,10°45'E,Europe/Oslo,170
Ottawa,Canada,45°27'N,75°42'W,US/Eastern,79
Ouagadougou,Burkina Faso,12°15'N,01°30'W,Africa/Ouagadougou,316
P'yongyang,Democratic People's Republic of Korea,39°09'N,125°30'E,Asia/Pyongyang,21
Pago Pago,American Samoa,14°16'S,170°43'W,Pacific/Pago_Pago,0
Palikir,Micronesia,06°55'N,158°09'E,Pacific/Ponape,71
Panama,Panama,09°00'N,79°25'W,America/Panama,2
Papeete,French Polynesia,17°32'S,149°34'W,Pacific/Tahiti,7
Paramaribo,Suriname,05°50'N,55°10'W,America/Paramaribo,7
Paris,France,48°50'N,02°20'E,Europe/Paris,109
Perth,Australia,31°56'S,115°50'E,Australia/Perth,20
Phnom Penh,Cambodia,11°33'N,104°55'E,Asia/Phnom_Penh,10
Podgorica,Montenegro,42°28'N,19°16'E,Europe/Podgorica,53
Port Louis,Mauritius,20°9'S,57°30'E,Indian/Mauritius,5
Port Moresby,Papua New Guinea,09°24'S,147°08'E,Pacific/Port_Moresby,44
Port-Vila,Vanuatu,17°45'S,168°18'E,Pacific/Efate,1
Port-au-Prince,Haiti,18°40'N,72°20'W,America/Port-au-Prince,34
Port of Spain,Trinidad and Tobago,10°40'N,61°31'W,America/Port_of_Spain,66
Porto-Novo,Benin,06°23'N,02°42'E,Africa/Porto-Novo,38
Prague,Czech Republic,50°05'N,14°22'E,Europe/Prague,365
Praia,Cape Verde,15°02'N,23°34'W,Atlantic/Cape_Verde,35
Pretoria,South Africa,25°44'S,28°12'E,Africa/Johannesburg,1322
Pristina,Albania,42°40'N,21°10'E,Europe/Tirane,576
Quito,Ecuador,00°15'S,78°35'W,America/Guayaquil,2812
Rabat,Morocco,34°1'N,6°50'W,Africa/Casablanca,75
Reykjavik,Iceland,64°10'N,21°57'W,Atlantic/Reykjavik,61
Riga,Latvia,56°53'N,24°08'E,Europe/Riga,7
Riyadh,Saudi Arabia,24°41'N,46°42'E,Asia/Riyadh,612
Road Town,British Virgin Islands,18°27'N,64°37'W,America/Virgin,1
Rome,Italy,41°54'N,12°29'E,Europe/Rome,95
Roseau,Dominica,15°20'N,61°24'W,America/Dominica,72
Saint Helier,Jersey,49°11'N,2°6'W,Etc/GMT,54
Saint Pierre,Saint Pierre and Miquelon,46°46'N,56°12'W,America/Miquelon,5
Saipan,Northern Mariana Islands,15°12'N,145°45'E,Pacific/Saipan,200
Sana,Yemen,15°20'N,44°12'W,Asia/Aden,2199
Sana'a,Yemen,15°20'N,44°12'W,Asia/Aden,2199
San Jose,Costa Rica,09°55'N,84°02'W,America/Costa_Rica,931
San Juan,Puerto Rico,18°28'N,66°07'W,America/Puerto_Rico,21
San Marino,San Marino,43°55'N,12°30'E,Europe/San_Marino,749
San Salvador,El Salvador,13°40'N,89°10'W,America/El_Salvador,621
Santiago,Chile,33°24'S,70°40'W,America/Santiago,476
Santo Domingo,Dominica Republic,18°30'N,69°59'W,America/Santo_Domingo,14
Sao Tome,Sao Tome and Principe,00°10'N,06°39'E,Africa/Sao_Tome,13
Sarajevo,Bosnia and Herzegovina,43°52'N,18°26'E,Europe/Sarajevo,511
Seoul,Republic of Korea,37°31'N,126°58'E,Asia/Seoul,49
Singapore,Republic of Singapore,1°18'N,103°48'E,Asia/Singapore,16
Skopje,The Former Yugoslav Republic of Macedonia,42°01'N,21°26'E,Europe/Skopje,238
Sofia,Bulgaria,42°45'N,23°20'E,Europe/Sofia,531
Sri Jayawardenapura Kotte,Sri Lanka,6°54'N,79°53'E,Asia/Colombo,7
St. George's,Grenada,32°22'N,64°40'W,America/Grenada,7
St. John's,Antigua and Barbuda,17°7'N,61°51'W,America/Antigua,1
St. Peter Port,Guernsey,49°26'N,02°33'W,Europe/Guernsey,1
Stanley,Falkland Islands,51°40'S,59°51'W,Atlantic/Stanley,23
Stockholm,Sweden,59°20'N,18°05'E,Europe/Stockholm,52
Sucre,Bolivia,16°20'S,68°10'W,America/La_Paz,2903
Suva,Fiji,18°06'S,178°30'E,Pacific/Fiji,0
Sydney,Australia,33°53'S,151°13'E,Australia/Sydney,3
Taipei,Republic of China (Taiwan),25°02'N,121°38'E,Asia/Taipei,9
T'bilisi,Georgia,41°43'N,44°50'E,Asia/Tbilisi,467
Tbilisi,Georgia,41°43'N,44°50'E,Asia/Tbilisi,467
Tallinn,Estonia,59°22'N,24°48'E,Europe/Tallinn,39
Tarawa,Kiribati,01°30'N,173°00'E,Pacific/Tarawa,2
Tashkent,Uzbekistan,41°20'N,69°10'E,Asia/Tashkent,489
Tegucigalpa,Honduras,14°05'N,87°14'W,America/Tegucigalpa,994
Tehran,Iran,35°44'N,51°30'E,Asia/Tehran,1191
Thimphu,Bhutan,27°31'N,89°45'E,Asia/Thimphu,2300
Tirana,Albania,41°18'N,19°49'E,Europe/Tirane,90
Tirane,Albania,41°18'N,19°49'E,Europe/Tirane,90
Torshavn,Faroe Islands,62°05'N,06°56'W,Atlantic/Faroe,39
Tokyo,Japan,35°41'N,139°41'E,Asia/Tokyo,8
Tripoli,Libyan Arab Jamahiriya,32°49'N,13°07'E,Africa/Tripoli,81
Tunis,Tunisia,36°50'N,10°11'E,Africa/Tunis,4
Ulan Bator,Mongolia,47°55'N,106°55'E,Asia/Ulaanbaatar,1330
Ulaanbaatar,Mongolia,47°55'N,106°55'E,Asia/Ulaanbaatar,1330
Vaduz,Liechtenstein,47°08'N,09°31'E,Europe/Vaduz,463
Valletta,Malta,35°54'N,14°31'E,Europe/Malta,48
Vienna,Austria,48°12'N,16°22'E,Europe/Vienna,171
Vientiane,Lao People's Democratic Republic,17°58'N,102°36'E,Asia/Vientiane,171
Vilnius,Lithuania,54°38'N,25°19'E,Europe/Vilnius,156
W. Indies,Antigua and Barbuda,17°20'N,61°48'W,America/Antigua,0
Warsaw,Poland,52°13'N,21°00'E,Europe/Warsaw,107
Washington DC,USA,39°91'N,77°02'W,US/Eastern,23
Wellington,New Zealand,41°19'S,174°46'E,Pacific/Auckland,7
Willemstad,Netherlands Antilles,12°05'N,69°00'W,America/Curacao,1
Windhoek,Namibia,22°35'S,17°04'E,Africa/Windhoek,1725
Yamoussoukro,Cote d'Ivoire,06°49'N,05°17'W,Africa/Abidjan,213
Yangon,Myanmar,16°45'N,96°20'E,Asia/Rangoon,33
Yaounde,Cameroon,03°50'N,11°35'E,Africa/Douala,760
Yaren,Nauru,0°32'S,166°55'E,Pacific/Nauru,0
Yerevan,Armenia,40°10'N,44°31'E,Asia/Yerevan,890
Zagreb,Croatia,45°50'N,15°58'E,Europe/Zagreb,123

# UK Cities
Aberdeen,Scotland,57°08'N,02°06'W,Europe/London,65
Birmingham,England,52°30'N,01°50'W,Europe/London,99
Bolton,England,53°35'N,02°15'W,Europe/London,105
Bradford,England,53°47'N,01°45'W,Europe/London,127
Bristol,England,51°28'N,02°35'W,Europe/London,11
Cardiff,Wales,51°29'N,03°13'W,Europe/London,9
Crawley,England,51°8'N,00°10'W,Europe/London,77
Edinburgh,Scotland,55°57'N,03°13'W,Europe/London,61
Glasgow,Scotland,55°50'N,04°15'W,Europe/London,8
Greenwich,England,51°28'N,00°00'W,Europe/London,24
Leeds,England,53°48'N,01°35'W,Europe/London,47
Leicester,England,52°38'N,01°08'W,Europe/London,138
Liverpool,England,53°25'N,03°00'W,Europe/London,25
Manchester,England,53°30'N,02°15'W,Europe/London,78
Newcastle Upon Time,England,54°59'N,01°36'W,Europe/London,47
Newcastle,England,54°59'N,01°36'W,Europe/London,47
Norwich,England,52°38'N,01°18'E,Europe/London,18
Oxford,England,51°45'N,01°15'W,Europe/London,72
Plymouth,England,50°25'N,04°15'W,Europe/London,50
Portsmouth,England,50°48'N,01°05'W,Europe/London,9
Reading,England,51°27'N,0°58'W,Europe/London,84
Sheffield,England,53°23'N,01°28'W,Europe/London,105
Southampton,England,50°55'N,01°25'W,Europe/London,9
Swansea,England,51°37'N,03°57'W,Europe/London,91
Swindon,England,51°34'N,01°47'W,Europe/London,112
Wolverhampton,England,52°35'N,2°08'W,Europe/London,89
Barrow-In-Furness,England,54°06'N,3°13'W,Europe/London,20

# US State Capitals
Montgomery,USA,32°21'N,86°16'W,US/Central,42
Juneau,USA,58°23'N,134°11'W,US/Alaska,29
Phoenix,USA,33°26'N,112°04'W,America/Phoenix,331
Little Rock,USA,34°44'N,92°19'W,US/Central,95
Sacramento,USA,38°33'N,121°28'W,US/Pacific,15
Denver,USA,39°44'N,104°59'W,US/Mountain,1600
Hartford,USA,41°45'N,72°41'W,US/Eastern,9
Dover,USA,39°09'N,75°31'W,US/Eastern,8
Tallahassee,USA,30°27'N,84°16'W,US/Eastern,59
Atlanta,USA,33°45'N,84°23'W,US/Eastern,267
Honolulu,USA,21°18'N,157°49'W,US/Hawaii,229
Boise,USA,43°36'N,116°12'W,US/Mountain,808
Springfield,USA,39°47'N,89°39'W,US/Central,190
Indianapolis,USA,39°46'N,86°9'W,US/Eastern,238
Des Moines,USA,41°35'N,93°37'W,US/Central,276
Topeka,USA,39°03'N,95°41'W,US/Central,289
Frankfort,USA,38°11'N,84°51'W,US/Eastern,243
Baton Rouge,USA,30°27'N,91°8'W,US/Central,15
Augusta,USA,44°18'N,69°46'W,US/Eastern,41
Annapolis,USA,38°58'N,76°30'W,US/Eastern,0
Boston,USA,42°21'N,71°03'W,US/Eastern,6
Lansing,USA,42°44'N,84°32'W,US/Eastern,271
Saint Paul,USA,44°56'N,93°05'W,US/Central,256
Jackson,USA,32°17'N,90°11'W,US/Central,90
Jefferson City,USA,38°34'N,92°10'W,US/Central,167
Helena,USA,46°35'N,112°1'W,US/Mountain,1150
Lincoln,USA,40°48'N,96°40'W,US/Central,384
Carson City,USA,39°9'N,119°45'W,US/Pacific,1432
Concord,USA,43°12'N,71°32'W,US/Eastern,117
Trenton,USA,40°13'N,74°45'W,US/Eastern,28
Santa Fe,USA,35°40'N,105°57'W,US/Mountain,2151
Albany,USA,42°39'N,73°46'W,US/Eastern,17
Raleigh,USA,35°49'N,78°38'W,US/Eastern,90
Bismarck,USA,46°48'N,100°46'W,US/Central,541
Columbus,USA,39°59'N,82°59'W,US/Eastern,271
Oklahoma City,USA,35°28'N,97°32'W,US/Central,384
Salem,USA,44°55'N,123°1'W,US/Pacific,70
Harrisburg,USA,40°16'N,76°52'W,US/Eastern,112
Providence,USA,41°49'N,71°25'W,US/Eastern,2
Columbia,USA,34°00'N,81°02'W,US/Eastern,96
Pierre,USA,44°22'N,100°20'W,US/Central,543
Nashville,USA,36°10'N,86°47'W,US/Central,149
Austin,USA,30°16'N,97°45'W,US/Central,167
Salt Lake City,USA,40°45'N,111°53'W,US/Mountain,1294
Montpelier,USA,44°15'N,72°34'W,US/Eastern,325
Richmond,USA,37°32'N,77°25'W,US/Eastern,68
Olympia,USA,47°2'N,122°53'W,US/Pacific,35
Charleston,USA,38°20'N,81°38'W,US/Eastern,11
Madison,USA,43°4'N,89°24'W,US/Central,281
Cheyenne,USA,41°8'N,104°48'W,US/Mountain,1860

# Major US Cities
Birmingham,USA,33°39'N,86°48'W,US/Central,197
Anchorage,USA,61°13'N,149°53'W,US/Alaska,30
Los Angeles,USA,34°03'N,118°15'W,US/Pacific,50
San Francisco,USA,37°46'N,122°25'W,US/Pacific,47
Bridgeport,USA,41°11'N,73°11'W,US/Eastern,13
Wilmington,USA,39°44'N,75°32'W,US/Eastern,15
Jacksonville,USA,30°19'N,81°39'W,US/Eastern,13
Miami,USA,26°8'N,80°12'W,US/Eastern,10
Chicago,USA,41°50'N,87°41'W,US/Central,189
Wichita,USA,37°41'N,97°20'W,US/Central,399
Louisville,USA,38°15'N,85°45'W,US/Eastern,142
New Orleans,USA,29°57'N,90°4'W,US/Central,10
Portland,USA,43°39'N,70°16'W,US/Eastern,6
Baltimore,USA,39°17'N,76°37'W,US/Eastern,31
Detroit,USA,42°19'N,83°2'W,US/Eastern,189
Minneapolis,USA,44°58'N,93°15'W,US/Central,260
Kansas City,USA,39°06'N,94°35'W,US/Central,256
Billings,USA,45°47'N,108°32'W,US/Mountain,946
Omaha,USA,41°15'N,96°0'W,US/Central,299
Las Vegas,USA,36°10'N,115°08'W,US/Pacific,720
Manchester,USA,42°59'N,71°27'W,US/Eastern,56
Newark,USA,40°44'N,74°11'W,US/Eastern,4
Albuquerque,USA,35°06'N,106°36'W,US/Mountain,1523
New York,USA,40°43'N,74°0'W,US/Eastern,17
Charlotte,USA,35°13'N,80°50'W,US/Eastern,217
Fargo,USA,46°52'N,96°47'W,US/Central,271
Cleveland,USA,41°28'N,81°40'W,US/Eastern,210
Philadelphia,USA,39°57'N,75°10'W,US/Eastern,62
Sioux Falls,USA,43°32'N,96°43'W,US/Central,443
Memphis,USA,35°07'N,89°58'W,US/Central,84
Houston,USA,29°45'N,95°22'W,US/Central,8
Dallas,USA,32°47'N,96°48'W,US/Central,137
Burlington,USA,44°28'N,73°9'W,US/Eastern,35
Virginia Beach,USA,36°50'N,76°05'W,US/Eastern,9
Seattle,USA,47°36'N,122°19'W,US/Pacific,63
Milwaukee,USA,43°03'N,87°57'W,US/Central,188
San Diego,USA,32°42'N,117°09'W,US/Pacific,16
Orlando,USA,28°32'N,81°22'W,US/Eastern,35
Buffalo,USA,42°54'N,78°50'W,US/Eastern,188
Toledo,USA,41°39'N,83°34'W,US/Eastern,180

# Canadian cities
Vancouver,Canada,49°15'N,123°6'W,America/Vancouver,55
Calgary,Canada,51°2'N,114°3'W,America/Edmonton,1040
Edmonton,Canada,53°32'N,113°29'W,America/Edmonton,664
Saskatoon,Canada,52°8'N,106°40'W,America/Regina,480
Regina,Canada,50°27'N,104°36'W,America/Regina,577
Winnipeg,Canada,49°53'N,97°8'W,America/Winnipeg,229
Toronto,Canada,43°39'N,79°22'W,America/Toronto,77
Montreal,Canada,45°30'N,73°33'W,America/Montreal,23
Quebec,Canada,46°48'N,71°14'W,America/Toronto,87
Fredericton,Canada,45°57'N,66°38'W,America/Halifax,8
Halifax,Canada,44°38'N,63°34'W,America/Halifax,36
Charlottetown,Canada,46°14'N,63°7'W,America/Halifax,2
St. John's,Canada,47°33'N,52°42'W,America/Halifax,116
Whitehorse,Canada,60°43'N,135°3'W,America/Whitehorse,696
Yellowknife,Canada,62°27'N,114°22'W,America/Yellowknife,191
Iqaluit,Canada,63°44'N,68°31'W,America/Iqaluit,3
"""

class AstralError(Exception):
    pass

class Location(object):
    """Provides access to information for single location."""

    def __init__(self, info=None):
        """Initializes the object with a tuple of information.

        :param info: A tuple of information to fill in the location info.

            The tuple should contain items in the following order

            ================ =============
            Field            Default
            ================ =============
            name             Greenwich
            region           England
            latitude         51.168
            longitude        0
            time zone name   Europe/London
            elevation        24
            ================ =============

            See :attr:`timezone` property for a method of obtaining time zone
            names
        """

        self.astral = None
        if info is None:
            self.name = 'Greenwich'
            self.region = 'England'
            self._latitude = 51.168
            self._longitude = 0.0
            self._timezone_group = 'Europe'
            self._timezone_location = 'London'
            self._elevation = 24
        else:
            self.name = ''
            self.region = ''
            self._latitude = 0.0
            self._longitude = 0.0
            self._timezone_group = ''
            self._timezone_location = ''
            self._elevation = 0

            try:
                self.name = info[0]
                self.region = info[1]
                self.latitude = info[2]
                self.longitude = info[3]
                self.timezone = info[4]
                self.elevation = info[5]
            except IndexError:
                pass

        self.url = ''

    def __repr__(self):
        repr_format = '%s/%s, tz=%s, lat=%0.02f, lon=%0.02f'
        return repr_format % (self.name, self.region,
                              self.timezone,
                              self.latitude, self.longitude)

    @property
    def latitude(self):
        """The location's latitude

        ``latitude`` can be set either as a string or as a number

        For strings they must be of the form

            degrees°minutes'[N|S] e.g. 51°31'N

        For numbers, positive numbers signify latitudes to the North.
        """

        return self._latitude

    @latitude.setter
    def latitude(self, latitude):
        if isinstance(latitude, str) or isinstance(latitude, ustr):
            (deg, rest) = latitude.split("°", 1)
            (minute, rest) = rest.split("'", 1)

            self._latitude = float(deg) + (float(minute) / 60)

            if latitude.endswith("S"):
                self._latitude = -self._latitude
        else:
            self._latitude = float(latitude)

    @property
    def longitude(self):
        """The location's longitude.

        ``longitude`` can be set either as a string or as a number

        For strings they must be of the form

            degrees°minutes'[E|W] e.g. 51°31'W

        For numbers, positive numbers signify longitudes to the East.
        """

        return self._longitude

    @longitude.setter
    def longitude(self, longitude):
        if isinstance(longitude, str) or isinstance(longitude, ustr):
            (deg, rest) = longitude.split("°", 1)
            (minute, rest) = rest.split("'", 1)

            self._longitude = float(deg) + (float(minute) / 60)

            if longitude.endswith("W"):
                self._longitude = -self._longitude
        else:
            self._longitude = float(longitude)

    @property
    def elevation(self):
        """The elevation in metres above sea level."""

        return self._elevation

    @elevation.setter
    def elevation(self, elevation):
        self._elevation = int(elevation)

    @property
    def timezone(self):
        """The name of the time zone for the location.

        A list of time zone names can be obtained from pytz. For example.

        >>> from pytz import all_timezones
        >>> for timezone in all_timezones:
        ...     print(timezone)
        """

        if self._timezone_location != '':
            return '%s/%s' % (self._timezone_group,
                              self._timezone_location)
        else:
            return self._timezone_group

    @timezone.setter
    def timezone(self, name):
        if name not in pytz.all_timezones:
            raise ValueError('Timezone \'%s\' not recognized' % name)

        try:
            self._timezone_group, self._timezone_location = \
                name.split('/', 1)
        except ValueError:
            self._timezone_group = name
            self._timezone_location = ''

    @property
    def tz(self):
        """Time zone information."""

        try:
            tz = pytz.timezone(self.timezone)
            return tz
        except pytz.UnknownTimeZoneError:
            raise AstralError('Unknown timezone \'%s\'' % self.timezone)

    tzinfo = tz

    @property
    def solar_depression(self):
        """The number of degrees the sun must be below the horizon for the
        dawn/dusk calculation.

        Can either be set as a number of degrees below the horizon or as
        one of the following strings

        ============= =======
        String        Degrees
        ============= =======
        civil            6.0
        nautical        12.0
        astronomical    18.0
        ============= =======
        """

        return self.astral.solar_depression

    @solar_depression.setter
    def solar_depression(self, depression):
        if self.astral is None:
            self.astral = Astral()

        self.astral.solar_depression = depression

    def sun(self, date=None, local=True):
        """Returns dawn, sunrise, noon, sunset and dusk as a dictionary.

        :param date: The date for which to calculate the times.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: Dictionary with keys ``dawn``, ``sunrise``, ``noon``,
            ``sunset`` and ``dusk`` whose values are the results of the
            corresponding methods.
        :rtype: dict
         """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        sun = self.astral.sun_utc(date, self.latitude, self.longitude)

        if local:
            for key, dt in sun.items():
                sun[key] = dt.astimezone(self.tz)

        return sun

    def dawn(self, date=None, local=True):
        """Calculates the time in the morning when the sun is a certain number
        of degrees below the horizon. By default this is 6 degrees but can be
        changed by setting the :attr:`Astral.solar_depression` property.

        :param date: The date for which to calculate the dawn time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which dawn occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        dawn = self.astral.dawn_utc(date, self.latitude, self.longitude)

        if local:
            return dawn.astimezone(self.tz)
        else:
            return dawn

    def sunrise(self, date=None, local=True):
        """Return sunrise time.

        Calculates the time in the morning when the sun is a 0.833 degrees
        below the horizon. This is to account for refraction.

        :param date: The date for which to calculate the sunrise time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which sunrise occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        sunrise = self.astral.sunrise_utc(date, self.latitude, self.longitude)

        if local:
            return sunrise.astimezone(self.tz)
        else:
            return sunrise

    def solar_noon(self, date=None, local=True):
        """Calculates the solar noon (the time when the sun is at its highest
        point.)

        :param date: The date for which to calculate the noon time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which the solar noon occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        noon = self.astral.solar_noon_utc(date, self.longitude)

        if local:
            return noon.astimezone(self.tz)
        else:
            return noon

    def sunset(self, date=None, local=True):
        """Calculates sunset time (the time in the evening when the sun is a
        0.833 degrees below the horizon. This is to account for refraction.)

        :param date: The date for which to calculate the sunset time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which sunset occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        sunset = self.astral.sunset_utc(date, self.latitude, self.longitude)

        if local:
            return sunset.astimezone(self.tz)
        else:
            return sunset

    def dusk(self, date=None, local=True):
        """Calculates the dusk time (the time in the evening when the sun is a
        certain number of degrees below the horizon. By default this is 6
        degrees but can be changed by setting the
        :attr:`solar_depression` property.)

        :param date: The date for which to calculate the dusk time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which dusk occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        dusk = self.astral.dusk_utc(date, self.latitude, self.longitude)

        if local:
            return dusk.astimezone(self.tz)
        else:
            return dusk

    def daylight(self, date=None, local=True):
        """Calculates the daylight time (the time between sunrise and sunset)

        :param date: The date for which to calculate daylight.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: A tuple containing the start and end times
        :rtype: tuple(:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        start, end = self.astral.daylight_utc(date, self.latitude, self.longitude)

        if local:
            return start.astimezone(self.tz), end.astimezone(self.tz)
        else:
            return start, end

    def night(self, date=None, local=True):
        """Calculates the night time (the time between astronomical dusk and
        astronomical dawn of the next day)

        :param date: The date for which to calculate the start of the night time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: A tuple containing the start and end times
        :rtype: tuple(:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        start, end = self.astral.night_utc(date, self.latitude, self.longitude)

        if local:
            return start.astimezone(self.tz), end.astimezone(self.tz)
        else:
            return start, end

    def twilight(self, direction=SUN_RISING, date=None, local=True):
        """Returns the start and end times of Twilight in the UTC timezone when
        the sun is traversing in the specified direction.
        
        This method defines twilight as being between the time
        when the sun is at -6 degrees and sunrise/sunset.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``.
        :type direction:   int
        :param date: The date for which to calculate the times.
        :type date: :class:`datetime.date`
        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :return: A tuple of the UTC date and time at which twilight starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if date is None:
            date = datetime.date.today()
            
        start, end = self.astral.twilight_utc(date, direction,
                                              self.latitude, self.longitude)

        if local:
            return start.astimezone(self.tz), end.astimezone(self.tz)
        else:
            return start, end

    def time_at_elevation(self, elevation, direction=SUN_RISING, date=None, local=True):
        """Calculate the time when the sun is at the specified elevation.
        
        Note:
            This method uses positive elevations for those above the horizon.
            
            Elevations greater than 90 degrees are converted to a setting sun
            i.e. an elevation of 110 will calculate a setting sun at 70 degrees.

        :param elevation:  Elevation in degrees above the horizon to calculate for.
        :type elevation:   float
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``. Default is rising.
        :type direction:   int
        :param date: The date for which to calculate the elevation time.
                     If no date is specified then the current date will be used.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.
                      If not specified then the time will be returned in local time

        :returns: The date and time at which dusk occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()
        
        if elevation > 90.0:
            elevation = 180.0 - elevation
            direction = SUN_SETTING

        time_ = self.astral.time_at_elevation_utc(elevation, direction, date, self.latitude, self.longitude)

        if local:
            return time_.astimezone(self.tz)
        else:
            return time_

    def rahukaalam(self, date=None, local=True):
        """Calculates the period of rahukaalam.

        :param date: The date for which to calculate the rahukaalam period.
                     A value of ``None`` uses the current date.

        :param local: True  = Time to be returned in location's time zone;
                      False = Time to be returned in UTC.

        :return: Tuple containing the start and end times for Rahukaalam.
        :rtype: tuple
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        rahukaalam = self.astral.rahukaalam_utc(date,
                                                self.latitude, self.longitude)

        if local:
            rahukaalam = (rahukaalam[0].astimezone(self.tz),
                          rahukaalam[1].astimezone(self.tz))

        return rahukaalam
    
    def golden_hour(self, direction=SUN_RISING, date=None, local=True):
        """Returns the start and end times of the Golden Hour when the sun is traversing
        in the specified direction.
        
        This method uses the definition from PhotoPills i.e. the
        golden hour is when the sun is between 4 degrees below the horizon
        and 6 degrees above.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``. Default is rising.
        :type direction:   int
        :param date: The date for which to calculate the times.
        :type date: :class:`datetime.date`
        :param local: True  = Times to be returned in location's time zone;
                      False = Times to be returned in UTC.
                      If not specified then the time will be returned in local time

        :return: A tuple of the date and time at which the Golden Hour starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        start, end = self.astral.golden_hour_utc(direction, date,
                                                 self.latitude, self.longitude)        
        
        if local:
            start = start.astimezone(self.tz)
            end = end.astimezone(self.tz)
        
        return start, end
    
    def blue_hour(self, direction=SUN_RISING, date=None, local=True):
        """Returns the start and end times of the Blue Hour when the sun is traversing
        in the specified direction.
        
        This method uses the definition from PhotoPills i.e. the
        blue hour is when the sun is between 6 and 4 degrees below the horizon.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``. Default is rising.
        :type direction:   int
        :param date: The date for which to calculate the times.
                     If no date is specified then the current date will be used.

        :param local: True  = Times to be returned in location's time zone;
                      False = Times to be returned in UTC.
                      If not specified then the time will be returned in local time

        :return: A tuple of the date and time at which the Blue Hour starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()
            
        start, end = self.astral.blue_hour_utc(direction, date,
                                               self.latitude, self.longitude)
        
        if local:
            start = start.astimezone(self.tz)
            end = end.astimezone(self.tz)
        
        return start, end

    def solar_azimuth(self, dateandtime=None):
        """Calculates the solar azimuth angle for a specific date/time.

        :param dateandtime: The date and time for which to calculate the angle.
        :type dateandtime: :class:`~datetime.datetime`

        :returns: The azimuth angle in degrees clockwise from North.
        :rtype: float
        """

        if self.astral is None:
            self.astral = Astral()

        if dateandtime is None:
            dateandtime = datetime.datetime.now(self.tz)
        elif not dateandtime.tzinfo:
            dateandtime = self.tz.localize(dateandtime)
            
        dateandtime = dateandtime.astimezone(pytz.UTC)

        return self.astral.solar_azimuth(dateandtime,
                                         self.latitude, self.longitude)

    def solar_elevation(self, dateandtime=None):
        """Calculates the solar elevation angle for a specific time.

        :param dateandtime: The date and time for which to calculate the angle.
        :type dateandtime: :class:`~datetime.datetime`

        :returns: The elevation angle in degrees above the horizon.
        :rtype: float
        """

        if self.astral is None:
            self.astral = Astral()

        if dateandtime is None:
            dateandtime = datetime.datetime.now(self.tz)
        elif not dateandtime.tzinfo:
            dateandtime = self.tz.localize(dateandtime)
            
        dateandtime = dateandtime.astimezone(pytz.UTC)

        return self.astral.solar_elevation(dateandtime,
                                           self.latitude, self.longitude)

    def solar_zenith(self, dateandtime=None):
        """Calculates the solar zenith angle for a specific time.

        :param dateandtime: The date and time for which to calculate the angle.
        :type dateandtime: :class:`~datetime.datetime`

        :returns: The zenith angle in degrees above the horizon.
        :rtype: float
        """

        return self.solar_elevation(dateandtime)

    def moon_phase(self, date=None):
        """Calculates the moon phase for a specific date.

        :param date: The date to calculate the phase for.
                     If ommitted the current date is used.
        :type date: :class:`datetime.date`

        :returns:
            A number designating the phase

                | 0  = New moon
                | 7  = First quarter
                | 14 = Full moon
                | 21 = Last quarter
        :rtype: int
        """

        if self.astral is None:
            self.astral = Astral()

        if date is None:
            date = datetime.date.today()

        return self.astral.moon_phase(date)


class LocationGroup(object):
    def __init__(self, name):
        self.name = name
        self._locations = {}

    def __getitem__(self, key):
        """Returns a Location object for the specified `key`.

            group = astral.europe
            location = group['London']

        You can supply an optional region name by adding a comma
        followed by the region name. Where multiple locations have the
        same name you may need to supply the region name otherwise
        the first result will be returned which may not be the one
        you're looking for.

            location = group['Abu Dhabi,United Arab Emirates']

        Handles location names with spaces and mixed case.
        """

        key = self._sanitize_key(key)

        try:
            lookup_name, lookup_region = key.split(',', 1)
        except ValueError:
            lookup_name = key
            lookup_region = ''

        lookup_name = lookup_name.strip('"\'')
        lookup_region = lookup_region.strip('"\'')

        for (location_name, location_list) in self._locations.items():
            if location_name == lookup_name:
                if lookup_region == '':
                    return location_list[0]

                for location in location_list:
                    if self._sanitize_key(location.region) == lookup_region:
                        return location

        raise KeyError('Unrecognised location name - %s' % key)

    def __setitem__(self, key, value):
        key = self._sanitize_key(key)
        if key not in self._locations:
            self._locations[key] = [value]
        else:
            self._locations[key].append(value)

    def __contains__(self, key):
        key = self._sanitize_key(key)
        for name in self._locations.keys():
            if name == key:
                return True

        return False

    def __iter__(self):
        for location_list in self._locations.values():
            for location in location_list:
                yield location

    def keys(self):
        return self._locations.keys()

    def values(self):
        return self._locations.values()

    def items(self):
        return self._locations.items()

    @property
    def locations(self):
        k = []
        for location_list in self._locations.values():
            for location in location_list:
                k.append(location.name)

        return k

    def _sanitize_key(self, key):
        return str(key).lower().replace(' ', '_')


class AstralGeocoder(object):
    """Looks up geographic information from the locations stored within the
    module
    """

    def __init__(self):
        self._groups = {}

        locations = _LOCATION_INFO.split('\n')
        for line in locations:
            line = line.strip()
            if line != '' and line[0] != '#':
                if line[-1] == '\n':
                    line = line[:-1]

                info = line.split(',')

                l = Location(info)

                key = l._timezone_group.lower()
                try:
                    group = self.__getattr__(key)
                except AttributeError:
                    group = LocationGroup(l._timezone_group)
                    self._groups[key] = group

                group[info[0].lower()] = l

    def __getattr__(self, key):
        """Access to each timezone group. For example London is in timezone
        group Europe.

        Attribute lookup is case insensitive"""

        key = str(key).lower()
        for name, value in self._groups.items():
            if name == key:
                return value

        raise AttributeError('Group \'%s\' not found' % key)

    def __getitem__(self, key):
        """Lookup a location within all timezone groups.

        Item lookup is case insensitive."""

        key = str(key).lower()
        for group in self._groups.values():
            try:
                return group[key]
            except KeyError:
                pass

        raise KeyError('Unrecognised location name - %s' % key)

    def __iter__(self):
        return self._groups.__iter__()

    def __contains__(self, key):
        key = str(key).lower()
        for name, group in self._groups.items():
            if name == key:
                return True

            if key in group:
                return True

        return False

    @property
    def locations(self):
        k = []
        for group in self._groups.values():
            k.extend(group.locations)

        return k

    @property
    def groups(self):
        return self._groups


class GoogleGeocoder(object):
    """Use Google Maps API Web Service to lookup GPS co-ordinates, timezone and
    elevation.

    See the following for more info.
    https://developers.google.com/maps/documentation/
    """

    def __init__(self, cache=False):
        self.cache = cache
        self.geocache = {}
        self._location_query_base = 'http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false'
        self._timezone_query_base = 'https://maps.googleapis.com/maps/api/timezone/json?location=%f,%f&timestamp=%d&sensor=false'
        self._elevation_query_base = 'http://maps.googleapis.com/maps/api/elevation/json?locations=%f,%f&sensor=false'

    def __getitem__(self, key):
        if self.cache and key in self.geocache:
            return self.geocache[key]

        location = Location()
        try:
            self._get_geocoding(key, location)
            self._get_timezone(location)
            self._get_elevation(location)
        except URLError:
            raise AstralError(('GoogleGeocoder: Unable to contact '
                               'Google maps API'))

        url = 'http://maps.google.com/maps?q=loc:%f,%f'
        location.url = url % (location.latitude, location.longitude)

        if self.cache:
            self.geocache[key] = location

        return location

    def _get_geocoding(self, key, location):
        """Lookup the Google geocoding API information for `key`"""

        url = self._location_query_base % quote_plus(key)
        data = self._read_from_url(url)
        response = json.loads(data)
        if response['status'] == 'OK':
            formatted_address = response['results'][0]['formatted_address']
            pos = formatted_address.find(',')
            if pos == -1:
                location.name = formatted_address
                location.region = ''
            else:
                location.name = formatted_address[:pos].strip()
                location.region = formatted_address[pos + 1:].strip()

            l = response['results'][0]['geometry']['location']
            location.latitude = float(l['lat'])
            location.longitude = float(l['lng'])
        else:
            raise AstralError('GoogleGeocoder: Unable to locate %s' % key)

    def _get_timezone(self, location):
        """Query the timezone information with the latitude and longitude of
        the specified `location`.

        This function assumes the timezone of the location has always been
        the same as it is now by using time() in the query string.
        """

        url = self._timezone_query_base % (location.latitude,
                                           location.longitude,
                                           int(time()))
        data = self._read_from_url(url)
        response = json.loads(data)
        if response['status'] == 'OK':
            location.timezone = response['timeZoneId']
        else:
            location.timezone = 'UTC'

    def _get_elevation(self, location):
        """Query the elevation information with the latitude and longitude of
        the specified `location`.
        """

        url = self._elevation_query_base % (location.latitude,
                                            location.longitude)
        data = self._read_from_url(url)
        response = json.loads(data)
        if response['status'] == 'OK':
            location.elevation = int(float(response['results'][0]['elevation']))
        else:
            location.elevation = 0

    def _read_from_url(self, url):
        ds = urlopen(url)
        content_types = ds.headers.get('Content-Type').split(';')

        charset = 'UTF-8'
        for ct in content_types:
            if ct.strip().startswith('charset'):
                charset = ct.split('=')[1]

        data = ds.read().decode(charset)
        ds.close()

        return data


class Astral(object):
    def __init__(self, geocoder=AstralGeocoder):
        """Initialise the geocoder and set the default depression."""

        self.geocoder = geocoder()
        self._depression = 6  # Set default depression in degrees

    def __getitem__(self, key):
        """Returns the Location instance specified by ``key``."""

        location = self.geocoder[key]
        location.astral = self
        return location

    @property
    def solar_depression(self):
        """The number of degrees the sun must be below the horizon for the
        dawn/dusk calculation.

        Can either be set as a number of degrees below the horizon or as
        one of the following strings

        ============= =======
        String        Degrees
        ============= =======
        civil            6.0
        nautical        12.0
        astronomical    18.0
        ============= =======
        """

        return self._depression

    @solar_depression.setter
    def solar_depression(self, depression):
        if isinstance(depression, str) or isinstance(depression, ustr):
            try:
                self._depression = {
                    'civil': 6,
                    'nautical': 12,
                    'astronomical': 18}[depression]
            except:
                raise KeyError(("solar_depression must be either a number "
                                "or one of 'civil', 'nautical' or "
                                "'astronomical'"))
        else:
            self._depression = float(depression)

    def sun_utc(self, date, latitude, longitude):
        """Calculate all the info for the sun at once.
        All times are returned in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :returns: Dictionary with keys ``dawn``, ``sunrise``, ``noon``,
            ``sunset`` and ``dusk`` whose values are the results of the
            corresponding `_utc` methods.
        :rtype: dict
        """

        dawn = self.dawn_utc(date, latitude, longitude)
        sunrise = self.sunrise_utc(date, latitude, longitude)
        noon = self.solar_noon_utc(date, longitude)
        sunset = self.sunset_utc(date, latitude, longitude)
        dusk = self.dusk_utc(date, latitude, longitude)

        return {
            'dawn': dawn,
            'sunrise': sunrise,
            'noon': noon,
            'sunset': sunset,
            'dusk': dusk
        }

    def dawn_utc(self, date, latitude, longitude, depression=0):
        """Calculate dawn time in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float
        :param depression: Override the depression used
        :type depression:  float

        :return: The UTC date and time at which dawn occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if depression == 0:
            depression = self._depression
        depression += 90

        try:
            return self._calc_time(depression, SUN_RISING, date, latitude, longitude)
        except:
            raise AstralError(('Sun never reaches %d degrees below the horizon, '
                               'at this location.') % (depression - 90))

    def sunrise_utc(self, date, latitude, longitude):
        """Calculate sunrise time in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The UTC date and time at which sunrise occurs.
        :rtype: :class:`~datetime.datetime`
        """

        try:
            return self._calc_time(90 + 0.833, SUN_RISING, date, latitude, longitude)
        except:
            raise AstralError(('Sun remains below the horizon on this day, '
                               'at this location.'))

    def solar_noon_utc(self, date, longitude):
        """Calculate solar noon time in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The UTC date and time at which noon occurs.
        :rtype: :class:`~datetime.datetime`
        """

        julianday = self._julianday(date)

        newt = self._jday_to_jcentury(julianday + 0.5 + -longitude / 360.0)

        eqtime = self._eq_of_time(newt)
        timeUTC = 720.0 + (-longitude * 4.0) - eqtime

        timeUTC = timeUTC / 60.0
        hour = int(timeUTC)
        minute = int((timeUTC - hour) * 60)
        second = int((((timeUTC - hour) * 60) - minute) * 60)

        if second > 59:
            second -= 60
            minute += 1
        elif second < 0:
            second += 60
            minute -= 1

        if minute > 59:
            minute -= 60
            hour += 1
        elif minute < 0:
            minute += 60
            hour -= 1

        if hour > 23:
            hour -= 24
            date += datetime.timedelta(days=1)
        elif hour < 0:
            hour += 24
            date -= datetime.timedelta(days=1)

        noon = datetime.datetime(date.year, date.month, date.day,
                                 hour, minute, second)
        noon = pytz.UTC.localize(noon)

        return noon

    def sunset_utc(self, date, latitude, longitude):
        """Calculate sunset time in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The UTC date and time at which sunset occurs.
        :rtype: :class:`~datetime.datetime`
        """

        try:
            return self._calc_time(90 + 0.833, SUN_SETTING, date, latitude, longitude)
        except:
            raise AstralError(('Sun remains above the horizon on this day, '
                               'at this location.'))

    def dusk_utc(self, date, latitude, longitude, depression=0):
        """Calculate dusk time in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float
        :param depression: Override the depression used
        :type depression:   float

        :return: The UTC date and time at which dusk occurs.
        :rtype: :class:`~datetime.datetime`
        """

        if depression == 0:
            depression = self._depression
        depression += 90

        try:
            return self._calc_time(depression, SUN_SETTING, date, latitude, longitude)
        except:
            raise AstralError(('Sun never reaches %d degrees below the horizon, '
                               'at this location.') % (depression - 90))

    def daylight_utc(self, date, latitude, longitude):
        """Calculate daylight start and end times in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: A tuple of the UTC date and time at which daylight starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        start = self.sunrise_utc(date, latitude, longitude)
        end = self.sunset_utc(date, latitude, longitude)

        return start, end

    def night_utc(self, date, latitude, longitude):
        """Calculate night start and end times in the UTC timezone.
        
        Night is calculated to be between astronomical dusk on the
        date specified and astronomical dawn of the next day.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: A tuple of the UTC date and time at which night starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        start = self.dusk_utc(date, latitude, longitude, 18)
        tomorrow = date + datetime.timedelta(days=1)
        end = self.dawn_utc(tomorrow, latitude, longitude, 18)

        return start, end

    def twilight_utc(self, direction, date, latitude, longitude):
        """Returns the start and end times of Twilight in the UTC timezone when
        the sun is traversing in the specified direction.
        
        This method defines twilight as being between the time
        when the sun is at -6 degrees and sunrise/sunset.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``.
        :type direction:   int
        :param date: The date for which to calculate the times.
        :type date: :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: A tuple of the UTC date and time at which twilight starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if date is None:
            date = datetime.date.today()
        
        start = self.time_at_elevation_utc(-6, direction, date, latitude, longitude)
        if direction == SUN_RISING:
            end = self.sunrise_utc(date, latitude, longitude)
        else:
            end = self.sunset_utc(date, latitude, longitude)
        
        if direction == SUN_RISING:
            return start, end
        else:
            return end, start
    
    def golden_hour_utc(self, direction, date, latitude, longitude):
        """Returns the start and end times of the Golden Hour in the UTC timezone
        when the sun is traversing in the specified direction.
        
        This method uses the definition from PhotoPills i.e. the
        golden hour is when the sun is between 4 degrees below the horizon
        and 6 degrees above.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``.
        :type direction:   int
        :param date: The date for which to calculate the times.
        :type date: :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: A tuple of the UTC date and time at which the Golden Hour starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if date is None:
            date = datetime.date.today()
        
        start = self.time_at_elevation_utc(-4, direction, date,
                                           latitude, longitude)
        end = self.time_at_elevation_utc(6, direction, date,
                                         latitude, longitude)
        
        if direction == SUN_RISING:
            return start, end
        else:
            return end, start

    def blue_hour_utc(self, direction, date, latitude, longitude):
        """Returns the start and end times of the Blue Hour in the UTC timezone
        when the sun is traversing in the specified direction.
        
        This method uses the definition from PhotoPills i.e. the
        blue hour is when the sun is between 6 and 4 degrees below the horizon.
        
        :param direction:  Determines whether the time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``.
        :type direction:   int
        :param date: The date for which to calculate the times.
        :type date: :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: A tuple of the UTC date and time at which the Blue Hour starts and ends.
        :rtype: (:class:`~datetime.datetime`, :class:`~datetime.datetime`)
        """

        if date is None:
            date = datetime.date.today()
        
        start = self.time_at_elevation_utc(-6, direction, date,
                                           latitude, longitude)
        end = self.time_at_elevation_utc(-4, direction, date,
                                         latitude, longitude)
        
        if direction == SUN_RISING:
            return start, end
        else:
            return end, start
    
    def time_at_elevation_utc(self, elevation, direction, date, latitude, longitude):
        """Calculate the time in the UTC timezone when the sun is at
        the specified elevation on the specified date.
        
        Note: This method uses positive elevations for those above the horizon.

        :param elevation:  Elevation in degrees above the horizon to calculate for.
        :type elevation:   float
        :param direction:  Determines whether the calculated time is for the sun rising or setting.
                           Use ``astral.SUN_RISING`` or ``astral.SUN_SETTING``. Default is rising.
        :type direction:   int
        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The UTC date and time at which the sun is at the required
                 elevation.
        :rtype: :class:`~datetime.datetime`
        """
        
        if elevation > 90.0:
            elevation = 180.0 - elevation
            direction = SUN_SETTING

        depression = 90 - elevation
        try:
            return self._calc_time(depression, direction, date, latitude, longitude)
        except Exception:
            raise AstralError(('Sun never reaches an elevation of %d degrees'
                               'at this location.') % elevation)

    def solar_azimuth(self, dateandtime, latitude, longitude):
        """Calculate the azimuth angle of the sun.

        :param dateandtime: The date and time for which to calculate
                            the angle.
        :type dateandtime:  :class:`~datetime.datetime`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The azimuth angle in degrees clockwise from North.
        :rtype: float

        If `dateandtime` is a naive Python datetime then it is assumed to be
        in the UTC timezone.
        """

        if latitude > 89.8:
            latitude = 89.8

        if latitude < -89.8:
            latitude = -89.8

        if dateandtime.tzinfo is None:
            zone = 0
            utc_datetime = dateandtime
        else:
            zone = -dateandtime.utcoffset().total_seconds() / 3600.0
            utc_datetime = dateandtime.astimezone(pytz.utc)

        timenow = utc_datetime.hour + (utc_datetime.minute / 60.0) + \
            (utc_datetime.second / 3600.0)

        JD = self._julianday(dateandtime)
        t = self._jday_to_jcentury(JD + timenow / 24.0)
        theta = self._sun_declination(t)
        eqtime = self._eq_of_time(t)
        solarDec = theta   # in degrees

        solarTimeFix = eqtime - (4.0 * -longitude) + (60 * zone)
        trueSolarTime = dateandtime.hour * 60.0 + dateandtime.minute + \
            dateandtime.second / 60.0 + solarTimeFix
        #    in minutes

        while trueSolarTime > 1440:
            trueSolarTime = trueSolarTime - 1440

        hourangle = trueSolarTime / 4.0 - 180.0
        #    Thanks to Louis Schwarzmayr for the next line:
        if hourangle < -180:
            hourangle = hourangle + 360.0

        harad = radians(hourangle)

        csz = sin(radians(latitude)) * sin(radians(solarDec)) + \
            cos(radians(latitude)) * cos(radians(solarDec)) * cos(harad)

        if csz > 1.0:
            csz = 1.0
        elif csz < -1.0:
            csz = -1.0

        zenith = degrees(acos(csz))

        azDenom = (cos(radians(latitude)) * sin(radians(zenith)))

        if (abs(azDenom) > 0.001):
            azRad = ((sin(radians(latitude)) * cos(radians(zenith))) -
                     sin(radians(solarDec))) / azDenom

            if abs(azRad) > 1.0:
                if azRad < 0:
                    azRad = -1.0
                else:
                    azRad = 1.0

            azimuth = 180.0 - degrees(acos(azRad))

            if hourangle > 0.0:
                azimuth = -azimuth
        else:
            if latitude > 0.0:
                azimuth = 180.0
            else:
                azimuth = 0.0

        if azimuth < 0.0:
            azimuth = azimuth + 360.0

        return azimuth

    def solar_elevation(self, dateandtime, latitude, longitude):
        """Calculate the elevation angle of the sun.

        :param dateandtime: The date and time for which to calculate
                            the angle.
        :type dateandtime:  :class:`~datetime.datetime`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The elevation angle in degrees above the horizon.
        :rtype: float

        If `dateandtime` is a naive Python datetime then it is assumed to be
        in the UTC timezone.
        """

        if latitude > 89.8:
            latitude = 89.8

        if latitude < -89.8:
            latitude = -89.8

        if dateandtime.tzinfo is None:
            zone = 0
            utc_datetime = dateandtime
        else:
            zone = -dateandtime.utcoffset().total_seconds() / 3600.0
            utc_datetime = dateandtime.astimezone(pytz.utc)

        timenow = utc_datetime.hour + (utc_datetime.minute / 60.0) + \
            (utc_datetime.second / 3600)

        JD = self._julianday(dateandtime)
        t = self._jday_to_jcentury(JD + timenow / 24.0)
        theta = self._sun_declination(t)
        eqtime = self._eq_of_time(t)
        solarDec = theta   # in degrees

        solarTimeFix = eqtime - (4.0 * -longitude) + (60 * zone)
        trueSolarTime = dateandtime.hour * 60.0 + dateandtime.minute + \
            dateandtime.second / 60.0 + solarTimeFix
        #    in minutes

        while trueSolarTime > 1440:
            trueSolarTime = trueSolarTime - 1440

        hourangle = trueSolarTime / 4.0 - 180.0
        #    Thanks to Louis Schwarzmayr for the next line:
        if hourangle < -180:
            hourangle = hourangle + 360.0

        harad = radians(hourangle)

        csz = sin(radians(latitude)) * sin(radians(solarDec)) + \
            cos(radians(latitude)) * cos(radians(solarDec)) * cos(harad)

        if csz > 1.0:
            csz = 1.0
        elif csz < -1.0:
            csz = -1.0

        zenith = degrees(acos(csz))

        azDenom = (cos(radians(latitude)) * sin(radians(zenith)))

        if (abs(azDenom) > 0.001):
            azRad = ((sin(radians(latitude)) * cos(radians(zenith))) -
                     sin(radians(solarDec))) / azDenom

            if abs(azRad) > 1.0:
                if azRad < 0:
                    azRad = -1.0
                else:
                    azRad = 1.0

            azimuth = 180.0 - degrees(acos(azRad))

            if hourangle > 0.0:
                azimuth = -azimuth
        else:
            if latitude > 0.0:
                azimuth = 180.0
            else:
                azimuth = 0.0

        if azimuth < 0.0:
            azimuth = azimuth + 360.0

        exoatmElevation = 90.0 - zenith

        if exoatmElevation > 85.0:
            refractionCorrection = 0.0
        else:
            te = tan(radians(exoatmElevation))
            if exoatmElevation > 5.0:
                refractionCorrection = 58.1 / te - 0.07 / (te * te * te) + \
                    0.000086 / (te * te * te * te * te)
            elif exoatmElevation > -0.575:
                step1 = (-12.79 + exoatmElevation * 0.711)
                step2 = (103.4 + exoatmElevation * (step1))
                step3 = (-518.2 + exoatmElevation * (step2))
                refractionCorrection = 1735.0 + exoatmElevation * (step3)
            else:
                refractionCorrection = -20.774 / te

            refractionCorrection = refractionCorrection / 3600.0

        solarzen = zenith - refractionCorrection

        solarelevation = 90.0 - solarzen

        return solarelevation

    def solar_zenith(self, dateandtime, latitude, longitude):
        """Calculates the solar zenith angle.

        :param dateandtime: The date and time for which to calculate
                            the angle.
        :type dateandtime: :class:`~datetime.datetime`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: The zenith angle in degrees above the horizon.
        :rtype: float

        If `dateandtime` is a naive Python datetime then it is assumed to be
        in the UTC timezone.
        """

        return self.solar_elevation(dateandtime, latitude, longitude)

    def moon_phase(self, date):
        """Calculates the phase of the moon on the specified date.

        :param date: The date to calculate the phase for.
        :type date: :class:`datetime.date`

        :return:
            A number designating the phase

                | 0  = New moon
                | 7  = First quarter
                | 14 = Full moon
                | 21 = Last quarter
        :rtype: int
        """
        
        jd = self._julianday(date)
        DT = pow((jd - 2382148), 2) / (41048480 * 86400)
        T = (jd + DT - 2451545.0) / 36525
        T2 = pow(T, 2)
        T3 = pow(T, 3)
        D = 297.85 + (445267.1115 * T) - (0.0016300 * T2) + (T3 / 545868)
        D = radians(self._proper_angle(D))
        M = 357.53 + (35999.0503 * T)
        M = radians(self._proper_angle(M))
        M1 = 134.96 + (477198.8676 * T) + (0.0089970 * T2) + (T3 / 69699)
        M1 = radians(self._proper_angle(M1))
        elong = degrees(D) + 6.29 * sin(M1)
        elong -= 2.10 * sin(M)
        elong += 1.27 * sin(2 * D - M1)
        elong += 0.66 * sin(2 * D)
        elong = self._proper_angle(elong)
        elong = round(elong)
        moon = ((elong + 6.43) / 360) * 28
        moon = floor(moon)
        if moon == 28:
            moon = 0

        return moon

    def rahukaalam_utc(self, date, latitude, longitude):
        """Calculate ruhakaalam times in the UTC timezone.

        :param date:       Date to calculate for.
        :type date:        :class:`datetime.date`
        :param latitude:   Latitude - Northern latitudes should be positive
        :type latitude:    float
        :param longitude:  Longitude - Eastern longitudes should be positive
        :type longitude:   float

        :return: Tuple containing the start and end times for Rahukaalam.
        :rtype: tuple
        """

        if date is None:
            date = datetime.date.today()

        try:
            sunrise = self.sunrise_utc(date, latitude, longitude)
            sunset = self.sunset_utc(date, latitude, longitude)
        except:
            raise AstralError(('Sun remains below the horizon on this day, '
                               'at this location.'))

        octant_duration = (sunset - sunrise) / 8

        # Mo,Sa,Fr,We,Th,Tu,Su
        octant_index = [1, 6, 4, 5, 3, 2, 7]

        weekday = date.weekday()
        octant = octant_index[weekday]

        start = sunrise + (octant_duration * octant)
        end = start + octant_duration

        return start, end

    def _proper_angle(self, value):
        if value > 0.0:
            value /= 360.0
            return (value - floor(value)) * 360.0
        else:
            tmp = ceil(abs(value / 360.0))
            return value + tmp * 360.0

    def _julianday(self, date, timezone=None):
        day = date.day
        month = date.month
        year = date.year

        if timezone:
            offset = timezone.localize(datetime.datetime(year, month, day)).utcoffset()
            offset = offset.total_seconds() / 1440.0
            day += offset + 0.5

        if month <= 2:
            year = year - 1
            month = month + 12

        A = floor(year / 100.0)
        B = 2 - A + floor(A / 4.0)

        jd = floor(365.25 * (year + 4716)) + floor(30.6001 * (month + 1)) + \
            day - 1524.5
        if jd > 2299160.4999999:
            jd += B

        return jd

    def _jday_to_jcentury(self, julianday):
        return (julianday - 2451545.0) / 36525.0

    def _jcentury_to_jday(self, juliancentury):
        return (juliancentury * 36525.0) + 2451545.0

    def _mean_obliquity_of_ecliptic(self, juliancentury):
        seconds = 21.448 - juliancentury * \
            (46.815 + juliancentury * (0.00059 - juliancentury * (0.001813)))
        return 23.0 + (26.0 + (seconds / 60.0)) / 60.0

    def _obliquity_correction(self, juliancentury):
        e0 = self._mean_obliquity_of_ecliptic(juliancentury)

        omega = 125.04 - 1934.136 * juliancentury
        return e0 + 0.00256 * cos(radians(omega))

    def _geom_mean_long_sun(self, juliancentury):
        l0 = 280.46646 + \
            juliancentury * (36000.76983 + 0.0003032 * juliancentury)
        return l0 % 360.0

    def _eccentrilocation_earth_orbit(self, juliancentury):
        return 0.016708634 - \
            juliancentury * (0.000042037 + 0.0000001267 * juliancentury)

    def _geom_mean_anomaly_sun(self, juliancentury):
        return 357.52911 + \
            juliancentury * (35999.05029 - 0.0001537 * juliancentury)

    def _eq_of_time(self, juliancentury):
        epsilon = self._obliquity_correction(juliancentury)
        l0 = self._geom_mean_long_sun(juliancentury)
        e = self._eccentrilocation_earth_orbit(juliancentury)
        m = self._geom_mean_anomaly_sun(juliancentury)

        y = tan(radians(epsilon) / 2.0)
        y = y * y

        sin2l0 = sin(2.0 * radians(l0))
        sinm = sin(radians(m))
        cos2l0 = cos(2.0 * radians(l0))
        sin4l0 = sin(4.0 * radians(l0))
        sin2m = sin(2.0 * radians(m))

        Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - \
            0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m

        return degrees(Etime) * 4.0

    def _sun_eq_of_center(self, juliancentury):
        m = self._geom_mean_anomaly_sun(juliancentury)

        mrad = radians(m)
        sinm = sin(mrad)
        sin2m = sin(mrad + mrad)
        sin3m = sin(mrad + mrad + mrad)

        c = sinm * (1.914602 - juliancentury * \
            (0.004817 + 0.000014 * juliancentury)) + \
            sin2m * (0.019993 - 0.000101 * juliancentury) + sin3m * 0.000289

        return c

    def _sun_true_long(self, juliancentury):
        l0 = self._geom_mean_long_sun(juliancentury)
        c = self._sun_eq_of_center(juliancentury)

        return l0 + c

    def _sun_apparent_long(self, juliancentury):
        O = self._sun_true_long(juliancentury)

        omega = 125.04 - 1934.136 * juliancentury
        return O - 0.00569 - 0.00478 * sin(radians(omega))

    def _sun_declination(self, juliancentury):
        e = self._obliquity_correction(juliancentury)
        lambd = self._sun_apparent_long(juliancentury)

        sint = sin(radians(e)) * sin(radians(lambd))
        return degrees(asin(sint))

    def _sun_rad_vector(self, juliancentury):
        v = self._sun_true_anomoly(juliancentury)
        e = self._eccentrilocation_earth_orbit(juliancentury)

        return (1.000001018 * (1 - e * e)) / (1 + e * cos(radians(v)))

    def _sun_rt_ascension(self, juliancentury):
        e = self._obliquity_correction(juliancentury)
        lambd = self._sun_apparent_long(juliancentury)

        tananum = (cos(radians(e)) * sin(radians(lambd)))
        tanadenom = (cos(radians(lambd)))

        return degrees(atan2(tananum, tanadenom))

    def _sun_true_anomoly(self, juliancentury):
        m = self._geom_mean_anomaly_sun(juliancentury)
        c = self._sun_eq_of_center(juliancentury)

        return m + c

    def _hour_angle(self, latitude, declination, depression):
        latitude_rad = radians(latitude)
        declination_rad = radians(declination)
        depression_rad = radians(depression)

        n = cos(depression_rad)
        d = cos(latitude_rad) * cos(declination_rad)
        
        t = tan(latitude_rad) * tan(declination_rad)
        h = (n / d) - t
        
        HA = acos(h)
        return HA

    def _calc_time(self, depression, direction, date, latitude, longitude):
        julianday = self._julianday(date)

        if latitude > 89.8:
            latitude = 89.8

        if latitude < -89.8:
            latitude = -89.8

        t = self._jday_to_jcentury(julianday)
        eqtime = self._eq_of_time(t)
        solarDec = self._sun_declination(t)

        hourangle = -self._hour_angle(latitude, solarDec, 90 + 0.833)

        delta = -longitude - degrees(hourangle)
        timeDiff = 4.0 * delta
        timeUTC = 720.0 + timeDiff - eqtime

        newt = self._jday_to_jcentury(self._jcentury_to_jday(t) +
                                      timeUTC / 1440.0)
        eqtime = self._eq_of_time(newt)
        solarDec = self._sun_declination(newt)

        hourangle = self._hour_angle(latitude, solarDec, depression)
        if direction == SUN_SETTING:
            hourangle = -hourangle

        delta = -longitude - degrees(hourangle)
        timeDiff = 4 * delta
        timeUTC = 720 + timeDiff - eqtime

        timeUTC = timeUTC / 60.0
        hour = int(timeUTC)
        minute = int((timeUTC - hour) * 60)
        second = int((((timeUTC - hour) * 60) - minute) * 60)

        if second > 59:
            second -= 60
            minute += 1
        elif second < 0:
            second += 60
            minute -= 1

        if minute > 59:
            minute -= 60
            hour += 1
        elif minute < 0:
            minute += 60
            hour -= 1

        if hour > 23:
            hour -= 24
            date += datetime.timedelta(days=1)
        elif hour < 0:
            hour += 24
            date -= datetime.timedelta(days=1)

        dt = datetime.datetime(date.year, date.month, date.day,
                               hour, minute, second)
        dt = pytz.UTC.localize(dt)

        return dt
