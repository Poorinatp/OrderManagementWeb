import axios from 'axios';
import React, { useEffect, useState } from 'react';

const api = 'http://localhost:8080/product_detail';

function ProductDetail() {
  const id = localStorage.getItem('productId');
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`${api}/${id}`)
      .then(response => {
        const data_product = response.data[0];
        setProduct(data_product);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
    
  return (
    <div>
      {Object.keys(product).length !== 0 ? (
        <>
          <h2>{product.product_name}</h2>
          <p>{product.product_description}</p>
          <p>{product.product_price}</p>
          <img src={product.product_urlimg} alt={product.product_description} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
