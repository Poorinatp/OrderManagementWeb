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
        console.log("order : "+orderDate.getMonth()+" "+orderDate.getFullYear()+" brand : "+order.product_brand);
        const currentDate = new Date();
        console.log("today :"+currentDate.getMonth());
        return orderDate.getMonth() === currentDate.getMonth() && orderDate.getFullYear() === currentDate.getFullYear() && order.order_status!=='ยกเลิก';
      });
      
      const chartdata = currentMonthOrders ? currentMonthOrders:[];
      const sumnike = [0,0,0];
      const sumadidas = [0,0,0];
      const sumnewbalance = [0,0,0];
      const sumconverse = [0,0,0];
      function updateMonthSales(brandSumArray, productType, productPrice, productAmount) {
        if (productType.toLowerCase() === 'shoes') {
          brandSumArray[0] += productPrice*productAmount;
        } else if (productType.toLowerCase() === 'cloth') {
          brandSumArray[1] += productPrice*productAmount;
        } else if (productType.toLowerCase() === 'accessories') {
          brandSumArray[2] += productPrice*productAmount;
        }
      }
        
      for (var i = 0; i < chartdata.length; i++) {
        const productBrand = chartdata[i].product_brand.toLowerCase();
        const productType = chartdata[i].product_type;
        const productPrice = chartdata[i].product_price;
        const productAmount = chartdata[i].product_amount;
        switch(productBrand) {
          case 'nike':
            updateMonthSales(sumnike, productType, productPrice, productAmount);  
            break;
          case 'adidas':
            updateMonthSales(sumadidas, productType, productPrice, productAmount);
            break;
          case 'newbalance':
            updateMonthSales(sumnewbalance, productType, productPrice, productAmount);
            break;
          case 'converse':
            updateMonthSales(sumconverse, productType, productPrice, productAmount);
            break;
          default:
            break;
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
      const categories = [];
      for(let i = 0; i < 3; i++) {
        const month = (lastQuarterStart.getMonth() + i) % 12; // calculate month index
        categories.push(new Date(2000, month, 1).toLocaleString('en-US', { month: 'long' })); // push month name
      }
      const lastQuarterOrders = order.filter((order) => {
        const orderDate = new Date(order.order_date);
        return orderDate >= lastQuarterStart && orderDate <= lastQuarterEnd && order.order_status !== 'ยกเลิก';
      });
      const chartdata = lastQuarterOrders ? lastQuarterOrders:[];

      
      const sumnike = [0,0,0];
      const sumadidas = [0,0,0];
      const sumnewbalance = [0,0,0];
      const sumconverse = [0,0,0];
      function updateQuarterlySales(brandSumArray, orderMonth, productAmount) {
        const lastQuarterStartMonth = lastQuarterStart.getMonth() + 1;
        const monthDifference = orderMonth - lastQuarterStartMonth;
        if(monthDifference >= 0 && monthDifference <= 2) {
            brandSumArray[monthDifference] += productAmount;
        }
    }
      for(let i=0; i<chartdata.length; i++){
        const orderMonth = chartdata[i].order_date.substring(5,7);
        const productBrand = chartdata[i].product_brand.toLowerCase();
        const productAmount = chartdata[i].product_price*chartdata[i].product_amount;
        switch(productBrand) {
            case 'nike':
                updateQuarterlySales(sumnike, orderMonth, productAmount);
                break;
            case 'adidas':
                updateQuarterlySales(sumadidas, orderMonth, productAmount);
                break;
            case 'newbalance':
                updateQuarterlySales(sumnewbalance, orderMonth, productAmount);
                break;
            case 'converse':
                updateQuarterlySales(sumconverse, orderMonth, productAmount);
                break;
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
          categories: categories,
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
        return orderDate >= yearEndSaleStart && orderDate <= yearEndSaleEnd && order.order_status !== 'ยกเลิก';
      }
      );
      const chartdata = yearEndSaleOrders ? yearEndSaleOrders:[];
      
      const sumnike = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumadidas = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumnewbalance = [0,0,0,0,0,0,0,0,0,0,0,0];
      const sumconverse = [0,0,0,0,0,0,0,0,0,0,0,0];
      function updateLastYearSales(brandSumArray, orderMonth, productAmount) {
        const orderMonthIndex = orderMonth - 1;
        brandSumArray[orderMonthIndex] += productAmount;
    }
      for(let i=0; i<chartdata.length; i++){
        const orderMonth = chartdata[i].order_date.substring(5,7);
        const productBrand = chartdata[i].product_brand.toLowerCase();
        const productAmount = chartdata[i].product_price*chartdata[i].product_amount;
        switch(productBrand) {
          case 'nike':
            updateLastYearSales(sumnike, orderMonth, productAmount);
            break;
          case 'adidas':
            updateLastYearSales(sumadidas, orderMonth, productAmount);
            break;
          case 'newbalance':
            updateLastYearSales(sumnewbalance, orderMonth, productAmount);
            break;
          case 'converse':
            updateLastYearSales(sumconverse, orderMonth, productAmount);
            break;
        }
    }

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
