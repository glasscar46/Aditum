import re
from typing import Iterable
import unittest
from unittest import result
from bson.objectid import ObjectId
import json
from unittest.mock import Mock, MagicMock
from flask_cors import CORS, cross_origin
import pymongo
from pymongo.database import Database
from pymongo.results import DeleteResult, InsertOneResult, UpdateResult
from requests.api import patch
import server

class TestUnitApi(unittest.TestCase):

    def setUp(self) -> None:
        self.app = server.app
        self.app.testing = True
        self.cors = CORS(self.app,resources={
            r"/*":{
                "origins":"localhost"
            }
        },allow_headers='*')
        server.db = Mock()
        self.db = server.db
        self.objectId = ObjectId()
        # try:
        #     mongo = pymongo.MongoClient(
        #         host='localhost',
        #         port=27017,
        #         serverSelectionTimeOutMS=1000)
        #     self.db = mongo.aditum
        #     mongo.server_info()  # trigger exception if cannot connect to db
        # except:
        #     print("ERROR- cannot connect to db")
        
        def find_one_side_effect(id):
            return {'date': "10-11-2019", 'name': "anabelle", 'weight': 12, '_id': self.objectId, 'type': 'Cachorro'}
        def insert_side_effect(animal):
            insertresult = InsertOneResult(self.objectId,True)
            return insertresult
        def delete_side_effect(id):
            deleteresult = DeleteResult({'date': "10-11-2019", 'name': "anabelle",'id': self.objectId, 'weight': 12, 'type': 'Cachorro'},True)
            return deleteresult
        def update_side_effect(id,update):
            Updateresult = Mock(UpdateResult)
            updateresult = Updateresult({'date': "10-11-2019", 'name': "anabelle",'_id': self.objectId, 'weight': 12, 'type': 'Cachorro'},True)
            updateresult.modified_count = 1
            return updateresult
        def find_side_effect():
            return [{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, '_id': self.objectId, 'type': 'Cachorro'}]
        
        self.db.animals.insert_one = Mock(side_effect=insert_side_effect) 
        self.db.animals.delete_one = Mock(side_effect=delete_side_effect)
        self.db.animals.find_one = Mock(side_effect=find_one_side_effect)
        self.db.animals.find = Mock(side_effect=find_side_effect)
        self.db.animals.update_one = Mock(side_effect=update_side_effect)

    # def test_one(self):
    #     result = list(self.db.animals.find())
    #     self.assertEquals(result,[{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, '_id': self.objectId, 'type': 'Cachorro'}])
    #     result = self.db.animals.find_one()
    #     self.assertEquals(result,[{'date': "10-11-2019", 'name': "anabelle", 'weight': 12,'_id': self.objectId, 'type': 'Cachorro'}])


    def test_get(self):
        with self.app.test_client() as c:
            result = c.get('/animals')
            self.db.animals.find.assert_called_once()
            self.assertAlmostEquals(result.json,[{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, '_id': str(self.objectId), 'type': 'Cachorro'}])

    def test_post(self):
        animal = {'date': "10-11-2019", 'name': "anabelle", 'weight': 12, '_id': str(self.objectId), 'type': 'Cachorro'}
        with self.app.test_client() as c:
            result = c.post('/animals',data=animal)
            self.assertEquals(result.status_code,200)
            self.assertEquals(result.json,animal)

    def test_delete(self):
        with self.app.test_client() as c:
            result = c.delete('/animals/{}'.format(self.objectId))
            self.assertEquals(result.status_code,200)
            self.assertEquals(result.json,{})
    def test_put(self):
        with self.app.test_client() as c:
            result = c.put('/animals/{}'.format(str(self.objectId)),json={'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'})
            self.assertEquals(result.status_code, 200)
            self.assertEquals(result.json,{'date': "10-11-2019", 'name': "anabelle",'_id': str(self.objectId), 'weight': 12, 'type': 'Cachorro'})
    def tearDown(self) -> None:
        return super().tearDown()
    
    