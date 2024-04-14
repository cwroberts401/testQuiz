<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { scentVals } from '../stores'; // adjust the path as necessary
  
    let chartContainer; // This will reference the canvas element
  
    let myChart; // This will hold the chart instance
  
    // Function to initialize the chart
    function createChart(data) {
  myChart = new Chart(chartContainer, {
    type: 'radar',
    data: {
      labels: Object.keys(data.values), // Ensure 'data' contains only scent categories
      datasets: [{
        label: 'Scent Values',
        data: Object.values(data.values), // Ensure these are the values of the scents
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 10
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    }
  });
}
  
onMount(() => {
  // Subscribe to the store and update the chart with the 'current' part of the state
  const unsubscribe = scentVals.subscribe(value => {
    if (myChart) {
      myChart.destroy(); // Destroy the existing chart
    }
    createChart(value); // Pass only the 'current' data to the chart
  });

  return () => {
    unsubscribe();
    if (myChart) {
      myChart.destroy(); // Clean up the chart instance on component destruction
    }
  };
});

  </script>
  
  <canvas bind:this={chartContainer} style="width: 100px; height: 100px;"></canvas>
  