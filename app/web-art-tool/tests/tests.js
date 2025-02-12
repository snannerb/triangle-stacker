const canvas = document.getElementById('canvas');
const ctx = canvas.getBContext('2d');
const sizeInput = document.getElementById('size');
const clearButton = document.getElementById('clear');
let triangles = [];

// Test 1: Triangle rendering
function testTriangleRendering() {
  drawTriangle(100, 100, 50, '#007bff');
  if (triangles.length === 0) {
    console.error("Test 1 Failed: Triangle not rendered.");
  } else {
    console.log("Test 1 Passed: Triangle rendered successfully.");
  }
}

// Test 2: Canvas clearing
function testCanvasClearing() {
  clearButton.click();
  if (triangles.length !== 0) {
    console.error("Test 2 Failed: Canvas not cleared.");
  } else {
    console.log("Test 2 Passed: Canvas cleared successfully.");
  }
}

// Run tests
testTriangleRendering();
testCanvasClearing();
