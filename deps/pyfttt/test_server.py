#!/usr/bin/env python

import json
import requests

payload = {'value1': 'hello', 'value2': 'i am value2', 'value3': 90210}

#r = requests.post('http://localhost:7777/api/1.0/6adfb183a4a2c94a2f92dab5ade762a47889a5a1/test', data=payload)
r = requests.post('http://localhost:7777/api/1.0/6adfb183a4a2c94a2f92dab5ade762a47889a5a1/test/opt1', json=json.dumps(payload))

print(r)
