// Global variables
let array = [];
let targetValue = null;
let currentIndex = -1;
let graphCanvas = null;
let graphCtx = null;

// Function to generate the array based on user input
function generateArray() {
  const arraySizeInput = document.getElementById('arraySize');
  const arrayElementsInput = document.getElementById('arrayElements');

  const size = parseInt(arraySizeInput.value);
  const elements = arrayElementsInput.value.trim().split(' ');

  array = [];
  for (let i = 0; i < size; i++) {
    if (elements[i]) {
      array.push(parseInt(elements[i]));
    } else {
      array.push(0); // Fill empty positions with 0
    }
  }

  currentIndex = -1; // Reset the current index
  targetValue = null; // Reset the target value

  drawGraph();
}

// Function to start the search process
function startSearch() {
  const targetValueInput = document.getElementById('targetValue');

  targetValue = parseInt(targetValueInput.value);
  currentIndex = 0;
  searchNext();
}

// Function to perform the linear search
function linearSearch() {
  if (currentIndex >= array.length) {
    currentIndex = -1; // Reset the current index if we reach the end
  }

  if (currentIndex >= 0 && array[currentIndex] === targetValue) {
    alert(`Element is found at index ${currentIndex}`);
    return currentIndex;
  }

  return -1;
}

// Function to search the next element and update the graph
function searchNext() {
  const searchResult = linearSearch();

  if (searchResult >= 0) {
    drawGraph(searchResult, true);
  } else if (currentIndex < array.length - 1) {
    currentIndex++;
    drawGraph(currentIndex, false, currentIndex); // Pass currentIndex as currentPointerIndex
    setTimeout(searchNext, 1000); // Move to the next position after 5 seconds
  } else {
    drawGraph(-1);
    alert("Element not found!");
  }
}

// Function to draw the graph
function drawGraph(highlightIndex = -1, found = false, currentPointerIndex = 0) {
  if (!graphCanvas) {
    graphCanvas = document.getElementById('graphCanvas');
    graphCtx = graphCanvas.getContext('2d');
  }

  const canvasWidth = graphCanvas.width;
  const canvasHeight = graphCanvas.height;
  const barWidth = canvasWidth / array.length;
  const barHeightMultiplier = canvasHeight / (Math.max(...array) + 2);
  const fontSize = 18;
  graphCtx.font = `${fontSize}px Arial`;

  graphCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightMultiplier;
    const x = i * barWidth;
    const y = canvasHeight - barHeight;
    
    if (found && highlightIndex === i) {
        graphCtx.fillStyle = 'green';
        // currentPointerIndex=-1;
    } else {
        graphCtx.fillStyle = 'blue';
    }


    if (currentPointerIndex === i) {
      graphCtx.fillStyle = 'yellow'; // Highlight the current pointer bar in yellow
    }

    graphCtx.fillRect(x, y, barWidth - 2, barHeight);

    graphCtx.fillStyle = 'black';
    graphCtx.fillText(array[i], x + barWidth / 3, y - 10);

    graphCtx.fillStyle = 'red';// for index
    graphCtx.fillText(i, x + barWidth / 3, canvasHeight - 5);
  }
}

// Initialize the graph on page load
window.onload = drawGraph;
