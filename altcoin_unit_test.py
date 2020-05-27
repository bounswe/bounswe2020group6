import unittest
import json
import bitcoin_api

def isGetCoinRanksCorrect():
    response = bitcoin_api.getCoinRanks()

    if response is not None:
        if response["coins"] is not None:
            isCorrect = True
            for coin in response["coins"]:
                isCorrect = (isCorrect
                            and type(coin["rank"]) == str
                            and type(coin["symbol"]) == str
                            and type(coin["name"]) == str
                            and type(coin["price"]) == str
                            and type(coin["url"]) == str)

    return isCorrect


class AltCoinTest(unittest.TestCase):

    # Returns True or False.
    def test(self):
        self.assertTrue(isGetCoinRanksCorrect() == True)

if __name__ == '__main__':
    unittest.main()