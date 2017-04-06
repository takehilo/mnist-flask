import request from 'superagent';

class HandwrittenNumberRecognition {
  constructor() {
    this.canvas = document.getElementById('canvas-main');
    this.resetButton = document.getElementById('btn-reset');
    this.result = document.getElementById('result');

    this.canvasRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'white';
    this.isDown = false;

    this.predictUrl = API_URL + '/predict';

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.resetButton.addEventListener('click', this.reset.bind(this));

    this.reset();
  }

  getPosition(e) {
    return {
      x: e.clientX - this.canvasRect.left,
      y: e.clientY - this.canvasRect.top
    };
  }

  onMouseDown(e) {
    this.isDown = true;
    this.ctx.beginPath();
    let pos = this.getPosition(e);
    this.ctx.moveTo(pos.x, pos.y);
  }

  onMouseMove(e) {
    if (!this.isDown) {
      return;
    }
    const pos = this.getPosition(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  onMouseUp() {
    if (!this.isDown) {
      return;
    }
    this.isDown = false;
    this.postImage();
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  postImage() {
    this.makeImage()
      .then((blob) => {
        return request.post(this.predictUrl)
          .attach('file', blob);
      })
      .then((res) => {
        this.displayResult(res.text);
      });
  }

  makeImage() {
    const copyCanvas = document.createElement('canvas');
    copyCanvas.width = 28;
    copyCanvas.height = 28;
    const copyCtx = copyCanvas.getContext('2d');
    copyCtx.fillStyle = 'black';
    copyCtx.fillRect(0, 0, copyCanvas.width, copyCanvas.height);
    copyCtx.drawImage(this.canvas,
      0, 0, this.canvas.width, this.canvas.height,
      0, 0, copyCanvas.width, copyCanvas.height);

    return new Promise((resolve) => {
      copyCanvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  }

  displayResult(text) {
    this.result.textContent = text;
  }
}

window.onload = () => new HandwrittenNumberRecognition();
