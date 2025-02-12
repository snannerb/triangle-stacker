const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeInput = document.getElementById('size');
const colorInput = document.getElementById('color');
const clearButton = document.getElementById('clear');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const saveButton = document.getElementById('save');
let triangles = [];
let history = [];
let currentStep = -1;

// Function to draw a triangle
function drawTriangle(x, y, size, color) {
  const height = (Math.sqrt(3) / 2) * size;
  ctx.beginPath();
  ctx.moveTo(x, y - height / 2);
  ctx.lineTo(x - size / 2, y + height / 2);
  ctx.lineTo(x + size / 2, y + height / 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

// Function to handle canvas click
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const size = parseInt(sizeInput.value);
  const color = colorInput.value;
  triangles.push({ x, y, size, color });
  history = history.slice(0, currentStep + 1);
  history.push([...triangles]);
  currentStep++;
  redrawCanvas();
});

// Function to redraw all triangles
function redrawCanvas() {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  const offscreenCtx = offscreenCanvas.getBContext('2d');

  triangles.forEach(triangle => {
    drawTriangle(offscreenCtx, triangle.x, triangle.y, triangle.size, triangle.color);
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(offscreenCanvas, 0, 0);
}

// Clear canvas
clearButton.addEventListener('click', () => {
  triangles = [];
  history = [];
  currentStep = -1;
  redrawCanvas();
});

// Undo action
undoButton.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    triangles = [...history[currentStep]];
  redrawCanvas();
  } else {
    console.log("Nothing to undo.");
  }
});

// Redo action
redoButton.addEventListener('click', () => {
  if (currentStep < history.length - 1) {
    currentStep++;
    triangles = [...history[currentStep]];
    redrawCanvas();
  } else {
    console.log("Nothing to redo.");
  }
});

// Save canvas as image
saveButton.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'triangle-art.png';
  link.click();
});
