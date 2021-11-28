from typing import Iterable
import unittest
from bson.objectid import ObjectId
import flask
from unittest.mock import Mock, MagicMock
from flask_cors import CORS, cross_origin
import pymongo
from pymongo.database import Database
from pymongo.results import DeleteResult, InsertOneResult, UpdateResult
from requests.api import patch
import server

class TestUnitApi(unittest.TestCase):

    def setUp(self) -> None:
        self.app = flask.Flask(__name__)
        self.cors = CORS(self.app,resources={
            r"/*":{
                "origins":"localhost"
            }
        },allow_headers='*')
        self.db = server.db
        self.db = Mock()
        # try:
        #     mongo = pymongo.MongoClient(
        #         host='localhost',
        #         port=27017,
        #         serverSelectionTimeOutMS=1000)
        #     self.db = mongo.aditum
        #     mongo.server_info()  # trigger exception if cannot connect to db
        # except:
        #     print("ERROR- cannot connect to db")
        
        def find_one_side_effect():
            return {'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'}
        def insert_side_effect():
            insertresult = InsertOneResult(ObjectId('0123456789ab0123456789ab'),True)
            return insertresult
        def delete_side_effect():
            deleteresult = DeleteResult({'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'},True)
            return deleteresult
        def update_side_effect():
            updateresult = UpdateResult({'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'},True)
            return updateresult
        def find_side_effect():
            return [{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'}]
        
        self.db.animals.insert_one = Mock(side_effect=insert_side_effect) 
        self.db.animals.delete_one = Mock(side_effect=delete_side_effect)
        self.db.animals.find_one = Mock(side_effect=find_one_side_effect)
        self.db.animals.find = Mock(side_effect=find_side_effect)
        self.db.animals.update_one = Mock(side_effect=update_side_effect)

    def test_one(self):
        result = list(self.db.animals.find())
        self.assertEqual(result,[{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'}])
        result = self.db.animals.find_one()
        self.assertEqual(result,{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'})


    def test_get(self):
        with self.app.test_client() as c:
            result = c.get('/animals')
            self.db.animals.find.assert_called_once()
            self.assertEqual(result.data,[{'date': "10-11-2019", 'name': "anabelle", 'weight': 12, 'type': 'Cachorro'}])

    










    def tearDown(self) -> None:
        return super().tearDown()
    
    