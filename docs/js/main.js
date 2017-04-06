webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = __webpack_require__(1);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandwrittenNumberRecognition = function () {
  function HandwrittenNumberRecognition() {
    _classCallCheck(this, HandwrittenNumberRecognition);

    this.canvas = document.getElementById('canvas-main');
    this.resetButton = document.getElementById('btn-reset');
    this.result = document.getElementById('result');

    this.canvasRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'white';
    this.isDown = false;

    this.predictUrl = "https://mnist-flask.herokuapp.com" + '/predict';

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.resetButton.addEventListener('click', this.reset.bind(this));

    this.reset();
  }

  _createClass(HandwrittenNumberRecognition, [{
    key: 'getPosition',
    value: function getPosition(e) {
      return {
        x: e.clientX - this.canvasRect.left,
        y: e.clientY - this.canvasRect.top
      };
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.isDown = true;
      this.ctx.beginPath();
      var pos = this.getPosition(e);
      this.ctx.moveTo(pos.x, pos.y);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.isDown) {
        return;
      }
      var pos = this.getPosition(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      if (!this.isDown) {
        return;
      }
      this.isDown = false;
      this.postImage();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'postImage',
    value: function postImage() {
      var _this = this;

      this.makeImage().then(function (blob) {
        return _superagent2.default.post(_this.predictUrl).attach('file', blob);
      }).then(function (res) {
        _this.displayResult(res.text);
      });
    }
  }, {
    key: 'makeImage',
    value: function makeImage() {
      var copyCanvas = document.createElement('canvas');
      copyCanvas.width = 28;
      copyCanvas.height = 28;
      var copyCtx = copyCanvas.getContext('2d');
      copyCtx.fillStyle = 'black';
      copyCtx.fillRect(0, 0, copyCanvas.width, copyCanvas.height);
      copyCtx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, copyCanvas.width, copyCanvas.height);

      return new Promise(function (resolve) {
        copyCanvas.toBlob(function (blob) {
          resolve(blob);
        });
      });
    }
  }, {
    key: 'displayResult',
    value: function displayResult(text) {
      this.result.textContent = text;
    }
  }]);

  return HandwrittenNumberRecognition;
}();

window.onload = function () {
  return new HandwrittenNumberRecognition();
};

/***/ })

},[2]);
//# sourceMappingURL=main.js.map