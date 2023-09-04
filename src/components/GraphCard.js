import React, { Component } from 'react';
import Chart from 'chart.js';
import '../css/GraphCard.css';

class GraphCard extends Component {
  chartRef = React.createRef();
  chartInstance = null;

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showGraphData && prevProps.graphData !== this.props.graphData) {
      this.updateChart();
    }
  }

  createChart() {
    const { graphData } = this.props;
    const lowOrHighColor = graphData.y_axis[0] < graphData.y_axis[graphData.y_axis.length - 1] ? '#81b737' : '#d54f4f';

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'point',
        },
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
          },
        },
        y: {
          display: true,
          stepSize: 5,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const ctx = this.chartRef.current.getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: graphData.x_axis,
        datasets: [
          {
            data: graphData.y_axis,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: lowOrHighColor,
            borderWidth: 2, 
          },
        ],
      },
      options: chartOptions,
    });

   
    this.chartRef.current.addEventListener('mouseenter', this.handleMouseEnter);
    this.chartRef.current.addEventListener('mouseleave', this.handleMouseLeave);
  }

  updateChart() {
    const { graphData } = this.props;
    this.chartInstance.data.labels = graphData.x_axis;
    this.chartInstance.data.datasets[0].data = graphData.y_axis;
    this.chartInstance.update();
  }

  handleMouseEnter = () => {
    if (this.chartInstance) {
      const dataset = this.chartInstance.data.datasets[0];
      dataset.borderColor = 'rgba(255, 99, 132, 1)';
      dataset.borderWidth = 3;
      this.chartInstance.update({ duration: 200, easing: 'linear' });
    }
  };

  handleMouseLeave = () => {
    if (this.chartInstance) {
      const dataset = this.chartInstance.data.datasets[0];
      dataset.borderColor = 'rgba(129, 183, 55, 1)';
      dataset.borderWidth = 2;
      this.chartInstance.update({ duration: 200, easing: 'linear' });
    }
  };

  convertToDate = (str) => {
    const date = new Date(str);
    const mnth = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${mnth}-${day}`;
  };

  render() {
    const { graphData } = this.props;
    return (
      <div className="main__chart" id={`myChart-${graphData.stockValue}`}>
        <div>
          <h2 className="h5 mb-3 stockValue">
            {graphData.stockValue}
            {graphData.date_data ? (
              <div className="ml-2 d-inline">
                <span>
                  (
                  {this.convertToDate(graphData.date_data.filteredStartDate)}&nbsp;to&nbsp;
                  {this.convertToDate(graphData.date_data.filteredEndDate)}
                  )
                </span>
              </div>
            ) : (
              <div className="ml-2 d-inline">(Last 72 Hours)</div>
            )}
          </h2>
          <canvas className="myChart" ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

export default GraphCard;
