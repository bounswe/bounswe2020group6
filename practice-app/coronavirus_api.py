from flask import Flask
from flask_restful import Resource, reqparse
import requests
import json

def coronavirus_summary_search():
    r = requests.get('https://api.covid19api.com/summary')
    j = json.loads(r.text)
    
    countryList = j["Countries"]
    CountryCount = 186	

    for i in range(CountryCount):	
        x = countryList[i]
        countryCode = x["CountryCode"] 
        url = "https://www.countryflags.io/" + countryCode + "/shiny/64.png"        
        x["CountryCode"] = url
        
    return countryList

#Template 
class countryLive(Resource):
#http://127.0.0.1:5000/countryLive?country=Turkey&typeName=confirmed

    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('country')
        parser.add_argument('typeName')
        args = parser.parse_args()
        
        url = "https://api.covid19api.com/country/{}/status/{}/live".format(args["country"], args["typeName"])

        payload = {}
        headers= {}

        response = requests.request("GET", url, headers=headers, data = payload)

        result = response.json()
        
        return result[len(result)-5:len(result)]


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
                'day': index+1,
                'confirmed': day_info['Confirmed'],
                'deaths': day_info['Deaths'],
                'recovered': day_info['Recovered'],
                'active': day_info['Active']
            })

        json_return = {
            "country_results": country_data
        }

        return json_return
