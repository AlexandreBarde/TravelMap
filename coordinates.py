import geocoder

from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/coordinate', methods=['GET'])
@cross_origin()
def search():
    args = request.args
    if args.get("city") == None:
        print("error")
        return "no"
    else:
        print("ok")
        #g = geocoder.osm('Belo Horizonte, MG, Brazil')
        #print('Lat: {}\nLong: {}'.format(g.osm['y'], g.osm['x']))
        g2 = geocoder.osm(args.get("city"))
        print('Lat: {}\nLong: {}'.format(g2.osm['y'], g2.osm['x']))
        print(type(args))
        return {"city": args.get("city"), "lat": g2.osm['y'], "long": g2.osm['x']}
        #return args


