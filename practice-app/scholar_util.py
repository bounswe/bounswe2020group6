from flask import Flask
from flask_restful import Resource, reqparse
from scholarly import scholarly


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

class AuthorPublic(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required = True)
        parser.add_argument('range', required = False)

        name = parser.parse_args().get('name')
        _range = parser.parse_args().get('range')

        search_query = scholarly.search_author(name)
        author = next(search_query).fill()
        l = len(author.publications)
        author_pubs = author.publications

        pubs = []

        if _range < l:
            for i in range(0,_range):
                pub = {
                    "title": author_pubs[l-i-1].bib.get("title", "Title is unknown"),
                    "author": author_pubs[l-i-1].bib.get("author", "unknown"),
                    "summary": author_pubs[l-i-1].bib.get("abstract", "Summary is not provided."),
                    "year": author_pubs[l-i-1].bib.get("year", "unknown"),
                    "url": author_pubs[l-i-1].bib.get("url", "URL is not provided.")
                }
                
                pubs.append(pub)
        else:
            for pub in author_pubs:
                pub = {
                    "title": pub.bib.get("title", "Title is unknown"),
                    "author": pub.bib.get("author", "unknown"),
                    "summary": pub.bib.get("abstract", "Summary is not provided."),
                    "year": pub.bib.get("year", "unknown"),
                    "url": pub.bib.get("url", "URL is not provided.")
                }
                
                pubs.append(pub)
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
