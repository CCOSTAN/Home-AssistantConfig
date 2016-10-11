from forecastio.utils import UnicodeMixin, PropertyUnavailable
import datetime
import requests


class Forecast(UnicodeMixin):

    def __init__(self, data, response, headers):
        self.response = response
        self.http_headers = headers
        self.json = data

        self._alerts = []
        for alertJSON in self.json.get('alerts', []):
            self._alerts.append(Alert(alertJSON))

    def update(self):
        r = requests.get(self.response.url)
        self.json = r.json()
        self.response = r

    def currently(self):
        return self._forcastio_data('currently')

    def minutely(self):
        return self._forcastio_data('minutely')

    def hourly(self):
        return self._forcastio_data('hourly')

    def daily(self):
        return self._forcastio_data('daily')

    def offset(self):
        return self.json['offset']

    def alerts(self):
        return self._alerts

    def _forcastio_data(self, key):
        keys = ['minutely', 'currently', 'hourly', 'daily']
        try:
            if key not in self.json:
                keys.remove(key)
                url = "%s&exclude=%s%s" % (self.response.url.split('&')[0],
                      ','.join(keys), ',alerts,flags')

                response = requests.get(url).json()
                self.json[key] = response[key]

            if key == 'currently':
                return ForecastioDataPoint(self.json[key])
            else:
                return ForecastioDataBlock(self.json[key])
        except:
            if key == 'currently':
                return ForecastioDataPoint()
            else:
                return ForecastioDataBlock()


class ForecastioDataBlock(UnicodeMixin):

    def __init__(self, d=None):
        d = d or {}
        self.summary = d.get('summary')
        self.icon = d.get('icon')

        self.data = [ForecastioDataPoint(datapoint)
                     for datapoint in d.get('data', [])]

    def __unicode__(self):
        return '<ForecastioDataBlock instance: ' \
               '%s with %d ForecastioDataPoints>' % (self.summary,
                                                     len(self.data),)


class ForecastioDataPoint(UnicodeMixin):

    def __init__(self, d={}):
        self.d = d

        try:
            self.time = datetime.datetime.utcfromtimestamp(int(d['time']))
            self.utime = d['time']
        except:
            pass

        try:
            sr_time = int(d['sunriseTime'])
            self.sunriseTime = datetime.datetime.utcfromtimestamp(sr_time)
        except:
            self.sunriseTime = None

        try:
            ss_time = int(d['sunsetTime'])
            self.sunsetTime = datetime.datetime.utcfromtimestamp(ss_time)
        except:
            self.sunsetTime = None

    def __getattr__(self, name):
        try:
            return self.d[name]
        except KeyError:
            raise PropertyUnavailable(
                "Property '{}' is not valid"
                " or is not available for this forecast".format(name)
            )

    def __unicode__(self):
        return '<ForecastioDataPoint instance: ' \
               '%s at %s>' % (self.summary, self.time,)


class Alert(UnicodeMixin):
    def __init__(self, json):
        self.json = json

    def __getattr__(self, name):
        try:
            return self.json[name]
        except KeyError:
            raise PropertyUnavailable(
                "Property '{}' is not valid"
                " or is not available for this forecast".format(name)
            )

    def __unicode__(self):
        return '<Alert instance: {0} at {1}>'.format(self.title, self.time)
