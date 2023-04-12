import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Help.css'

function OrderStatus_search({ order }) { 
    const [status, setStatus] = useState({});

    useEffect (() => {
        //inStock transportation Delivry Succeed
        setStatus(order[0].order_status)
    },[])

  return (
    
    <div className='OrderStatus_search'>
        <Grid xs={12}>
            <h1>View or Manage Your Order</h1>
            {order.map((item) => (
                <div>
                    <h2>Order Number : {item.order_id}</h2>
                    <h2>Order Date : {new Date(item.order_date).toLocaleDateString()}</h2>
                    <h2>Order Status : {item.order_status}</h2>
                </div>
            ))}
        </Grid>
        <Grid xs={12} className='box_status'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {status === 'จ่ายแล้ว' ? (
                        <img className='icon_status' src='..\img\status\package.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\package.png' ></img>
                    )}
                    <h2>Payment</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'กำลังจัดส่ง' ? (
                        <img className='icon_status' src='..\img\status\order-fulfillment.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\order-fulfillment.png' ></img>
                    )}
                    <h2>Transportation</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'ยกเลิก' ? (
                        <img className='icon_status' src='..\img\status\fast-delivery.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\fast-delivery.png' ></img>
                    )}
                    <h2>Cancel</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'จัดส่งแล้ว' ? (
                        <img className='icon_status' src='..\img\status\location-pin.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\location-pin.png' ></img>
                    )}
                    <h2>Succeed</h2>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default OrderStatus_search