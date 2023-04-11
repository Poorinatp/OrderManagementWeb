import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './Help.css'
import { Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const [cus_id, setcus_id] = useState(localStorage.getItem('cus_id'));
  const [orders, setOrders] = useState([]);
  const [order_list, setorder_list] = useState([]);

    //ดึงข้องมูลจาก api http://localhost:8080/orderline/customer/id มาแสดง

    useEffect(() => {
      axios.get("http://localhost:8080/orderline/customer/" + cus_id)
        .then((response) => {
          setorder_list(response.data);
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    }, []);

    //ดึงข้องมูลจาก api http://localhost:8080/order มาแสดง
    useEffect(() => {
      axios.get("http://localhost:8080/order")
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    }, []);         

  const downloadInvoice = (order_id) => {
    axios.get("http://localhost:8080/taxinvoice/" + order_id, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "tax_invoice_order_"+order_id+".pdf");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
  }

  function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day} / ${month} / ${year}`;
}

//แสดงorder ที่สั่งซื้อ และแสดงรายการสินค้าที่สั่งซื้อ ตาม order_id 
//[{"order_id":1,"cus_id":3,"order_amount":3,"order_price":19500,"order_date":"2023-01-30T08:12:26.000Z","order_ShipMethod":"ems","order_status":"กำลังจัดส่ง"},{"order_id":2,"cus_id":3,"order_amount":1,"order_price":4946,"order_date":"2023-04-
return (
    <div className="order-history">
      <Container>
        {orders.map((order) => {
          if (order.cus_id == cus_id){
            return (
          <div className="order-history-box">
            <Grid container spacing={2} className='order-full-box'>
              <Grid item xs={6}className="order_text" >
                <h2>Order ID: {order.order_id}</h2>
                <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p>Order Amount: {order.order_amount}</p> 
                <p>Order Status: {order.order_status}</p>
                <p>Order ShipMethod: {order.order_ShipMethod}</p>
                <p>Order Price: {order.order_price}</p>
                <button onClick={() => downloadInvoice(order.order_id)}>Download Tax Invoice</button>
              </Grid>
              <Grid item xs={6} >
                {order_list.map((order_list) => {
                  if (order_list.order_id == order.order_id){
                    return (
                      <Grid container className="order-history-box">
                        <Grid xs = {6}>
                          <img  className='product_urlimg' src={order_list.product_urlimg} alt="product_image" />
                        </Grid>
                        <Grid xs = {6}>
                          <div className="product_text">
                          <p>{order_list.product_description}</p>
                          <p>Price: {order_list.product_price}</p>
                          <p>Quantity: {order_list.product_quantity}</p>
                          <p>Type: {order_list.product_type}</p>
                          <p>Size: {order_list.product_size}</p>
                          </div>
                        </Grid>
                    </Grid>
                    )
                  }
                })}
              </Grid>
            </Grid>
            <Divider/>
          </div>
          )
        }
        })}
      </Container>
      <Divider/>
    </div>



  )
}


export default OrderHistory