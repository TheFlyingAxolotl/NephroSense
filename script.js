// Access the camera and simulate circle detection
let videoStream;

document.getElementById('scanButton').addEventListener('click', startCamera);

function startCamera() {
  // Show camera feed
  document.getElementById('cameraFeed').classList.remove('hidden');
  document.getElementById('scanButton').classList.add('hidden');

  // Access the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoStream = stream;
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.play();

      // Simulate circle detection after 3 seconds
      setTimeout(() => {
        stopCamera();
        startProcessing();
      }, 3000);
    })
    .catch((error) => {
      alert('Error accessing the camera: ' + error.message);
    });
}

function stopCamera() {
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach(track => track.stop());
  }
  document.getElementById('cameraFeed').classList.add('hidden');
}

function startProcessing() {
  // Show processing animation
  document.getElementById('processing').classList.remove('hidden');

  // Simulate processing delay
  setTimeout(() => {
    document.getElementById('processing').classList.add('hidden');
    showResults();
  }, 3000);
}

function showResults() {
  // Show results table and rescan button
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('rescan-container').classList.remove('hidden');
  document.getElementById('graphs').classList.remove('hidden');

  // Initialize graphs
  initializeGraphs();
}

document.getElementById('rescanButton').addEventListener('click', () => {
  // Reset everything
  document.getElementById('results').classList.add('hidden');
  document.getElementById('rescan-container').classList.add('hidden');
  document.getElementById('graphs').classList.add('hidden');
  document.getElementById('scanButton').classList.remove('hidden');
});

function initializeGraphs() {
  const ureaData = [7.21, 7.42, 7.53, 7.34, 7.65, 7.76, 7.87].map(val => parseFloat(val.toFixed(3))); // Rounded to 3 SF
  const creatinineData = [115.2, 116.3, 117.4, 118.5, 119.6, 120.7, 121.8].map(val => parseFloat(val.toFixed(3)));
  const cystatinCData = [1.31, 1.32, 1.32, 1.36, 1.34, 1.35, 1.42].map(val => parseFloat(val.toFixed(3)));
  const sodiumData = [143.1, 142.2, 143.3, 144.4, 143.5, 145.6, 149.7].map(val => parseFloat(val.toFixed(3)));

  const labels = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  createChart('ureaGraph', 'Urea (mmol/L)', labels, ureaData);
  createChart('creatinineGraph', 'Creatinine (µmol/L)', labels, creatinineData);
  createChart('cystatinCGraph', 'Cystatin C (mg/L)', labels, cystatinCData);
  createChart('sodiumGraph', 'Sodium (mmol/L)', labels, sodiumData);
}

function createChart(canvasId, label, labels, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: '#673ab7',
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        borderWidth: 2,
        fill: true,
        pointRadius: 4, // Smaller points for clarity
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ensure proper scaling
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Remove x-axis gridlines
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            drawBorder: false, // Remove y-axis border
          },
        },
      },
    },
  });
}
