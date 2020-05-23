from flask import Flask
from flask_restful import Resource, Api, reqparse
from scholarly import scholarly

app = Flask(__name__)
api = Api(app)
#has an optional affiliation parameter. If name is matched but affiliation is not, returns it in alternative result

class SearchAuthorName(Resource):
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', required = True)

        name = parser.parse_args()['name']


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

#DOESN'T WORK... MAYBE OTHER WILL FIGURE OUT SOME WORKAROUND.
class AuthorPublic(Resource):
#returns authors publications with their citations
    def get(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', required = True)
        parser.add_argument('range', required = False)

        name = parser.parse_args()['name']
        #range = parser.parse_args().get('range')

        search_query = scholarly.search_author(name)
        author = next(search_query).fill()
        # if range:
        #     pubs = {pub.bib['title'] : pub.citedby for pub in author.publications[:range]}
        #else
        pubs = {pub.bib['title'] : pub.citedby for pub in author.publications}
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

api.add_resource(SearchAuthorName,'/authornamesearch')
api.add_resource(AuthorPublic,'/authorpublications')
api.add_resource(SearchPublication,'/publicationsearch')
api.add_resource(AuthorCitationStats,'/authorstats')
