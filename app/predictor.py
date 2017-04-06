import tensorflow as tf


class Predictor():
    def __init__(self):
        W = tf.Variable(tf.zeros([784, 10]))
        b = tf.Variable(tf.zeros([10]))
        self.x = tf.placeholder(tf.float32, [None, 784])
        y = tf.matmul(self.x, W) + b
        self.predict_op = tf.argmax(y, axis=1)
        self.sess = None

    def init_app(self, app):
        self.sess = tf.Session()
        saver = tf.train.Saver()
        saver.restore(self.sess, app.config.get('CHECKPOINT_FILE_PATH'))

    def predict(self, x):
        return self.sess.run(self.predict_op, {self.x: x})[0]


predictor = Predictor()
