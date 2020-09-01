const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// document.body.style.background = "url(" + canvas.toDataURL() + ")";
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

/**
* ! Particle contructor */
function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

/**
 * ! Draw method for particle. Creting outside constructor saves resources. */
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

/** 
 * ! Update method for particle */
Particle.prototype.update = function() {
  // Check for particle overlapping screen and draw
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  };
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  };
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
}

/** 
 * ! Init function to create particles. */
function init() {
  particleArray = [];
  for (let i = 0; i < 100; i++) {
    let size = Math.random() * 20;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = (Math.random() * .4) - .2;
    let directionY = (Math.random() * .4) - .2;
    let color = 'white';
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  };
}

/** 
 * ! Animation loop function to move particles. */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  };
}

/** 
 * ! Event listener for window size change. Rerender snowflakes */
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();