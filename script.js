// Access the camera and simulate circle detection
let videoStream;

document.getElementById('scanButton').addEventListener('click', startCamera);

function startCamera() {

  document.getElementById('cameraFeed').classList.remove('hidden');
  document.getElementById('scanButton').classList.add('hidden');

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoStream = stream;
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.play();

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

  document.getElementById('processing').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('processing').classList.add('hidden');
    showResults();
  }, 3000);
}

function showResults() {

  document.getElementById('results').classList.remove('hidden');
  document.getElementById('rescan-container').classList.remove('hidden');
  document.getElementById('graphs').classList.remove('hidden');

  initializeGraphs();
}

document.getElementById('rescanButton').addEventListener('click', () => {
  document.getElementById('results').classList.add('hidden');
  document.getElementById('rescan-container').classList.add('hidden');
  document.getElementById('graphs').classList.add('hidden');
  document.getElementById('scanButton').classList.remove('hidden');
});

function initializeGraphs() {
  const ureaData = [7.21, 7.42, 7.53, 7.34, 7.65, 7.76, 7.87].map(val => parseFloat(val.toFixed(3))); // Rounded to 3 SF
  const creatinineData = [115.2, 116.3, 117.4, 116.5, 114.6, 113.7, 111.8].map(val => parseFloat(val.toFixed(3)));
  const cystatinCData = [1.31, 1.32, 1.32, 1.36, 1.34, 1.35, 1.42].map(val => parseFloat(val.toFixed(3)));
  const sodiumData = [143.1, 142.2, 143.3, 144.4, 143.5, 145.6, 149.7].map(val => parseFloat(val.toFixed(3)));
  const labels = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  // Create graphs with unique colors
  createChart('ureaGraph', 'Urea (mmol/L)', labels, ureaData, '#FF6384', 'rgba(255, 99, 132, 0.2)'); // Red
  createChart('creatinineGraph', 'Creatinine (µmol/L)', labels, creatinineData, '#36A2EB', 'rgba(54, 162, 235, 0.2)'); // Blue
  createChart('cystatinCGraph', 'Cystatin C (mg/L)', labels, cystatinCData, '#FFCE56', 'rgba(255, 206, 86, 0.2)'); // Yellow
  createChart('sodiumGraph', 'Sodium (mmol/L)', labels, sodiumData, '#4BC0C0', 'rgba(75, 192, 192, 0.2)'); // Teal
}

function createChart(canvasId, label, labels, data, borderColor, backgroundColor) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            drawBorder: false,
          },
        },
      },
    },
  });
}
