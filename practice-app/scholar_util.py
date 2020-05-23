from scholarly import scholarly


def search_authors_by_name(name):
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


def search_author_by_tag(name, tag):
    search_query = scholarly.search_author(name)
    for i in range(0, tag):
        result = next(search_query)
    author = next(search_query)
    json = {
        "id": author.id,
        "name": author.name,
        "email": author.email,
        "affiliation": author.affiliation,
        "citedby": author.citedby,
        "url_picture": author.url_picture,
        "interests": author.interests
    }
    return json

def getNameOutOfAuthorJson(authorJson):
    #This is an example, pls edit this for appropriate header in the json
    #Other info can be added as json as well,    
    return authorJson[0][0]


def getAuthorsColloborators(authorJson):
    #ToDO: get authors colloborators
    return None

def getAuthorsCitationIndexes(authorJson):
    #TODO:
    return None

def getAuthorPhoto(authorJson):
    #TODO:
    return None

def getAuthorsRecentPublications(authorJson):
    #TODO:
    return None
