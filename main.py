#!/usr/bin/env python3

from flask import Flask, send_from_directory, request
import os

app = Flask(__name__)

markers = {
    "a": (51.5, -0.09),
    "b": (51.6, -0.09)
}

@app.route('/api/get_markers')
def get_markers():
    return markers


@app.route('/api/add_markers')
def add_markers():
    name = request.args.get('name')
    x = float(request.args.get('x'))
    y = float(request.args.get('y'))
    markers[name] = (x,y)
    return 'OK'


@app.route('/api/del_markers')
def del_markers():
    name = request.args.get('name')
    del markers[name]
    return 'OK'


if __name__ == '__main__':
    app.run()