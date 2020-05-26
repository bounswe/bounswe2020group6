import unittest
import json
import coronavirus_api

def isCoronavirusByCountryCorrect():
    response = coronavirus_api.CoronavirusByCountry("turkey")
    if not response:
        return False
    if not response['country_results'] :
        return False
    else:
        country_data = response['country_results'][0]
        if type(country_data['deaths']) == int:
            return True
        else:
            return False
        
def isWorldStatsCorrect():
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
        self.assertTrue(isCoronavirusByCountryCorrect() == True)
        self.assertTrue(isWorldStatsCorrect() == True)


if __name__ == '__main__':
    unittest.main()
