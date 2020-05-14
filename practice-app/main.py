import sqlite3

from flask import Flask, render_template, request
import json

app = Flask(__name__)

#Template for flask backend

@app.route('/')
def form_post():
    return render_template('about.html')

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


@app.route('/user')
def user():
    return render_template("user.html")


@app.route('/admin')
def admin():
    return render_template("admin.html")


@app.route('/topic')
def topic():
    return render_template("topic.html")


@app.route('/author')
def author():
    return render_template("author.html")


@app.route('/paper')
def paper():
    return render_template("paper.html")


@app.route('/viewTopic')
def viewTopic():
    
    return returning + '<a href=" / "> Return to home page </a>'


@app.route('/viewAuthor')
def viewAuthor():
    
    return returning + '<a href=" / "> Return to home page </a>'


@app.route('/viewPaper')
def viewPaper():
    
    return returning + '<a href=" / "> Return to home page </a>'


if __name__ == '__main__':
    app.run()
