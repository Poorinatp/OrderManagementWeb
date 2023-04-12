import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Paper, Typography } from '@mui/material'

const SearchProduct = ({ search, products }) => {

    const searchResult = products.length !== 0 ?products.filter((item) => {
        return item.product_description.toLowerCase().includes(search.toLowerCase())
    }):[];

    function saveProductId(productId) {
        localStorage.setItem('productId', productId);
      }

    return (
        <Box sx={{padding:'100px'}}>
        <Grid container spacing={1}>
            {(searchResult).map((row,index) => (
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
        </Box>
    )
}

export default SearchProduct