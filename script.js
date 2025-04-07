const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Turtle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.angle = 0; 
    this.speed = 8;
    this.color = color;
    this.isSpinning = false; 
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  move(direction) {
    if (direction === 'up') this.y -= this.speed;
    if (direction === 'down') this.y += this.speed;
    if (direction === 'left') this.x -= this.speed;
    if (direction === 'right') this.x += this.speed;
  }

  spin() {
    this.angle += 0.1;
  }

  collisionDetection(otherTurtle) {
    const dx = this.x - otherTurtle.x;
    const dy = this.y - otherTurtle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + otherTurtle.radius) {
      this.isSpinning = true; 
      otherTurtle.isSpinning = true;
    }
  }
}

let turtle1 = new Turtle(200, 300, 'green');
let turtle2 = new Turtle(600, 300, 'blue');

document.addEventListener('keydown', (e) => {
  if (e.key === 'w') turtle1.move('up');
  if (e.key === 's') turtle1.move('down');
  if (e.key === 'a') turtle1.move('left');
  if (e.key === 'd') turtle1.move('right');

  if (e.key === 'ArrowUp') turtle2.move('up');
  if (e.key === 'ArrowDown') turtle2.move('down');
  if (e.key === 'ArrowLeft') turtle2.move('left');
  if (e.key === 'ArrowRight') turtle2.move('right');
});

function update() {
  turtle1.collisionDetection(turtle2);
  if (turtle1.isSpinning) turtle1.spin();
  if (turtle2.isSpinning) turtle2.spin();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  turtle1.draw();
  turtle2.draw();

  requestAnimationFrame(update);
}

update();
