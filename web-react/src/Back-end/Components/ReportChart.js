import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ReportChart = (props) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const order = props.data;
  const type = props.type;
  useEffect(() => {
    if (type === 'Current month') {
      const currentMonthOrders = order.filter((order) => {
        const orderDate = new Date(order.order_date);
        const currentDate = new Date();
        return orderDate.getMonth() === currentDate.getMonth() && orderDate.getFullYear() === currentDate.getFullYear() && order.order_status!=='ยกเลิก';
      });
      console.log("this is "+type);
      const chartdata = currentMonthOrders ? currentMonthOrders:[];
      const sumnike = [0,0,0];
      const sumadidas = [0,0,0];
      const sumnewbalance = [0,0,0];
      const sumconverse = [0,0,0];
      for (var i = 0; i < chartdata.length; i++) {
        if (chartdata[i].product_brand.toLowerCase() === 'nike') {
          if (chartdata[i].product_type.toLowerCase() === 'shoes') {
            sumnike[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'cloth') {
            sumnike[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'accessories') {
            sumnike[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if (chartdata[i].product_brand.toLowerCase() === 'adidas') {
          if (chartdata[i].product_type.toLowerCase() === 'shoes') {
            sumadidas[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'cloth') {
            sumadidas[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'accessories') {
            sumadidas[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if (chartdata[i].product_brand.toLowerCase() === 'new balance') {
          if (chartdata[i].product_type.toLowerCase() === 'shoes') {
            sumnewbalance[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'cloth') {
            sumnewbalance[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'accessories') {
            sumnewbalance[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if (chartdata[i].product_brand.toLowerCase() === 'converse') {
          if (chartdata[i].product_type.toLowerCase() === 'shoes') {
            sumconverse[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'cloth') {
            sumconverse[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if (chartdata[i].product_type.toLowerCase() === 'accessories') {
            sumconverse[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else{
        }
      }
      const shoes = [sumnike[0],sumadidas[0],sumnewbalance[0],sumconverse[0]];
      const clothes = [sumnike[1],sumadidas[1],sumnewbalance[1],sumconverse[1]];
      const accessories = [sumnike[2],sumadidas[2],sumnewbalance[2],sumconverse[2]];

      setOptions({
      chart: {
        type: 'column',
        height: 350,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Current Month Sales',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val+" ฿"
          }
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Nike', 'Adidas', 'New Balance', 'Converse'],
      },
      fill: {
        opacity: 1
      }
    });
    setSeries([{
        name: 'Shoes',
        data: shoes
      }, {
        name: 'Clothes',
        data: clothes
      }, {
        name: 'Accessories',
        data: accessories
      }]);
    } else if (type === 'Last Quarter') {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentQuarter = Math.floor((currentDate.getMonth() / 3)) + 1;

      const lastQuarterStart = new Date(currentYear, (currentQuarter - 2) * 3, 1);
      const lastQuarterEnd = new Date(currentYear, (currentQuarter - 1) * 3, 0, 23, 59, 59, 999);

      const lastQuarterOrders = order.filter((order) => {
        const orderDate = new Date(order.order_date);
        return orderDate >= lastQuarterStart && orderDate <= lastQuarterEnd && order.order_status !== 'ยกเลิก';
      });
      const chartdata = lastQuarterOrders ? lastQuarterOrders:[];
    
      const sumnike = [0,0,0];
      const sumadidas = [0,0,0];
      const sumnewbalance = [0,0,0];
      const sumconverse = [0,0,0];
      for(let i=0;i<chartdata.length;i++){
        if(chartdata[i].product_brand.toLowerCase() === 'nike'){
          if(chartdata[i].order_date.substring(5,7) === '10'){
            sumnike[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '11'){
            sumnike[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '12'){
            sumnike[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'adidas'){
          if(chartdata[i].order_date.substring(5,7) === '10'){
            sumadidas[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '11'){
            sumadidas[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '12'){
            sumadidas[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'new balance'){
          if(chartdata[i].order_date.substring(5,7) === '10'){
            sumnewbalance[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '11'){
            sumnewbalance[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '12'){
            sumnewbalance[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'converse'){
          if(chartdata[i].order_date.substring(5,7) === '10'){
            sumconverse[0] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '11'){
            sumconverse[1] += chartdata[i].product_price*chartdata[i].product_amount;
          } else if(chartdata[i].order_date.substring(5,7) === '12'){
            sumconverse[2] += chartdata[i].product_price*chartdata[i].product_amount;
          }
        }
      }
      const nike = [sumnike[0],sumnike[1],sumnike[2]];
      const adidas = [sumadidas[0],sumadidas[1],sumadidas[2]];
      const newbalance = [sumnewbalance[0],sumnewbalance[1],sumnewbalance[2]];
      const converse = [sumconverse[0],sumconverse[1],sumconverse[2]];

      setOptions({
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Last Quarter Sales',
          align: 'center',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val+" ฿"
            }
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['October', 'November', 'December']
        },
        fill: {
          opacity: 1
        }
      });
      setSeries([{
          name: 'Nike',
          data: nike
        }, {
          name: 'Adidas',
          data: adidas
        }, {
          name: 'New Balance',
          data:  newbalance
        }, {
          name: 'Converse',
          data:  converse
        }]);
    } else if (type === 'Year-end sale') {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const yearEndSaleStart = new Date(currentYear, 0, 1);
      const yearEndSaleEnd = new Date(currentYear, 11, 31, 23, 59, 59, 999);

      const yearEndSaleOrders = order.filter((order) => {
        const orderDate = new Date(order.order_date);
        console.log(orderDate);
        console.log(yearEndSaleStart);
        console.log(yearEndSaleEnd);
        console.log(orderDate >= yearEndSaleStart);
        return orderDate >= yearEndSaleStart && orderDate <= yearEndSaleEnd && order.order_status !== 'ยกเลิก';
      }
      );
      const chartdata = yearEndSaleOrders ? yearEndSaleOrders:[];
      
      const sumnike = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumadidas = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumnewbalance = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumconverse = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(let i=0;i<chartdata.length;i++){
        if(chartdata[i].product_brand.toLowerCase() === 'nike'){
          for(let j=0;j<12;j++){
            if(j>=9){
              if(chartdata[i].order_date.substring(5,7) === (j+1).toString()){
                sumnike[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            } else {
              if(chartdata[i].order_date.substring(5,7) === 0+(j+1).toString()){
                sumnike[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            }
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'adidas'){
          for(let j=0;j<12;j++){
            if(j>=9){
              if(chartdata[i].order_date.substring(5,7) === (j+1).toString()){
                sumadidas[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            } else {
              if(chartdata[i].order_date.substring(5,7) === 0+(j+1).toString()){
                sumadidas[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            }
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'new balance'){
          for(let j=0;j<12;j++){
            if(j>=9){
              if(chartdata[i].order_date.substring(5,7) === (j+1).toString()){
                sumnewbalance[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            } else {
              if(chartdata[i].order_date.substring(5,7) === 0+(j+1).toString()){
                sumnewbalance[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            }
          }
        } else if(chartdata[i].product_brand.toLowerCase() === 'converse'){
          for(let j=0;j<12;j++){
            if(j>=9){
              if(chartdata[i].order_date.substring(5,7) === (j+1).toString()){
                sumconverse[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            } else {
              if(chartdata[i].order_date.substring(5,7) === 0+(j+1).toString()){
                sumconverse[j] += chartdata[i].product_price*chartdata[i].product_amount;
                break;
              }
            }
          }
        }
      }
      console.log(sumnike);
      const nike = [sumnike[0],sumnike[1],sumnike[2],sumnike[3],sumnike[4],sumnike[5],sumnike[6],sumnike[7],sumnike[8],sumnike[9],sumnike[10],sumnike[11]];
      const adidas = [sumadidas[0],sumadidas[1],sumadidas[2],sumadidas[3],sumadidas[4],sumadidas[5],sumadidas[6],sumadidas[7],sumadidas[8],sumadidas[9],sumadidas[10],sumadidas[11]];
      const newbalance = [sumnewbalance[0],sumnewbalance[1],sumnewbalance[2],sumnewbalance[3],sumnewbalance[4],sumnewbalance[5],sumnewbalance[6],sumnewbalance[7],sumnewbalance[8],sumnewbalance[9],sumnewbalance[10],sumnewbalance[11]];
      const converse = [sumconverse[0],sumconverse[1],sumconverse[2],sumconverse[3],sumconverse[4],sumconverse[5],sumconverse[6],sumconverse[7],sumconverse[8],sumconverse[9],sumconverse[10],sumconverse[11]];

      setOptions({
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Year-end Sales',
          align: 'center',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val+" ฿"
            }
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        fill: {
          opacity: 1
        }
      });
      setSeries([{
          name: 'Nike',
          data: nike
        }, {
          name: 'Adidas',
          data: adidas
        }, {
          name: 'New Balance',
          data:  newbalance
        }, {
          name: 'Converse',
          data:  converse
        }]);
    }
  }, []);
  return (
    <Paper sx={{ p: 2, width: '100%', mb: 2, elevation:24 }}>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    </Paper>
    );
}

export default ReportChart;
