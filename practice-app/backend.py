from flask import Flask, render_template, request, jsonify
import scholar_util

app = Flask(__name__)


# search for authors with the given name. returns top 5 result
# in [author_name, author_affiliation] format.
# the argument author_name must be given in request body in json format.
@app.route('/search', methods=['POST'])
def search_author():
    author_name = str(request.json["author_name"])
    return scholar_util.search_authors_by_name(author_name)


# search for specific author by tag. author_name must be given in
# request body in json format. tag should be appended to the url.
@app.route('/search/<int:tag>', methods=['POST'])
def search_author_by_tag(tag):
    author_name = str(request.json["author_name"])
    return scholar_util.search_author_by_tag(author_name, tag)


@app.route('/')
def form_post():
    return render_template('about.html')



# Template for POST request
@app.route('/endUser', methods=['POST'])
def endUser():
    if request.method == 'POST':
        if request.form["type"] == "AUTHOR":

            string = ""
            string = "<h1>NAMES </h1><br>" + string
            return string + "<br> " + '<br><br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "PAPER":

            string = "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return string + "<br> " + '<br> <a href=" / "> Return to home page </a>'


        elif request.form["type"] == "TOPIC":
            string = "<h1> TOPIC NAME ------- SOTA </h1>"
            return string + '<br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "getAuthorPapers":
            string = 'ALL PAPERS OF ' + request.form["authorName"] + "<br>"
            string += "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return string + "<br> " + '<br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "sotaResultByTopic":
            string = "SOTA RESULT BY TOPIC <br>" + "<h1>TOPIC ----- SOTA  ------------------- IN WHICH PAPER </h1><br>"
            return string + '<br> <a href=" / "> Return to home page </a>'


        elif request.form["type"] == "getPapersByTopic":
            string = "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return string + "<br> " + '<br> <a href=" / "> Return to home page </a>'

        elif request.form["type"] == "searchKeyword":
            # Database Fetch
            string = "<h1> AUTHORS ------ TITLE ------ ABSTRACT ------ TOPICS ------ RESULT</h1><br>"
            return string + "<br> " + '<br> <a href=" / "> Return to home page </a>'

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
    return '<a href=" / "> Return to home page </a>'


@app.route('/viewAuthor')
def viewAuthor():
    return '<a href=" / "> Return to home page </a>'


@app.route('/viewPaper')
def viewPaper():
    return '<a href=" / "> Return to home page </a>'


if __name__ == '__main__':
    app.run()
