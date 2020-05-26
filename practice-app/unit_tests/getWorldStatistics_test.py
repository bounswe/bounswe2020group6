import unittest
import json
import coronavirus_api

def isJson():
    json = coronavirus_api.getWorldStatistics()
    if not json:
        return False
    if not json['world_stats'] :
        return False
    else:
        stats_dict = json['world_stats'][0]
        if type(stats_dict["total_confirmed"]) == int:
            return True
        else:
            return False


class SimpleTest(unittest.TestCase):

    # Returns True or False.
    def test(self):
        self.assertTrue(isJson() == True)


if __name__ == '__main__':
    unittest.main()
