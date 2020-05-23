
from flask import Flask, render_template, request
import requests
import json
import scholar_util


app = Flask(__name__)
#Template for flask backend

@app.route('/')
def form_post():
    return render_template('home.html')

@app.route('/joke')
def joke():

    r = requests.get('https://official-joke-api.appspot.com/random_joke')

    j = json.loads(r.text)


    setup     = j["setup"]
    punchline = j["punchline"]
    return render_template('joke.html', joke=setup, punchline=punchline)



@app.route('/search', methods=['POST', 'GET'])
def search():

    if request.method == 'POST':

        results = scholar_util.search_authors_by_name(request.form["search_param"])

        context = {
            "results": results["author_search_result"],
            "param":   request.form["search_param"],
        }

    else:
        print("get")

        context = {}

    return render_template('search.html', context=context)


@app.route('/coronavirus', methods=['GET'])
def coronavirus():
   
    r = requests.get('https://api.covid19api.com/summary')

    j = json.loads(r.text)


    Countries     = [j["Countries"]
    return jsonify(Countries)

                     
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
    app.run()
