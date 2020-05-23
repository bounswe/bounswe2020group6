import scholarly

#has an optional affiliation parameter. If name is matched but affiliation is not, returns it in alternative result
def search_author(name = "", affiliation = ""):
    check_aff = True if affiliation else False
    results =[]
    alternative_results = []
    search_query = scholarly.search_author(name)
    for author in search_query:
        if check_aff:
            if affiliation.lower() in author.affiliation.lower():
                results.append((author.name,author.affiliation))
            else:
                alternative_results.append((author.name,author.affiliation))
        else:
            results.append((author.name,author.affiliation))
    json = {"author_search_result:" : results, "author_search_results_alternative": alternative_results}
    return json

def search_authors_by_name(name):
    search_query = scholarly.search_author(name)
    authors_summary = []
    for i in range(0, 5):
        result = next(search_query, None)
        if result is None:
            break
        authors_summary.append([result.name, result.affiliation])
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
#returns authors publications with their citatipns
def get_authors_publications(name,range=None):
    search_query = scholarly.search_author(name)
    author = next(search_query).fill()
    if range:
        pubs = {pub.bib['title'] : pub.citedby for pub in author.publications[:range]}
    else:
        pubs = {pub.bib['title'] : pub.citedby for pub in author.publications}
    json = {"publications": pubs}
    return json

def getNameOutOfAuthorJson(authorJson):
    #This is an example, pls edit this for appropriate header in the json
    #Other info can be added as json as well,    
    return authorJson[0][0]


def getAuthorsColloborators():
    #ToDO: get authors colloborators

    return None

def get_author_citation_by_year(name):
    search_query = scholarly.search_author(name)
    author = next(search_query).fill()
    cites_per_year = author.cites_per_year
    return {"cites_per_year":cites_per_year}

def search_publication(pub_name):
    search_query = scholarly.search_pubs_query(pub_name)
    pub = next(search_query)
    if not pub:
        return {}
    json = {
        'abstract': pub.bib['abstract'],
        'author': [author.strip(" ") for author in pub.bib['author'].split("and")],
        'eprint_url': pub.bib['eprint'],
        'title': pub.bib['title'],
        'url': pub.bib['url']
    }
    return json


print(search_publication("vergence"))
