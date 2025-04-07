const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Turtle {
  constructor(x, y, imageSrc) {
    this.x = x;
    this.y = y;
    this.width = 50;  
    this.height = 50; 
    this.image = new Image();
    this.image.src = imageSrc;
    this.angle = 0;
    this.speed = 8;
    this.isSpinning = false;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
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
    const thisLeft = this.x - this.width / 2;
    const thisRight = this.x + this.width / 2;
    const thisTop = this.y - this.height / 2;
    const thisBottom = this.y + this.height / 2;

    const otherLeft = otherTurtle.x - otherTurtle.width / 2;
    const otherRight = otherTurtle.x + otherTurtle.width / 2;
    const otherTop = otherTurtle.y - otherTurtle.height / 2;
    const otherBottom = otherTurtle.y + otherTurtle.height / 2;

    if (thisRight > otherLeft && thisLeft < otherRight && thisBottom > otherTop && thisTop < otherBottom) {
      this.isSpinning = true;
      otherTurtle.isSpinning = true;
    }
  }
}

let turtle1 = new Turtle(200, 300, 'turtle1.png'); 
let turtle2 = new Turtle(600, 300, 'turtle2.png'); 

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
