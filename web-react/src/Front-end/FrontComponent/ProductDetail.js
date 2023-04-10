import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ProductDetail.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const api = 'http://localhost:8080/';

function ProductDetail( props ) {
  const id = localStorage.getItem('productId');
  const [product, setProduct] = useState({});
  const [inventory, setInventory] = useState({});
  const [selectedSize, setSelectedSize] = useState('');

  //console.log(id);
  //=============================================== productdetail ==================================================
  useEffect(() => {
    axios.get(api+"productdetail/"+id)
      .then(response => {
        const data_product = response.data[0];
        setProduct(data_product);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

 //=============================================== productinventory ==================================================
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(api + 'productinventory/' + id)
      .then(response => {
        setData(response.data);
        // setSizes(data.product_size.split(',').map(s => s.trim()));
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  //==================================================== cart =======================================================

  const addToCart = () => {
    const quantity = data.find((item) => item.product_size === selectedSize)?.product_quatity;
  
    console.log("selectedSize: " + selectedSize);
    console.log("quantity: " + quantity);
  
    if (quantity === 0) {
      alert('สินค้าหมดแล้ว');
    } else {
      const cartItem = {
        product_id: product.product_id,
        product_name: product.product_description,
        product_price: product.product_price,
        product_size: selectedSize,
        product_qty: 1,
        product_img: product.product_urlimg,
        product_brand: product.product_brand,
        selected: false
      };
      // Update cart state and localStorage
      props.setCart([...props.cart, cartItem]);
      localStorage.setItem('cart', JSON.stringify([...props.cart, cartItem]));
    }
  };
  

  const payNow = () => {
    addToCart();
    // open
    props.setOpenCart(true);
  };

  

  return (
    <div className='ProductDetail'>
      {product !== null ? (
        <div>
            <Grid container className='container'>
                <Grid item xs={5} className='left-box'>
                    <img src={product.product_urlimg} alt={product.product_description} />
                    <div className='description'>
                      <p>Name: {product.product_description}</p>
                      <p>Brand: {product.product_brand}</p>
                      <p>Gender: {product.product_gender}</p>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <Grid container className='container-price'>
                        <Grid item xs={5}>
                            <h2>Price</h2>
                        </Grid>
                        <Grid item xs={7}>
                            <h3>฿ {product.product_price}</h3>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <h2>Size</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className='selectedSize'>
                        <Select
                          value={selectedSize}
                          onChange={handleSizeChange}
                        >
                          <MenuItem value='' disabled>Select a size</MenuItem>
                          {data.map((item, index) => (
                            <MenuItem 
                              key={index} 
                              value={item.product_size} 
                              disabled={item.product_quatity === 0}
                            >
                              US {item.product_size}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                    </Grid>
                    <div className='buttonProduct'> 
                      <Grid item xs={12} >
                      <Button 
                        variant="contained" 
                        onClick={addToCart} 
                        className='add'
                        disabled={selectedSize === ''}
                      >
                        Add to Cart
                      </Button>

                      </Grid>
                      <Grid item xs={12} >
                            <Button variant="contained"  onClick={payNow} className='pay' disabled={selectedSize === ''}>
                              Pay Now
                            </Button>
                      </Grid>
                    </div>

                </Grid>
            </Grid>
      
        </div>
      ) : (
        <p>Can't find the product...</p>
      )}
    </div>
  );
}

export default ProductDetail;