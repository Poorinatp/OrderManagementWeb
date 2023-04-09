import { Box, Button, Grid, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductPage(props) {
  const location = useLocation();
    const [selectedFilter, setSelectedFilter] = useState(props.filter);
    const s = location.state?.selectedFilter;
    const [products, setProducts] = useState([]);
    
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
      const fetchTodos = async () => {
        const results  = await axios.get('http://localhost:8080/product_detail');
          try{
              setProducts(results.data);
          }catch(err){
              console.log(err);
          }
        }
        fetchTodos();
      },[]);
    
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

    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

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

    function saveProductId(productId) {
      localStorage.setItem('productId', productId);
    }

    return (
      <Box>
        <div>
        <Button onClick={e=>handleClick(e)} sx={{color:"primary",backgroundColor:"secondary",borderRadius:10,margin:2}}>
          <Typography variant="h5">Filter</Typography>
        </Button>
        <Stack direction="row" alignItems="center" sx={{color:"primary",backgroundColor:"secondary",borderRadius:10,margin:2}}>
          <Typography variant="h5">{selectedFilter.productBrand}</Typography>
          <Typography variant="h5">{selectedFilter.productType}</Typography>
          <Typography variant="h5">{selectedFilter.productGender}</Typography>
          <Typography variant="h5">{selectedFilter.productPromotion}</Typography>
        </Stack>
            </div>
            <Box sx={{ textColor:"primary" }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column",alignItems:'center',elevation:10 }}>
          {selectedFilter.productBrand===""
          ?<img src="/img/F.jpg" width='80%' alt="F" />
          :selectedFilter.productBrand==='Adidas'
            ?<img src="/img/Fad.jpg" width='80%' alt="Fad" />
            :selectedFilter.productBrand==='Nike'
              ?<img src="/img/FN.jpg" width='80%' alt="FN" />
              :selectedFilter.productBrand==='New Balance'
                ?<img src="/img/FNB.jpg" width='80%' alt="FNB" />
                :<img src="/img/FCon.jpg" width='80%' alt="Fad" />
          }
      </Paper>
      <Paper sx={{ mt:5, elevation: 10, marginBottom: 2 }}>
          <Grid container p={3} justifyContent="space-between" alignItems="center">
            <Grid item  sx={{ justifyContent: "flex-start" }}>
              <img src="/img/logoAdidas.png" width="100px" alt="logoAdidas" />
            </Grid>
            <Grid item  sx={{ justifyContent: "flex-end" }}>
            {/*<Stack direction="row" alignItems="center">
              <Typography>Sort by</Typography>
              <Select onChange={e=>handleSort(e.target.value)}>
                <MenuItem value="asc">Low to high</MenuItem>
                <MenuItem value="desc">High to low</MenuItem>
              </Select>
    </Stack>*/}
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
            {filteredRows.map((row,index) => (
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
