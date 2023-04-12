import { Container } from '@mui/system'
import React,{ useEffect, useState } from 'react'
import './Help.css'
import { Box, Grid, TextField } from '@mui/material'
import OrderStatus_search from './OrderStatus_search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//View or Manage Your Order
// to check the status of your order,or to start a return , please enter your order number ;

function OrderStatus({ order, setOrder}) {

  // สร้าง  useEffft api get cus_id by email api http://localhost:8080/checkemail/:emal
  
  const [email, setemail] = useState('');
  const [orderNumber, setorderNumber] = useState('');
  const navigate = useNavigate();
  const handlesubmit = () => {
    console.log(email);
    console.log(orderNumber);
    axios.post("http://localhost:8080/orderlinestatus/", {email: email, order_id: orderNumber })
    .then((res) => {
      if(res.status === 200){
        console.log(res.data);
        setOrder(res.data);
        navigate('/OrderStatussearch');
      }else{
        alert(res.data.message);
      }
    })
    .catch((err) => {
      alert(err.response.data.message);
    }
    )
  }

  return (
    <div className='OrderStatus'>   
      <h1>View or Manage Your Order</h1>
      <p>To check the status of your order </p>
      <p>or to start a return </p>
      <p>please enter your order number </p>
      <Grid xs={12}>
        <TextField
            required
            id="orderNumber"
            label="orderNumber"
            onChange={(e) => setorderNumber(e.target.value)}
          />
          </Grid>
          <Grid xs={12}>
          <TextField
            required
            id="emailAddress"
            label="Email Address"
            onChange={(e) => setemail(e.target.value)}
          />
           </Grid>
          <Grid xs={12}>
            <button onClick={handlesubmit}>Submit</button>
          </Grid>
    </div>
  )
}

export default OrderStatus