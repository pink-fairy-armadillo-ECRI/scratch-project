import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const rnColor = '#D3EEB6';
const nreColor = '#F77028';

const labelColor = 'rgb(200, 200, 200)';

// RE = Renewable Energy, NRE = Non-renewable Energy
const REvsNRE = (props) => {
  const chartData = useSelector(state => state.states.data);

  useEffect(() => {
    console.log(chartData);
    // Create or update the chart when the component mounts
    const ctx = document.getElementById('REvsNREChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Renewable Energy Generation', 'Non-Renewable Energy Generation'],
        datasets: [
          {
            label: 'Renewable Energy (RE)',
            data: [chartData.re * 100],
            borderColor: rnColor,
            backgroundColor: rnColor,
            borderWidth: 1,
            color: labelColor
          },
          {
            label: 'Non-renewable Energy (NRE)',
            data: [null, chartData.nre * 100],
            borderColor: nreColor,
            backgroundColor: nreColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
              color: labelColor
            },
            ticks: {
              color: labelColor
            }
          },
          y: {
            max: 100,
            min: 0,
            grid: {
              color: labelColor
            },
            ticks: {
              color: labelColor,
              callback: (value) => {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Percent Non-renewable vs Renewable Energy Generation by State',
            fontSize: 10,
            color: labelColor
          },
          tooltip: {
            callbacks: {
              // Modifies the info when hovering over data
              label: function (context) {
                const datasetLabel = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${datasetLabel}: ${value}%`;
              },
            },
          },
        },
      },
    });

    // Update the chart data when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, [chartData]); // dependency array; when the values change, the effect will run

  return(
    <div className="progressChart">
      {/* width="4" height="1" */}
      <canvas id="REvsNREChart"></canvas>
    </div>
  )
}

export default REvsNRE;