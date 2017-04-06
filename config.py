import os
from logging import (
    StreamHandler, INFO, Formatter
)

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    CHECKPOINT_FILE_PATH = os.path.join(basedir, 'mnist-model', 'my-model')

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


class ProductionConfig(Config):
    pass


class HerokuConfig(ProductionConfig):
    @staticmethod
    def init_app(app):
        ch = StreamHandler()
        ch.setFormatter(Formatter(app.config.get('LOG_FORMAT')))
        ch.setLevel(INFO)
        app.logger.addHandler(ch)
        app.logger.setLevel(INFO)


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'heroku': HerokuConfig,
    'default': DevelopmentConfig
}
