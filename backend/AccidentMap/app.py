from flask import Flask
from flask import jsonify
from records import Database

application = Flask(__name__)
DB_URI = "postgresql://cosc:password@localhost:5432/accidents"


@application.route("/")
def hello():
    return jsonify({"api_name": "COSC_API", "version": 2})


@application.route("/points/all")
def all():
    # http://localhost:5000/points/all
    db = Database(DB_URI)
    response = db.query('')
    return jsonify(response.as_dict())


@application.route("/points/id/<id>/")
def single_point(id):
    # Test Url: http://localhost:5000/points/id/1/
    db = Database(DB_URI)
    response = db.query('SELECT stop_id, brd_count, ali_count, st_x(lat_long) lat, st_y(lat_long) long, st_x(coords) x, st_y(coords) y '
                        'FROM stops '
                        'WHERE stop_id = :id',
                        id=id)
    return jsonify(response.as_dict())


if __name__ == "__main__":
    application.run()
