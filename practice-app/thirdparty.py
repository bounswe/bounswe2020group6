import scholarly

#Search for an author by name and return a generator of Author objects.
search_query = scholarly.search_author('Marty Banks, Berkeley')
print(next(search_query))

#Search by keyword and return a generator of Author objects.
search_query = scholarly.search_keyword('Haptics')
print(next(search_query))

# Search for articles/publications and return generator of Publication objects.
search_query = scholarly.search_pubs_query('Perception of physical stability and center of mass of 3D objects')
print(next(search_query))

#Populate the Author object with information from their profile. The optional sections parameter takes a list of the portions of author information to fill
search_query = scholarly.search_author('Steven A Cholewiak')
author = next(search_query)
print(author.fill(sections=['basic', 'citation_indices', 'co-authors']))


# Retrieve the author's data, fill-in, and print
search_query = scholarly.search_author('Steven A Cholewiak')
author = next(search_query).fill()
print(author)

# Print the titles of the author's publications
print([pub.bib['title'] for pub in author.publications])

# Take a closer look at the first publication
pub = author.publications[0].fill()
print(pub)

# Which papers cited that publication?
print([citation.bib['title'] for citation in pub.get_citedby()])