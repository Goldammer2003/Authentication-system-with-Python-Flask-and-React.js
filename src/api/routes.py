"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=['POST'])
def handle_login():
    email=request.json.get("email",None)
    password=request.json.get('password',None)
    user=User.query.filter_by(email=email,password=password).first()

    if user is None:
        return jsonify({"Message":"wrong email or password"}), 401 

    access_token=create_access_token(identity=user.id)
    return jsonify ({"access_token":access_token, "user":user.serialize()})


@api.route("/register",methods=["POST"])
def handle_register():
    body=request.json
    user=User(email=body["email"], password=body["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"Message":"email/password found"}), 200 