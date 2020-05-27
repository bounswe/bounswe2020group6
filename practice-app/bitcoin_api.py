from flask import Flask
import requests
import json

def getBitcoinPrice():

        url = "https://api.coindesk.com/v1/bpi/currentprice.json"

        response = requests.request("GET", url)

        result = response.json()

        json = {
            "rates":        result["bpi"],
            "disclaimer":   result["disclaimer"],
            "time_updated": result["time"]["updated"],
        }

        return json
