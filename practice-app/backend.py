
from flask import Flask, render_template, jsonify, request
from flask_restful import Api

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


@app.route('/profile/<name>', methods=['GET'])
def profile(name):

    url = request.url_root+'/userdata?name=' + name
    results = requests.get(url)
    results = json.loads(results.text)

    context = results

    return render_template("profile.html", context=context)

@app.route('/api/search', methods=['POST'])
def api_search():

    req_data = request.get_json()
    name = req_data['name']
    json  = scholar_util.getAuthors(name)
    return jsonify(json)


@app.route('/api/authorpublications', methods=['GET'])
def api_authorpublications():

    req_data = request.get_json()
    name = req_data['name']
    json = scholar_util.getAuthorsPublications(name)
    return jsonify(json)


@app.route('/api/publicationsearch', methods=['GET'])
def api_publicationsearch():

    req_data = request.get_json()
    name = req_data['pub_name']
    countryData = scholar_util.searchPublication(name)
    return jsonify(json)


@app.route('/api/authorstats', methods=['GET'])
def api_authorstats():

    req_data = request.get_json()
    name = req_data['pub_name']
    countryData = scholar_util.getAuthorCitationStats(name)
    return jsonify(json)

@app.route('/coronavirus', methods=['GET'])
def coronavirus():
   countryData = coronavirus_api.coronavirus_summary_search()
   return render_template('coronavirus.html', context=countryData)


@app.route('/api/coronavirus', methods=['GET'])
def api_coronavirus():
    countryData = coronavirus_api.coronavirus_summary_search()
    return jsonify(countryData)

@app.route('/api/worldStats', methods=['GET'])
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
@app.route('/api/coronavirusByCountry', methods=['POST','GET'])
def api_coronavirusByCountry():
    if request.method == 'POST':
        country_data = coronavirus_api.CoronavirusByCountry(request.form["search_param"])
        context = {
            "results": country_data["country_results"],
            "param": request.form["search_param"]
        }
    else:
        context = {}

    return context


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    api.add_resource(scholar_util.UserProfile,'/userdata')
    app.run(debug=True)
