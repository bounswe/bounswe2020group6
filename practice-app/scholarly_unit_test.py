import unittest
import json
import scholar_util


def isGetAuthorsPublicationsCorrect():
    response = scholar_util.getAuthorsPublications("Ali")
    print("Hello")
    if response is not None:
        if response["publications"] is not None:
            isCorrect = True
            for publication in response["publications"]:
                isCorrect = (isCorrect
                             and type(publication["title"]) == str
                             and type(publication["author"]) == str
                             and type(publication["summary"]) == str
                             and type(publication["year"]) == str
                             and type(publication["url"]) == str)

    return isCorrect


def isSearchCorrect():
    json = scholar_util.searchPublication("cell")

    if 'FM Gill' not in json["author"]:
        return False
    else:
        return True


def isGetAuthorCorrect():
    for i in range(1, 10):
        json = scholar_util.getAuthors("Hawking", i)["author_search_result"]
        for author in json:
            if (author["name"] is None or
                    author["affiliation"] is None or
                    author["url_picture"] is None or
                    author["id"] is None):
                return False
        return True


class ScholarlyTest(unittest.TestCase):

    # Returns True or False.
    def test(self):
        self.assertTrue(isGetAuthorsPublicationsCorrect() == True)
        self.assertTrue(isSearchCorrect() == True)
        self.assertTrue(isGetAuthorCorrect() == True)


if __name__ == '__main__':
    unittest.main()
