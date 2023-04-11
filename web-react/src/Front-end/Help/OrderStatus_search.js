import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Help.css'

function OrderStatus_search( ) { 
    const [status, setStatus] = useState({});

    useEffect (() => {
        //inStock transportation Delivry Succeed
        setStatus('Succeed')
    },[])

  return (
    
    <div className='OrderStatus_search'>
        <Grid xs={12}>
            <h1>Viw or Manage Your Order</h1>
            <div className='box_orderStatus_search' >
                <p>order number : 24512451214</p>
                <p>recipient name : kim</p>
                <p>status : Succeed</p>
            </div>
        </Grid>
        <Grid xs={12} className='box_status'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {status === 'inStock' ? (
                        <img className='icon_status' src='..\img\status\package.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\package.png' ></img>
                    )}
                    <h2>Get in the system</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'transportation' ? (
                        <img className='icon_status' src='..\img\status\order-fulfillment.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\order-fulfillment.png' ></img>
                    )}
                    <h2>Deing transportation</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'Delivry' ? (
                        <img className='icon_status' src='..\img\status\fast-delivery.png'></img>
                    ) : (
                        <img className='icon_status_none' src='..\img\status\fast-delivery.png' ></img>
                    )}
                    <h2>Delivry</h2>
                </Grid>
                <Grid item xs={3}>
                    {status === 'Succeed' ? (
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