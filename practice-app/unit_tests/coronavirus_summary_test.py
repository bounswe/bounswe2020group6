import unittest
import json
import coronavirus_api  


def isCoronavirusJson():
    
    list = coronavirus_api.coronavirus_summary_search()     
    
    if 'Country' not in list[0]:
        return False
    else:
        return True
 
class SimpleTest(unittest.TestCase): 
  
    # Returns True or False.  
    def test(self):            
        self.assertTrue(isCoronavirusJson() == True) 



  
if __name__ == '__main__': 
    unittest.main()
