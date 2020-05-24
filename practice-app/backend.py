
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

        url = request.url_root+'/authornamesearch?name=' + request.form["search_param"]
        results = requests.get(url)
        results = json.loads(results.text)

        context = {
            "results": results["author_search_result"],
            "param":   request.form["search_param"],
        } 

    else:
        context = {}

    return render_template('search.html', context=context)


@app.route('/api/search', methods=['POST'])
def api_search():
    json  = scholar_util("search_param")
    return jsonify(json)

@app.route('/searchCountryLive', methods=['POST', 'GET'])
def searchCountryLive():

    if request.method == 'POST':

        url = request.url_root+'/countryLive?country=' + request.form["search_param"] +"&typeName=confirmed"
        
        results = requests.get(url)
        results = json.loads(results.text)
        print(results)
        context = {
            "results": results,
            "param":   request.form["search_param"],
        } 
        #print(context)
    else:
        context = {}

    return render_template('searchCountryName.html', context=context)


@app.route('/profile',methods=['POST'])
def profile():
    if request.method=='POST':
        authorJson=scholar_util.search_authors_by_name(request.form["name"])
        print(authorSearchResult)

        #TODO:Get these info and add them to profile.html page
        scholar_util.getNameOutOfAuthorJson(authorJson)
        scholar_util.getAuthorsColloborators(authorJson)
        scholar_util.getAuthorsCitationIndexes(authorJson)
        scholar_util.getAuthorPhoto(authorJson)
        scholar_util.getAuthorsRecentPublications(authorJson)

        return render_template('profile.html')
    
    
    else:
        return "Error 404"
        print("get")


        context = {}

    return render_template('search.html', context=context)


@app.route('/coronavirus', methods=['GET'])
def coronavirus():
   
   countryData = coronavirus_api.coronavirus_summary_search()    
   return render_template('coronavirus.html', context=countryData)


@app.route('/api/coronavirus', methods=['GET'])
def api_coronavirus():
    
    countryData = coronavirus_api.coronavirus_summary_search()
    return jsonify(countryData)
  
  
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

#Template for POST request
@app.route('/endUser', methods=['POST'])
def endUser():

    if request.method == 'POST':
        if request.form["type"] == "AUTHOR":

            string = ""
            string = "<h1>NAMES </h1><br>" + string
            return string + "<br> " + '<br><br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "PAPER":

            string = "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return (string + "<br> " + '<br> <a href=" / "> Return to home page </a>')


        elif request.form["type"] == "TOPIC":
            string = "<h1> TOPIC NAME ------- SOTA </h1>"
            return string + '<br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "getAuthorPapers":
            string = 'ALL PAPERS OF ' + request.form["authorName"] + "<br>"
            string += "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return (string + "<br> " + '<br> <a href=" / "> Return to home page </a>')

        elif request.form["type"] == "sotaResultByTopic":
            string = "SOTA RESULT BY TOPIC <br>" + "<h1>TOPIC ----- SOTA  ------------------- IN WHICH PAPER </h1><br>"
            return string + '<br> <a href=" / "> Return to home page </a>'



        elif request.form["type"] == "getPapersByTopic":
            string += "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return (string + "<br> " + '<br> <a href=" / "> Return to home page </a>')

        elif request.form["type"] == "searchKeyword":
            #Database Fetch
            string += "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return (string + "<br> " + '<br> <a href=" / "> Return to home page </a>')

        elif request.form["type"] == "searchCo-authors":
            string = '<h1>CoAuthors Of Author "' + request.form[
                "authorName"] + '"</h1><br>'
            return string + '<br> <a href=" / "> Return to home page </a>'

    return "error"


if __name__ == '__main__':
    api.add_resource(scholar_util.SearchAuthorName,'/authornamesearch')
    api.add_resource(scholar_util.AuthorPublic,'/authorpublications')
    api.add_resource(scholar_util.SearchPublication,'/publicationsearch')
    api.add_resource(scholar_util.AuthorCitationStats,'/authorstats')
    api.add_resource(coronavirus_api.countryLive, '/countryLive')
    api.add_resource(coronavirus_api.CoronavirusByCountry, '/coronavirusbycountry')
    app.run(debug=True)

