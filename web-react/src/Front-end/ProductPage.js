import { Button, Paper, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductTable from './FrontComponent/ProductTable';

function ProductPage() {
  const location = useLocation();
    const [selectedFilter, setSelectedFilter] = useState(
      location.state? location.state.selectedFilter :{
        productType: '',
        productGender: '',
        productBrand: '',
        productPromotion: '',
      }
    );
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
            ? products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase())) // case 9:serach by gender
            : products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion)// case 10: search by gender and promotion
          : (selectedFilter.productPromotion === "")
            ? products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 11: search by gender and type
            : products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion)// case 12: search by gender,type and promotion
        : (selectedFilter.productType === "")
          ? (selectedFilter.productPromotion === "")
            ? products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase())) // case 13: search by gender and brand
            : products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.promotion_id ===selectedFilter.productPromotion) // case 14: search by gender, brand and promotion
          : (selectedFilter.productPromotion === "")
            ? products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase())) // case 15: search by gender, brand and type
            // case 16: search by gender, brand, type and promotion
            : products.filter((row) => row.product_gender.toLowerCase().includes(selectedFilter.productGender.toLowerCase()) && row.product_brand.toLowerCase().includes(selectedFilter.productBrand.toLowerCase()) && row.product_type.toLowerCase().includes(selectedFilter.productType.toLowerCase()) && row.promotion_id === selectedFilter.productPromotion);
    
    
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

    useEffect(() => {
      location.state?setSelectedFilter(location.state.selectedFilter):(setSelectedFilter({
        productBrand: "",
        productType: "",
        productGender: "",
        productPromotion: "",
        })
        );
      console.log(location.state);
    }, [location.state]);

    /*if (!selectedFilter) {
      return <div>Error: No filter selected.</div>;
    }*/
    const handleClick = (event) => {
      setSelectedFilter({
        productBrand: "Nike",
        productType: "shoes",
        productGender: "M",
        productPromotion: 2,
        });
      //console.log(selectedFilter)
    };
    return (
      <div>
        <div>
        <Button onClick={e=>handleClick(e)} sx={{color:"primary",backgroundColor:"secondary",borderRadius:10,margin:2}}>
          <Typography variant="h5">Filter</Typography>
        </Button>
        <Paper sx={{width:'100%',textAlign:'right'}}>
            <h1>
                {s.productBrand}
            </h1>
            <h1>
                {s.productType}
            </h1>
            <h1>
                {s.productGender}
            </h1>
            <h1>
                {s.productPromotion}
            </h1>
        </Paper>
            </div>
            {location.pathname === '/ProductPage/productTable' && <ProductTable selectedFilter={selectedFilter} product={filteredRows} />}
      </div>
    );
  }
  

export default ProductPage;
