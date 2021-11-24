import unittest
import requests

class Apitest(unittest.TestCase):
    url = 'http://127.0.0.1:3004/'
    animals = '{}/animal'.format(url)

    def index(self):
        response = requests.get(self.animals)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json,[])
        self.assertEqual(response.headers.get('Content-Type'),'application/json')



if __name__ == '__main__':
    unittest.main()