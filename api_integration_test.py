import unittest
import requests
from requests.models import Response
from werkzeug.wrappers import response

#
class TestApi(unittest.TestCase):
    url = 'http://127.0.0.1:3004'
    animals = '{}/animals'.format(url)
    payload = {}
    payload['date']= "10-12-2010"
    payload['name']= "cathy"
    payload['type']= "Gato"
    payload['weight']= "cathy"
    
    def setUp(self):
        requests.post(self.animals,json={'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'})
        requests.post(self.animals,json={'date': "1-12-2015", 'name': "cabe", 'weight': 7, 'type': 'Gato'})
        self.object = (requests.get(self.animals)).json()
        self.object_id = self.object[0]['_id']

    def test_get(self):
        response = requests.get(self.animals)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.json(),[])
        self.assertEqual(response.json(),self.object)
        self.assertEqual(response.headers.get('Content-Type'),'application/json')

    def test_post(self):
        test = {'date': "10-12-2010", 'name': "cathy", 'weight': 10, '_id': 1, 'type': 'dog'}
        response = requests.post(url=self.animals,json=self.payload)
        print(response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual((response.json())['name'],self.payload['name'])
        self.assertEqual(response.headers.get('Content-Type'),'application/json')

    def test_delete(self):
        test = {'date': "10-12-2010", 'name': "cathy", 'weight': 10, '_id': '2142435624353', 'type': 'dog'}
        response = requests.delete('{}/{}'.format(self.animals,test['_id']))
        self.assertEqual(response.status_code,500)
        response = requests.get('{}/{}'.format(self.animals,self.object_id))
        self.assertEqual(self.object[0],response.json())
        response = requests.delete('{}/{}'.format(self.animals,self.object_id))
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json(),{})
        response = requests.get(self.animals)
        self.assertTrue(self.object not in response.json())

    def test_update(self):
        response = requests.post(self.animals,json=self.object[0])
        self.assertEqual(response.status_code,200)
        update = self.object[0].copy()
        update['name'] = 'updated_name'
        response = requests.put('{}/{}'.format(self.animals,self.object_id),json=update)
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json(),update)

if __name__ == '__main__':
    unittest.main()