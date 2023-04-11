import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './Help.css'
import { Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [cus_id, setcus_id] = useState(localStorage.getItem('cus_id'));
  const [orders, setOrders] = useState([]);

    //ดึงข้องมูลจาก api http://localhost:8080/orderline/customer/id มาแสดง
    useEffect(() => {
      axios.get("http://localhost:8080/orderline/customer/" + cus_id)
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


  return (
    <div className="order-history">
          {orders.map((order) => {
            if (order.cus_id == cus_id ) {
              return (
                <div className="order-history-item">
                  <tr key={order.order_id}>
                    <Grid container className="order-history-data">
                      <Grid xs={5}>      
                        <img src={order.product_urlimg} alt=' '></img>
                      </Grid>
                      <Grid xs={7}>
                       
                        <Grid className='order-history-details'>
                          <td><h1>Details</h1> </td>
                          <td><p>{order.order_price}</p></td>
                        </Grid>

                        <Grid className='order-history-details'>
                          <td><h1>Status </h1> </td>
                          <td><p>{order.order_status}</p></td>
                        </Grid>
                        
                        <Grid className='order-history-tax'>
                          <Link onClick={()=>downloadInvoice(order.order_id)} >Download Tax Invoice</Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </tr>
                <Divider/>
                </div>
              )
            }
          })}
    </div>



  )
}


export default OrderHistory