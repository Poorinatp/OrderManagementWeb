import { Container } from '@mui/system'
import React from 'react'
import './Help.css'
import { Grid } from '@mui/material'



// Product & Oder 002-344-23-1245 
// Chat with us Voyang@email.com /https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGMhgHfRdtZxqrWHvxjjvFBHGpXTddXHDCDnlcgcKLCkZqHMgxSDXzdRGFFNbfggxpgBLbf
// Store Location siam soi 6 https://goo.gl/maps/LnMmKBk7FkhLaG416

function ContactUs() {
  return (
    <div className='ContactUs'>   
      <h1>Contact Us</h1>

      <Grid container>
        <Grid item xs={4}>
          <img src="img/icon_phone.png" alt="phone icon" />
          <h2>
            Product & Order
          </h2>
          <a href="tel:002-344-23-1245">002-344-23-1245</a>
        </Grid>
        <Grid item xs={4}>
          <img src="img/icon_email.png" alt="email icon" />
          <h2>
            Chat with us
          </h2>
          <a href="mailto:Voyang@email.com">Contact Us</a>
        </Grid>
        <Grid item xs={4}>
          <img src="img/icon_location.png" alt="location icon" />
          <h2>
            Store Location
          </h2>
          <a href="https://goo.gl/maps/LnMmKBk7FkhLaG416" target="_blank">Siam Soi 6</a>
        </Grid>
      </Grid>
    </div>
  )
}


export default ContactUs