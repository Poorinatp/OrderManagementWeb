import { Box, Button, Grid, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductPage({products,filter}) {
  const location = useLocation();
    const [selectedFilter, setSelectedFilter] = useState(filter);
    
    const filteredRows = (selectedFilter.productGender === "" && selectedFilter.productBrand === "" && selectedFilter.productType === "" && selectedFilter.productPromotion === "")
    ? (products) // case 1: no search
    : (selectedFilter.productGender === "") // case 2-6: search by brand, type, or both
      ? (selectedFilter.productBrand === "") // case 2-3: search by type or brand
        ? (selectedFilter.productType === "")
          ? products.filter((row) => row.promotion_id ===selectedFilter.productPromotion) // case 2: search by type
          : (selectedFilter.productPromotion === "")
            ? products.filter((row) => row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 3: search by brand
            : products.filter((row) => row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion) // case 4: search by type and brand
        : (selectedFilter.productType === "") // case 5-6: search by brand or both
          ? (selectedFilter.productPromotion === "")
            ? products.filter((row) => row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase())) // case 5: search by brand
            : products.filter((row) => row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion) // case 6: search by brand and type
          : (selectedFilter.productPromotion === "") // case 7-8: search by type or both
            ? products.filter((row) => row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 7: search by type and brand
            : products.filter((row) => row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion) // case 8: search by type, brand, and promotion
      :(selectedFilter.productBrand === "")
        ? (selectedFilter.productType === "")
          ? (selectedFilter.productPromotion === "")
            ? products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex"))) // case 9:serach by gender
            : products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.promotion_id ===selectedFilter.productPromotion)// case 10: search by gender and promotion
          : (selectedFilter.productPromotion === "")
            ? products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 11: search by gender and type
            : products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion)// case 12: search by gender,type and promotion
        : (selectedFilter.productType === "")
          ? (selectedFilter.productPromotion === "")
            ? products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase())) // case 13: search by gender and brand
            : products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion) // case 14: search by gender, brand and promotion
          : (selectedFilter.productPromotion === "")
            ? products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 15: search by gender, brand and type
            // case 16: search by gender, brand, type and promotion
            : products.filter((row) => (row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) || (row.product_gender === "Unisex")) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id === selectedFilter.productPromotion);
    
    
    const [filteredProducts, setFilteredProducts] = useState(filteredRows);

    useEffect(() => {
      //setFilteredProducts(filteredRows);
    }, [filteredRows]);

    const handleClick = (event) => {
      setSelectedFilter({
        productBrand: "Adidas",
        productType: "shoes",
        productGender: "M",
        productPromotion: 1,
        });
    };

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('product_id'); 

    // sort filteredRows by price
    
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } 
    
    const handleRequestSort = (event, property) => {
      // sort low to high or high to low
      setOrder(order === 'desc' ? 'asc' : 'desc');
      setOrderBy("product_price");
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

    function saveProductId(productId) {
      localStorage.setItem('productId', productId);
    }

    return (
      <Box>
        <div>
        {/* <Button onClick={e=>handleClick(e)} sx={{color:"primary",backgroundColor:"secondary",borderRadius:10,margin:2}}>
          <Typography variant="h5">Filter</Typography>
        </Button> */}
        {/* <Stack direction="row" alignItems="center" sx={{color:"primary",backgroundColor:"secondary",borderRadius:10,margin:2}}>
          <Typography variant="h5">{selectedFilter.productBrand}</Typography>
          <Typography variant="h5">{selectedFilter.productType}</Typography>
          <Typography variant="h5">{selectedFilter.productGender}</Typography>
          <Typography variant="h5">{selectedFilter.productPromotion}</Typography>
        </Stack> */}
            </div>
            <Box sx={{ textColor:"primary" }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column",alignItems:'center',elevation:10 }}>
          {selectedFilter.productBrand===""
          ?<img src="/img/F.jpg" width='80%' alt="F" />
          :selectedFilter.productBrand==='Adidas'
            ?<img src="/img/Fad.jpg" width='80%' alt="Fad" />
            :selectedFilter.productBrand==='Nike'
              ?<img src="/img/Fnk.jpg" width='80%' alt="FN" />
              :selectedFilter.productBrand==='Newbalance'
                ?<img src="/img/FNb.jpg" width='80%' alt="FNB" />
                :<img src="/img/FCon.jpg" width='80%' alt="Fad" />
          }
      </Paper>
      <Paper sx={{ mt:5, elevation: 10, marginBottom: 2 }}>
          <Grid container p={3} justifyContent="space-between" alignItems="center">
            <Grid item  sx={{ justifyContent: "flex-end" }}>
              <Stack direction="row" alignItems="center">
                <Typography>Sort by</Typography>
                <Select value={orderBy} label="Order By" onChange={event=>handleRequestSort(event,event.target.value)} >
                  <MenuItem value={"desc"}>Low to High</MenuItem>
                  <MenuItem value={"asc"}>High to Low</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      <Box sx={{padding:'100px'}}>
        <Stack spacing={2} >
          <Typography key="typography" color="#000000" variant="h3"  sx={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }} >
            {selectedFilter.productBrand===""
            ?(selectedFilter.productType===""
              ?"All item"
              :selectedFilter.productType+" For " + (selectedFilter.productGender==="M"
                ?"Men"
                :"Women"))
            :selectedFilter.productBrand+(selectedFilter.productType===""
              ?"All item"
              :" "+selectedFilter.productType+" For " + (selectedFilter.productGender==="M"
                ?"Men"
                :"Women"))}

          </Typography>
          {/* <Grid container spacing={1} >
            {filteredRows.map((row,index) => (
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
          </Grid> */}
        
         
          <Grid container spacing={1}>
            {stableSort(filteredRows, getComparator(order, orderBy)).map((row,index) => (
              <Grid key={"grid"+index} item xs={12} sm={6} md={4} lg={4}>
                <Link to={`/Product`}  key={`link${index}`} onClick={() => saveProductId(row.product_id)} >
                  <Paper key={"paper"+index} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <img style={{ width: '100%',maxHeight:'500px' }} src={row.product_urlimg} alt={row.product_description} />
                    <Typography key={"description"+index} variant="h8">
                      {row.product_description}
                    </Typography>
                    <Typography key={"price"+index}>{row.product_price}</Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>

          </Stack>
        </Box>
      </Box>
      
      </Box>
    );
  }
  

export default ProductPage;
