import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'

const SearchProduct = ({ search, products }) => {

    const searchResult = products.length !== 0 ?products.filter((item) => {
        return item.product_description.toLowerCase().includes(search.toLowerCase())
    }):[];

    function saveProductId(productId) {
        localStorage.setItem('productId', productId);
      }
      const [order, setOrder] = useState('desc');
      const [orderBy, setOrderBy] = useState('product_price'); 
  
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
    return (
        <Box sx={{padding:'100px'}}>
          <Typography variant="h3" component="h3" sx={{ p:2, mt: 2, mb: 2, textShadow: '1px 1px 1px rgba(0,0,0,0.5)', textAlign:'left' }}>
            Searching for "{search}"
          </Typography>
          <Paper sx={{ p: 2, mb:5, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Typography sx={{ mr: 3}}>Sort by</Typography>
            <Select value={order} label="Order By" onChange={event=>handleRequestSort(event,event.target.value)} >
              <MenuItem value={"desc"}>High to Low</MenuItem>
              <MenuItem value={"asc"}>Low to High</MenuItem>
            </Select>
          </Paper>
        <Grid container spacing={1}>
            {stableSort(searchResult, getComparator(order, orderBy)).map((row,index) => (
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