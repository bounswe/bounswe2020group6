import unittest
import json
import scholar_util

        
def author_citation(name):
    data = scholar_util.getAuthorCitationStats(name)
    data = dict(data["cites_per_year"])

    return data.get(2019)

    

class SimpleTest(unittest.TestCase):

    # Returns True or False.
    def test_author_citation_that_exists(self):
        can_kozcaz = 184

        self.assertEqual(author_citation("Can Kozcaz"), can_kozcaz)

    def test_author_citation_that_doesnt_exist(self):
        ibrahim_semiz = None

        self.assertEqual(author_citation("İbrahim Semiz"), ibrahim_semiz)


if __name__ == '__main__':
    unittest.main()