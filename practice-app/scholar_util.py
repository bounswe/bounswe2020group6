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
