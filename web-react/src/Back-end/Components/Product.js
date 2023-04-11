import React, { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom"
import { alpha, Box, Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import visuallyHidden from "@mui/utils/visuallyHidden"
import PropTypes from 'prop-types';
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Noti from "./Noti"
import { useLocation } from "react-router-dom";

const AddProduct = (props) => {
  const [product_gender, setProduct_gender] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [product_brand, setProduct_brand] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_image, setProduct_image] = useState("");
  const [product_discount, setProduct_discount] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const handleAdd = (e) => {
    axios.post("http://localhost:8080/addproduct", { product_gender:product_gender, product_price:product_price, product_type:product_type, product_brand:product_brand, product_description:product_description, product_image:product_image, promotion_id:product_discount })
    .then((res) => {
      const timestamp = new Date();
        navigate('/admin/product', { state: { status:'success', action:'add', message: "Product Added Successful At "+timestamp.toLocaleString() } });
        window.location.reload();
        alert("Product Added!");
      })
    .catch((err) => {
      const timestamp = new Date();
      navigate('/admin/product', { state: { status:'error', action:'add', message: "Product Added Unsuccessful At "+timestamp.toLocaleString() } });
        window.location.reload();
    });
  };

  return (
    <>
    <Button variant="contained" onClick={() => setOpenAdd(!openAdd)}>
      Add Product
    </Button>
    <Dialog fullScreen open={openAdd} onClose={e=>setOpenAdd(!openAdd)} aria-labelledby="form-dialog-title">
    <Stack alignItems="center">
      <Box  sx={{ width:"100%", height:"100px", justifyContent: 'space-between', p: 5 }}>
        <Stack direction="row" alignItems="center">
        <IconButton onClick={e=>setOpenAdd(!openAdd)}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5"  sx={{ ml:5,flexGrow: 1 }}>Add product</Typography>
        </Stack>
      </Box>
      <Box sx={{ width:"50%", height:"80%", justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <FormControl fullWidth margin="1" style={{ padding: '20px' }}>
          <Grid container spacing={2} mb={5}>
            <Grid item xs={12} >
              <TextField required id="product_type" label="Product Type" value={product_type} onChange={(e) => setProduct_type(e.target.value)} fullWidth  margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_gender" label="Product Gender" value={product_gender} onChange={(e) => setProduct_gender(e.target.value)} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_brand" label="Product Brand" value={product_brand} onChange={(e) => setProduct_brand(e.target.value)}  fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_description" label="Product Description" value={product_description} onChange={(e) => setProduct_description(e.target.value)}  fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_price" label="Product Price" value={product_price} onChange={(e) => setProduct_price(e.target.value)} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_discount" label="Product Promotion" value={product_discount} onChange={(e) => setProduct_discount(e.target.value)} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_image" label="Product Image" value={product_image} onChange={(e) => setProduct_image(e.target.value)} fullWidth margin="normal" />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </FormControl>
      </Box>
      </Stack>
    </Dialog>
    </>
  );
}

const EditProduct = (props) => {
  const [product_price, setProduct_price] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_category, setProduct_category] = useState("");
  const [product_image, setProduct_image] = useState("");
  const [product_status, setProduct_status] = useState("");
  const [product_discount, setProduct_discount] = useState("");
  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
      <div>
        <TextField required id="product_price" label="Product Price" value={product_price} onChange={(e) => setProduct_price(e.target.value)} />
        <TextField required id="product_description" label="Product Description" value={product_description} onChange={(e) => setProduct_description(e.target.value)} />
        <TextField required id="product_category" label="Product Category" value={product_category} onChange={(e) => setProduct_category(e.target.value)} />
        <TextField required id="product_image" label="Product Image" value={product_image}  onChange={(e) => setProduct_image(e.target.value)} />
      </div>
    </Box>
  );
}

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

const Product = (props) => {
    const rows = props.data;
    const inventory = props.inventory;
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('product_id'); 
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchID, setSearchID] = useState("");
    const [searchBrand, setSearchBrand] = useState("");
    const [searchCat, setSearchCat] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [openEdit, setOpenEdit] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const filteredRows = (searchID === "" && searchBrand === "" && searchCat === "")
    ? (rows) // case 1: no search
    : (searchID === "") // case 2-6: search by brand, category, or both
      ? (searchBrand === "") // case 2-3: search by category or brand
        ? rows.filter((row) => row.product_type.toLowerCase().includes(searchCat.toLowerCase())) // case 2: search by category
        : (searchCat === "") // case 3-4: search by brand or both
          ? rows.filter((row) => row.product_brand.toLowerCase().includes(searchBrand.toLowerCase())) // case 3: search by brand
          : rows.filter((row) => row.product_brand.toLowerCase().includes(searchBrand.toLowerCase()) && row.product_type.toLowerCase().includes(searchCat.toLowerCase())) // case 4: search by brand and category
      : (searchBrand === "") // case 5-8: search by id, id and category, id and brand, or id, brand and category
        ? (searchCat === "") // case 5-6: search by id or id and category
          ? rows.filter((row) => row.product_id.toString().includes(searchID)) // case 5: search by id
          : rows.filter((row) => row.product_id.toString().includes(searchID) && row.product_type.toLowerCase().includes(searchCat.toLowerCase())) // case 6: search by id and category
        : (searchCat === "") // case 7-8: search by id and brand or id, brand and category
          ? rows.filter((row) => row.product_id.toString().includes(searchID) && row.product_brand.toLowerCase().includes(searchBrand.toLowerCase())) // case 7: search by id and brand
          : rows.filter((row) => row.product_id.toString().includes(searchID) && row.product_brand.toLowerCase().includes(searchBrand.toLowerCase()) && row.product_type.toLowerCase().includes(searchCat.toLowerCase()));// case 8: search by id, brand and category
    
    const pageRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
    const [openimgList, setOpenimgList] = useState(Array(filteredRows.length).fill(false));
    const [openstockList, setOpenstockList] = useState(Array(filteredRows.length).fill(false));
    const [openeditList, setOpeneditList] = useState(Array(filteredRows.length).fill(false));

    useEffect(() => {
      setCurrentPage(0);
    }, [searchBrand, searchCat, searchID]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
      
      setCurrentPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleDelete = (product_id) => {
      axios.delete("http://localhost:8080/productdetail/delete", { data:{ product_id: product_id }})
      .then((res) => {
        const timestamp = new Date();
        navigate('/admin/product', { state: { status:'success', action:'delete', message: "Product Delete Successful At "+timestamp.toLocaleString() } });
        alert("Product Deleted!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const createSortHandler = (property) => (event) => {
      handleRequestSort(event, property);
    };
    const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - filteredRows.length) : 0;

    const headCells = [
      {
        id: 'product_id',
        numeric: false,
        disablePadding: true,
        label: 'Product ID',
      },
      {
        id: 'product_gender',
        numeric: true,
        disablePadding: false,
        label: 'Gender',
      },
      {
        id: 'product_type',
        numeric: true,
        disablePadding: false,
        label: 'Type',
      },
      {
        id: 'product_brand',
        numeric: true,
        disablePadding: false,
        label: 'Brand',
      },
      {
        id: 'product_description',
        numeric: true,
        disablePadding: false,
        label: 'Description',
      },
      {
        id: 'product_price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
      },
      {
        id: 'product_urlimg',
        numeric: true,
        disablePadding: false,
        label: 'Image',
      }
    ];

    return(
    <Box sx={{ p: 2, width: '100%',backgroundColor:'white' }}>
      <Noti location={location}/>
      <Paper sx={{ mb:2,p: 2,width:"100%", height: "100%",fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', }}>
      <Typography component="h2" variant="h3" color="primary" >
        Product Management
      </Typography>
      </Paper>
        <Paper sx={{ width: '100%', mb: 2, elevation:10}}>
          <Grid container >
            <Grid item xs={4} sm={4} >
            <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
              <Typography variant="h8" >Brand</Typography>
              <TextField  value={searchBrand} onChange={(e) => setSearchBrand(e.target.value)} />
            </Stack>
            </Grid>
            <Grid item xs={4} sm={4}>
            <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
              <Typography variant="h8" >Product ID</Typography>
              <TextField value={searchID}  onChange={(e) => setSearchID(e.target.value)} />
            </Stack>
            </Grid>
            <Grid item xs={4} sm={4}>
            <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
              <Typography variant="h8">Category</Typography>
              <TextField value={searchCat}  onChange={(e) => setSearchCat(e.target.value)} />
            </Stack>
            </Grid>
          </Grid>
          </Paper>
        <Paper sx={{ p: 2, width: '100%', mb: 2, elevation:10 }} >
        <Grid container >
          <Grid item xs={4} sm={4}>
          <AddProduct/>
          </Grid>
            
          <Grid item xs={4} sm={4}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
                <Select value={orderBy} label="Order By" onChange={event=>handleRequestSort(event,event.target.value)} >
                  <MenuItem value={"product_id"}>Product ID</MenuItem>
                  <MenuItem value={"product_description"}>Name</MenuItem>
                </Select>
              </FormControl>
          </Grid>
        </Grid>
        
        </Paper>
        <Paper sx={{ p: 2, width: '100%', mb: 2 , elevation:10 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align='left' padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false} sx={{ maxWidth: '200px' }} >
                    <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)} >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const img = row.product_urlimg.replace(/\//g, "/");
                  return (
                    <>
                    <TableRow tabIndex={-1} key={row.product_id} >
                      <TableCell>
                        <IconButton size="small" onClick={() => { const openListCopy = [...openstockList]; openListCopy[index] = !openstockList[index]; setOpenstockList(openListCopy); }}>
                          {openstockList[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" >
                        {row.product_id}
                      </TableCell>
                      <TableCell align='left'><Typography >{row.product_gender}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_type}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_brand}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_description}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_price}</Typography></TableCell>
                      <TableCell onClick={() => { const openListCopy = [...openimgList]; openListCopy[index] = !openimgList[index]; setOpenimgList(openListCopy); }}>
                        <img href="#" src={img} style={dense ? { width: '50px' } : { width: '100px' }} />
                      </TableCell>
                      <Dialog open={openimgList[index]} onClose={() => {const openListCopy = [...openimgList];openListCopy[index] = false;setOpenimgList(openListCopy);}}>
                        <Paper sx={{ p: 2, width: '100%', elevation:10 }}>
                        <img src={img} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </Paper>
                      </Dialog>
                      <TableCell align='center'>
                        {openeditList[index] ? <Stack direction="row" spacing={1}><IconButton onClick={() => { const openListCopy = [...openeditList]; openListCopy[index] = !openeditList[index]; setOpeneditList(openListCopy); }}><EditIcon/></IconButton><IconButton id={row.product_id} onClick={e=>handleDelete(row.product_id)}><DeleteIcon >delete</DeleteIcon></IconButton></Stack>
                        :<IconButton onClick={() => { const openListCopy = [...openeditList]; openListCopy[index] = !openeditList[index]; setOpeneditList(openListCopy); }}><EditIcon/></IconButton>}
                        </TableCell>
                    </TableRow>
                    {openstockList[index] ? (
                      <TableRow key={row.product_id+" "+row.product_size}>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        {inventory.length === 0 ? (
                                <Typography variant="h3" color="text.secondary">Out of stock</Typography>
                            ) : (
                              <Collapse in={openstockList[index]} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                  <Typography variant="h6" gutterBottom component="div">
                                    Stock
                                  </Typography>
                                <Table size={dense ? 'small' : 'medium'} aria-label="stock">
                                <TableHead >
                                  <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Added Date</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                              {inventory.map((item) => {
                                if(item.product_id === row.product_id)
                                return (
                                  <TableRow key={""+item.product_id+item.size} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                    <TableCell align="left"><Typography>{item.product_id}</Typography></TableCell>
                                    <TableCell align="left"><Typography>{item.product_size}</Typography></TableCell>
                                    <TableCell align="left"><Typography>{item.product_quantity}</Typography></TableCell>
                                    <TableCell align="left"><Typography>{item.product_dateadd}</Typography></TableCell>
                                  </TableRow>
                                );})
                                }
                                </TableBody>
                              </Table>
                                </Box>
                              </Collapse>
                            )}
                            </TableCell>
                          </TableRow>
                        ) : null}
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={currentPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </Box>
    )
}
export default Product