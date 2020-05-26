
from flask import Flask, render_template, jsonify, request
from flask_restful import Api, reqparse

import requests
import json
import scholar_util
import coronavirus_api

app = Flask(__name__)
api = Api(app)
#Template for flask backend

@app.route('/')
def form_post():
    return render_template('home.html')


@app.route('/search', methods=['POST', 'GET'])
def search():

    if request.method == 'POST':

        json = scholar_util.getAuthors(request.form["search_param"])
        context = {
            "results": json["author_search_result"],
            "param":   request.form["search_param"],
        }

    else:
        context = {}

    return render_template('search.html', context=context)


@app.route('/api/search', methods=['POST'])
def api_search():

    req_data = request.get_json()
    name = req_data['name']
    json  = scholar_util.getAuthors(name)
    return jsonify(json)


@app.route('/api/authorpublications', methods=['GET'])
def api_authorpublications():
    name = request.args.get("name")
    _range = request.args.get("range")
    json = scholar_util.getAuthorsPublications(name, _range)
    return jsonify(json)  


@app.route('/api/publicationsearch', methods=['GET'])
def api_publicationsearch():

    name = request.args.get("name")
    json = scholar_util.searchPublication(name)
    return jsonify(json)


@app.route('/api/authorstats', methods=['GET'])
def api_authorstats():

    name = request.args.get("name")
    json = scholar_util.getAuthorCitationStats(name)
    return jsonify(json)  


@app.route('/profile/<name>', methods=['GET'])
def profile(name):
    url = request.url_root+'api/profiledata?name=' + name
    results = requests.get(url)
    results = json.loads(results.text)

    context = results

    return render_template("profile.html", context=context)


@app.route('/api/profiledata', methods=['GET'])
def api_profile_data():

    name = request.args.get("name")
    json = scholar_util.getUserProfileData(name)
    return jsonify(json)
 

@app.route('/coronavirus', methods=['GET'])
def coronavirus():
   
    countryData = coronavirus_api.coronavirus_summary_search()
    if countryData == False:
        return "Server is overloaded, please wait for a couple of seconds and try again!"
    else:
        return render_template('coronavirus.html', context=countryData)


@app.route('/api/coronavirus', methods=['GET'])
def api_coronavirus():
    
    countryData = coronavirus_api.coronavirus_summary_search()
    return jsonify(countryData)

@app.route('/coronavirusCountryLive', methods=['POST', 'GET'])
def coronavirusCountryLive():
   
   if request.method == 'POST':
        results = coronavirus_api.coronavirusCountryLive(request.form["search_param"])
        print(results)
        context = {
            "results": results,
            "param":   request.form["search_param"],
        } 
        #print(context)
   else:
        context = {}

   return render_template('searchCountryName.html', context=context)


@app.route('/api/coronavirusCountryLive',  methods=['POST', 'GET'])
def api_coronavirusCountryLive():
    
        context = {}
        req_data = request.get_json()
        country = req_data['country']
        results=coronavirus_api.coronavirusCountryLive(country)
        context = {
            "results": results,
            "param":   country,
        } 
        

        return context


@app.route('/api/worldStats', methods=['GET'] )
def api_world_stats():
    world_data = coronavirus_api.getWorldStatistics()
    return world_data

@app.route('/worldStats', methods=['GET'])
def world_stats():
    world_data = coronavirus_api.getWorldStatistics()
    return render_template('worldstats.html', context = world_data)

@app.route('/coronavirusByCountry', methods=['POST', 'GET'])
def coronavirusByCountry():
    if request.method == 'POST':
        country_data = coronavirus_api.CoronavirusByCountry(request.form["search_param"])
        context = {
            "results": country_data["country_results"],
            "param": request.form["search_param"]
        }
    else:
        context = {}

    return render_template('coronavirusByCountry.html', context=context)

#
# MIGHT BE WRONG. WILL BE FIXED IF SO.
#
@app.route('/api/coronavirusByCountry', methods=['POST'])
def api_coronavirusByCountry():
    if request.method == 'POST':
        req_data = request.get_json()
        country = req_data['country']
        country_data = coronavirus_api.CoronavirusByCountry(country)
        context = {
            "results": country_data["country_results"],
            "param": country
        }
    elif request.method == 'GET':
        parser = reqparse.RequestParser()
        parser.add_argument('country', required=True)
        args = parser.parse_args()
        country = args['country']
        country_data = coronavirus_api.CoronavirusByCountry(country)
        context = {
            "results": country_data["country_results"],
            "param": country
        }
    else:
        context = {}

    return context


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':

    app.run()
