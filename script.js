const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const gravity = 1;
const friction = 0.9;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener("click", () => init());

const colors = ["#966F2A", "#E0DFDC", "#966F2A", "#06274A", "#8A8F94"];

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const randomIntFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let balls;

const init = () => {
  balls = [];

  for (let i = 0; i < 100; i++) {
    const radius = randomIntFromRange(18, 30);
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(radius, canvas.height - radius);
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);
    const color = randomColor();

    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => ball.update());
};

init();
animate();
