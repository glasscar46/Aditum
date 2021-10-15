from flask import Flask, Response, request
import pymongo
import json
from bson.objectid import ObjectId
from flask_cors import  CORS, cross_origin

app = Flask(__name__)
cors = CORS(app,resources={
    r"/*":{
        "origins":"localhost"
    }
},allow_headers='*')

try:
    mongo = pymongo.MongoClient(
        host='localhost',
        port=27017,
        serverSelectionTimeOutMS=1000)
    db = mongo.aditum
    mongo.server_info()  # trigger exception if cannot connect to db
except:
    print("ERROR- cannot connect to db")

@app.route("/animals", methods=["POST"])
@cross_origin(allow_headers=['Content-Type'])
def create_animal():
    try:
       animal = request.json
       print(animal)
       dbResponse = db.animals.insert_one(animal)
       id = dbResponse.inserted_id
       animal = db.animals.find_one({"_id":ObjectId(id)})
       animal["_id"] = str(animal["_id"])
       return Response(response=json.dumps(animal),status=200,mimetype="application/json")
    except Exception as ex:
        return Response(response=json.dumps(ex),status=500,mimetype="application/json")

@app.route('/animals', methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def get_animals():
    try:
        data = list(db.animals.find())
        for animal in data:
            animal["_id"] = str(animal["_id"])
        return Response(response=json.dumps(data), status=200, mimetype="application/json")
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"error": ex}), status=500, mimetype="application/json")

@app.route('/animals/<id>',methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def get_animal(id):
    try:
        animal = db.animals.find_one({"_id": ObjectId(id)})
        animal["_id"] = str(animal["_id"])
        return Response(response=json.dumps(animal),status=200,mimetype="application/json")
    except Exception as ex:
        print(ex)
        return Response()
    

@app.route('/animals/<id>', methods=["PUT"])
@cross_origin(allow_headers=['Content-Type'])
def update_animal(id):
    try:
        data = request.json
        print(data)
        dbResponse = db.animals.update_one({"_id": ObjectId(id)}, {"$set": {'name': data['name'],'type': data['type'],'date': data["date"],'weight': data["weight"]}})
        if dbResponse.modified_count == 1:
            animal = db.animals.find_one({"_id":ObjectId(id)})
            animal["_id"] = str(animal["_id"])
            return Response(response=json.dumps(animal),status=200,mimetype="application/json")
        else:
            return response(response=json.dumps({"error":"user error"}),status=400, mimetype="application/json")

    except Exception as ex:
        return Response(response=json.dumps({"error": ex}), status=500, mimetype="application/json")


@app.route('/animals/<id>', methods=["DELETE"])
@cross_origin(allow_headers=['Content-Type'])
def delete_user(id):
    try:
        dbResponse = dir(db.animals.delete_one({"_id": ObjectId(id)}))
        return Response(response=json.dumps({}),status=200,mimetype="application/json")
    except Exception as ex:
        return Response(response=json.dumps({"error": ex}), status=500, mimetype="application/json")


if __name__ == "__main__":
    app.run(port=3004, debug=True)
