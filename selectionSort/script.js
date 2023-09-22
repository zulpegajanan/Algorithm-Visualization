// Global variables
let array = [];
let currentIndex = 0;
let minValueIndex = 0;
let graphCanvas = null;
let graphCtx = null;
let minValueContainer = null;
let minValueElem = null;
let chart = null;

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

  currentIndex = 0;
  minValueIndex = 0;

  drawGraph();
  showMinValue();
  createBarChart();
}

// Function to start the selection sort process
function startSelectionSort() {
  selectionSort();
}

// Function to create the bar chart using Chart.js
function createBarChart() {
  if (!graphCanvas) {
    graphCanvas = document.getElementById('graphCanvas');
    graphCtx = graphCanvas.getContext('2d');
  }

  // Destroy the previous chart (if any)
  if (chart) {
    chart.destroy();
  }

  // Create the chart data
  const chartData = {
    labels: array.map((_, i) => `Bar ${i + 1}`),
    datasets: [{
      label: 'Array Elements',
      data: array,
      backgroundColor: 'blue',
    }]
  };

  // Create the chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  // Create the bar chart
  chart = new Chart(graphCtx, {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  });
}

// Function to draw the graph
function drawGraph(isSorted = false) {
  if (isSorted) {
    chart.data.datasets[0].backgroundColor = array.map(() => 'green');
  } else {
    chart.data.datasets[0].backgroundColor = array.map((_, i) => i === currentIndex ? 'orange' : 'blue');
  }
  chart.update();
}

// Function to show the current minimum value
function showMinValue() {
  if (!minValueContainer) {
    minValueContainer = document.getElementById('minValueContainer');
    minValueElem = document.getElementById('minValue');
  }

  minValueElem.textContent = array[currentIndex];
}

// Function to perform the selection sort algorithm
function selectionSort() {
  if (currentIndex < array.length - 1) {
    // Find the index of the minimum value in the unsorted part of the array
    let minIndex = currentIndex;
    for (let i = currentIndex + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
    }

    // Swap the minimum value with the first element of the unsorted part
    if (minIndex !== currentIndex) {
      const temp = array[currentIndex];
      array[currentIndex] = array[minIndex];
      array[minIndex] = temp;
    }

    currentIndex++;

    drawGraph();
    showMinValue();

    setTimeout(selectionSort, 1000); // Call the function recursively after 1 second
  } else {
    drawGraph(true); // Array is fully sorted, highlight in green
  }
}

// Initialize the graph on page load
window.onload = function () {
  graphCanvas = document.getElementById('graphCanvas');
  graphCtx = graphCanvas.getContext('2d');
  minValueContainer = document.getElementById('minValueContainer');
  minValueElem = document.getElementById('minValue');

  // Hide the minimum value container initially
  minValueContainer.style.display = 'none';
};
