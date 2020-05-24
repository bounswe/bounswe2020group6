from flask import Flask
from flask_restful import Resource, reqparse
from scholarly import scholarly

#gets authors features
def getAuthors(name):

    search_query = scholarly.search_author(name)
    authors_summary = []
    for i in range(0, 5):
        result = next(search_query, None)
        if result is None:
            break
        authors_summary.append({
              "name": result.name,
              "affiliation": result.affiliation,
              "url_picture": result.url_picture,
        })
    json = {
         "author_search_result": authors_summary
    }
    return json


#gets recent publications of an author
def getAuthorsPublications(name):
    
    search_query = scholarly.search_author(name)
    author = next(search_query).fill()
    author_pubs = author.publications
        
    #determine range
    _range = 5
    _range = min(int(_range), len(author_pubs))
   
    #create publications array
    pubs = [] 
    for i in range(0,_range):
        bib = author_pubs[len(author_pubs)-i-1].fill().bib
        
        pub = {
            "title": bib.get("title", "unknown"),
            "author": bib.get("author", "unknown"),
            "summary": bib.get("abstract", "unknown"),
            "year": bib.get("year", "unknown"),
            "url": bib.get("url", "unknown")
        }
        pubs.append(pub)

    #return json object  
    json = {"publications": pubs}
    return json

# def getNameOutOfAuthorJson(authorJson):
#     #This is an example, pls edit this for appropriate header in the json
#     #Other info can be added as json as well,    
#     return authorJson[0][0]


# def getAuthorsColloborators():
#     #ToDO: get authors colloborators

#     return None

class AuthorCitationStats(Resource):
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', required = True)

        name = parser.parse_args()['name']

        search_query = scholarly.search_author(name)
        author = next(search_query).fill()
        cites_per_year = author.cites_per_year
        return {"cites_per_year":cites_per_year}

class SearchPublication(Resource):
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('pub_name', required = True)

        pub_name = parser.parse_args()['pub_name']
        
        search_query = scholarly.search_pubs(pub_name)
        pub = next(search_query)
        if not pub:
            return {}
        json = {
            'abstract': pub.bib['abstract'],
            'author': [author.strip(" ") for author in pub.bib['author']],
            'eprint_url': pub.bib['eprint'],
            'title': pub.bib['title'],
            'url': pub.bib['url']
        }
        return json
