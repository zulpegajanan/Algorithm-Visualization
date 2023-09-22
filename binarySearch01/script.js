// Global variables
let array = [];
let targetValue = null;
let leftIndex = 0;
let rightIndex = 0;
let midIndex = 0;
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

  

  leftIndex = 0;
  rightIndex = array.length - 1;
  targetValue = null; // Reset the target value

  drawGraph();
}



// Function to start the binary search process
function startBinarySearch() {
  const targetValueInput = document.getElementById('targetValue');

  targetValue = parseInt(targetValueInput.value);

  binarySearch();
}

// Function to perform the binary search algorithm
function binarySearch() {
  if (leftIndex <= rightIndex) {
    midIndex = Math.floor((leftIndex + rightIndex) / 2);

    updateIterationInfo(); // Update iteration info before drawing the graph
    drawGraph();

    if (array[midIndex] === targetValue) {
      setTimeout(function () {
        drawGraph(midIndex, true); // Found: highlight the bar in green
        alert("Element found at index " + midIndex);
      }, 5000);
      return;
    } else if (array[midIndex] < targetValue) {
      leftIndex = midIndex + 1;
    } else {
      rightIndex = midIndex - 1;
    }

    setTimeout(function () {
      binarySearch();
    }, 5000); // Call the function recursively after 1 second
  } else {
    drawGraph(); // Element not found: reset the graph
    alert("Element not found!");
  }
}

// Function to update the iteration info
function updateIterationInfo() {
  const leftIndexLabel = document.getElementById('leftIndexLabel');
  const midIndexLabel = document.getElementById('midIndexLabel');
  const rightIndexLabel = document.getElementById('rightIndexLabel');

  leftIndexLabel.textContent = 'Left Index: ' + leftIndex;
  midIndexLabel.textContent = 'Mid Index: ' + midIndex;
  rightIndexLabel.textContent = 'Right Index: ' + rightIndex;

}

// Function to draw the graph
function drawGraph(highlightIndex = -1, found = false) {
  if (!graphCanvas) {
    graphCanvas = document.getElementById('graphCanvas');
    graphCtx = graphCanvas.getContext('2d');
  }

  const canvasWidth = graphCanvas.width;
  const canvasHeight = graphCanvas.height;
  const barWidth = canvasWidth / array.length;
  const barHeightMultiplier = canvasHeight / (Math.max(...array) + 2);

  graphCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightMultiplier;
    const x = i * barWidth;
    const y = canvasHeight - barHeight;

    if (found && highlightIndex === i) {
      graphCtx.fillStyle = 'green'; // Highlight the found element in green
    } 
    else if(i===rightIndex){
       graphCtx.fillStyle = 'red';
    }
    else if(i===leftIndex){
      graphCtx.fillStyle = 'red';
    }
    else {
      graphCtx.fillStyle = 'gray'; // Default color is gray
    }

    


    graphCtx.fillRect(x, y, barWidth - 2, barHeight);

    graphCtx.fillStyle = 'black';
    graphCtx.fillText(array[i], x + barWidth / 3, y - 10); // Numerical value above the bar
  }
}

// Initialize the graph on page load
window.onload = function () {
  graphCanvas = document.getElementById('graphCanvas');
  graphCtx = graphCanvas.getContext('2d');
  drawGraph();
};
