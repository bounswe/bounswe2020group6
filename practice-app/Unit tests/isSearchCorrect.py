import unittest
import json
import scholar_util


def isSearchCorrect():
    
    json = scholar_util.searchPublication("cell")     
    
    if 'FM Gill' not in json["author"]:
        return False
    else:
        return True
 
class SimpleTest(unittest.TestCase): 
  
    # Returns True or False.  
    def test(self):            
        self.assertTrue(isSearchCorrect() == True) 



  
if __name__ == '__main__': 
    unittest.main()
