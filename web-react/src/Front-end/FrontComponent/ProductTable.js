import React, { useEffect, useState } from "react";
import axios from "axios";
import'./ProductTable.css';
import { Box, Button, Grid, MenuItem, Paper, Select, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";

const ProductTable = (props) => {
  const [products, setProducts] = useState(props.product);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  

  /*
  useEffect(() => {
    let filteredProducts = [...products];
    
    if (selectedFilter.productGender) {
      console.log(selectedFilter.productGender);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_gender === selectedFilter.productGender
      );
    }

    if (selectedFilter.productBrand) {
      console.log(selectedFilter.productBrand);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_brand === selectedFilter.productBrand
      );
    }

    if (selectedFilter.productType) {
      console.log(selectedFilter.productType);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_type === selectedFilter.productType
      );
    }

    if (selectedFilter.productPromotion) {
      console.log(selectedFilter.productPromotion);
      filteredProducts = filteredProducts.filter(
        (product) => product.promotion_id === selectedFilter.productPromotion
      );
    }

    setSortedProducts(filteredProducts);
  }, [selectedFilter, products]);*/
  useEffect(() => {
    setProducts(props.product);
  }, [props.product]);

  const handleSort = (order) => {
    if (order === "asc") {
      const sorted = [...sortedProducts].sort((a, b) => a.product_price - b.product_price);
      setSortedProducts(sorted);
      setSortOrder("asc");
    } else if (order === "desc") {
      const sorted = [...sortedProducts].sort((a, b) => b.product_price - a.product_price);
      setSortedProducts(sorted);
      setSortOrder("desc");
    }
    console.log(order)
  };
  
  return (
    <Box sx={{ textColor:"primary" }}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column",alignItems:'center',elevation:10 }}>
            <img src="/img/Fad.jpg" width='80%' alt="Fad" />
        </Paper>
        <Paper sx={{ mt:5, elevation: 10, marginBottom: 2 }}>
            <Grid container p={3} justifyContent="space-between" alignItems="center">
              <Grid item  sx={{ justifyContent: "flex-start" }}>
                <img src="/img/logoAdidas.png" width="100px" alt="logoAdidas" />
              </Grid>
              <Grid item  sx={{ justifyContent: "flex-end" }}>
              <Stack direction="row" alignItems="center">
                <Typography>Sort by</Typography>
                <Select onChange={e=>handleSort(e.target.value)}>
                  <MenuItem value="asc">Low to high</MenuItem>
                  <MenuItem value="desc">High to low</MenuItem>
                </Select>
              </Stack>
              </Grid>
            </Grid>
          </Paper>
      <Box sx={{padding:'100px'}}>
      <Stack spacing={2} >
      <Typography variant="h3">
        All Item
      </Typography>
      <Grid container spacing={1} >
        {products.map((row,index) => (
          <Grid key={"grid"+index} item xs={12} sm={6} md={4} lg={4}>
            <Paper key={"paper"+index} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <img style={{ width: '100%',maxHeight:'500px' }} src={row.product_urlimg} alt={row.product_descropton} />
              <Typography key={"description"+index}  variant="h8">
                {row.product_description}
              </Typography>
              <Typography key={"price"+index}>{row.product_price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </Stack>
        </Box>
        <div>
          
        </div>
    {/*<div className="product-container">
      <div className="sort-container">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={(e) => handleSort(e.target.value)}>
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="product-table">
        {filteredRows.map((product) => (
          <div key={product.product_id} className="product-card">
            <img className="product-img" src={product.product_urlimg} alt={product.product_descropton} />
            <div className="product-name">{product.product_description}</div>
            <div className="product-price">{product.product_price}</div>
          </div>
        ))}
      </div>
        </div>*/}
      </Box>
  );
};

export default ProductTable;
