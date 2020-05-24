from flask import Flask
from flask_restful import Resource, reqparse
import requests
import json

#Template 
class Template(Resource):
    def get(self):
        #Code goes here.
        return json_return

class CoronavirusByCountry(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('country', required=True)

        country = parser.parse_args()['country']

        req_url = 'https://api.covid19api.com/country/' + country
        r = requests.get(req_url)
        print(req_url)
        print(r.status_code)

        j = json.loads(r.text)

        #TODO: Check if request resulted in a success.

        country_data = []

        for index, day_info in enumerate(j):
            country_data.append({
                'day': index,
                'Confirmed': day_info['Confirmed'],
                'Deaths': day_info['Deaths'],
                'Recovered': day_info['Recovered'],
                'Active': day_info['Active']
            })

        json_return = {
            "country_results": country_data
        }

        return json_return
