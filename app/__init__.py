from flask import Flask
from flask_cors import CORS
from config import config


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config[config_name])
    app.config.from_pyfile('config.py', silent=True)
    config[config_name].init_app(app)

    CORS(app)

    from .predictor import predictor
    predictor.init_app(app)

    from .main import main
    app.register_blueprint(main)

    return app
