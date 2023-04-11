import { Container } from '@mui/system'
import React from 'react'
import './Help.css'
import { Box, TextField } from '@mui/material'
import OrderStatus_search from './OrderStatus_search'

//View or Manage Your Order
// to check the status of your order,or to start a return , please enter your order number ;

function OrderStatus() {
  
  return (
    <div className='OrderStatus'>   
      <h1>View or Manage Your Order</h1>
      <p>To check the status of your order </p>
      <p>or to start a return </p>
      <p>please enter your order number </p>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '300px' },
        }}
        noValidate
        autoComplete="off"
        >
        <TextField
            required
            id="orderNumber"
            label="orderNumber"
          />
          <TextField
            required
            id="emailAddress"
            label="Email Address"
          />
          <button type="submit">Submit</button>
        </Box>
    </div>
  )
}

export default OrderStatus