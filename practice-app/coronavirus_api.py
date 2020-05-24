from flask import Flask
from flask_restful import Resource, reqparse
import requests


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
