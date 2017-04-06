from flask import request
import cv2
import numpy as np
from . import main
from ..predictor import predictor


@main.route("/predict", methods=['POST'])
def predict():
    f = request.files['file']
    byte_array = np.fromstring(f.read(), np.uint8)
    img = cv2.imdecode(byte_array, cv2.IMREAD_UNCHANGED)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    result = predictor.predict(img.reshape(1, -1))
    return str(result)
