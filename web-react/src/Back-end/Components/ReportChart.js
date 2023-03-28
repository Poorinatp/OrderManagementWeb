import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ReportChart = (props) => {
    var options = {options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Nike', 'Adidas', 'Newbalance', 'Converse'],
        },
        yaxis: {
          title: {
            text: 'Order Price',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$' + val;
            },
          },
        },
      },
      series: [
        {
          name: 'Shoes',
          data: [10,20 ,30, 40],
        },
        {
          name: 'Clothes',
          data: [10,20 ,30, 40],
        },
        {
          name: 'Accessory',
          data: [10,20 ,30, 40],
        },
      ],
    };

      return (
        <div id="chart">
            <ReactApexChart options={options} series={options.series} type="bar" height={350} />
        </div>
        );
}

export default ReportChart;
