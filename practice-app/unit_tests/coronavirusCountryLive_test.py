import unittest
import json
import coronavirus_api

def isJson():
    
    list = coronavirus_api.coronavirusCountryLive("France")     
    if 'Cases' not in list[0]:
        return False
    else:
        if type(list[0]["Cases"]) == int and list[0]["Status"] == 'confirmed':
            return True
        else:
            return False
 
class SimpleTest(unittest.TestCase): 
  
    # Returns True or False.  
    def test(self):            
        self.assertTrue(isJson() == True) 



  
if __name__ == '__main__': 
    unittest.main()
