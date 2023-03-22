import React, { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom"
import { alpha, Box, Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Paper, Select, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import MyOption from "./MyOption"
import visuallyHidden from "@mui/utils/visuallyHidden"
import PropTypes from 'prop-types';
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import Noti from "./Noti"
import { useLocation } from "react-router-dom";

const AddProduct = (props) => {
  const [product_price, setProduct_price] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [product_brand, setProduct_brand] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_image, setProduct_image] = useState("");
  const [product_discount, setProduct_discount] = useState("");
  const navigate = useNavigate();
  const handleAdd = (e) => {
    axios.post("http://localhost:8080/addproduct", { product_price:product_price, product_type:product_type, product_brand:product_brand, product_description:product_description, product_image:product_image, product_discount:product_discount })
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
    <FormControl fullWidth margin="1" style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField required id="product_type" label="Product Type" value={product_type} onChange={(e) => setProduct_type(e.target.value)} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="product_brand" label="Product Brand" value={product_brand} onChange={(e) => setProduct_brand(e.target.value)} fullWidth margin="normal" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <TextField required id="product_description" label="Product Description" value={product_description} onChange={(e) => setProduct_description(e.target.value)} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField required id="product_price" label="Product Price" value={product_price} onChange={(e) => setProduct_price(e.target.value)} fullWidth margin="normal" />
        </Grid>
      </Grid>
      <TextField required id="product_image" label="Product Image" value={product_image} onChange={(e) => setProduct_image(e.target.value)} margin="normal" />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </FormControl>
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



function SelectedTool(props) {
    const { numSelected } = props;
    const selected = props.selected;
    const [showFilters, setShowFilters] = useState(false);
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [productQuantities, setProductQuantities] = useState([]);
    const navigate = useNavigate();

    const handleShowFilters = () => {
      setShowFilters(!showFilters);
    };
    const handleDelete = () => {
      console.log(selected);
      axios.delete("http://localhost:8080/productinventory/deletemultiple", { data:{ product_id_list: selected }})
      .then((res) => {
        const timestamp = new Date();
        console.log(res.data.array);
        alert("Product Deleted!"+res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    };

    const handleAddStock = () => {
      //console.log(selected);
      //combine selected, size and quantity
      const data = selected.map((product_id) => {
        return {
          product_id: product_id,
          size: productSizes[product_id],
          quantity: productQuantities[product_id],
        };
      });
      //console.log(data);
      
      axios.post("http://localhost:8080/productinventory/addmultiple", data)
      .then((res) => {
        const timestamp = new Date();
        //navigate('/admin/product', { state: { status:'success', action:'add', message: "Product Stock Added Successful At "+timestamp.toLocaleString() } });
        //window.location.reload();
        console.log(res.array);
        alert("Product Stock Added!");
        setOpen(false);
        setProductSizes({});
        setProductQuantities({});
      })
      .catch((err) => {
        console.log(err);
      });
    };

    const handleSizeChange = (event, productId) => {
      setProductSizes({ ...productSizes, [productId]: event.target.value });
    };
  
    const handleQuantityChange = (event, productId) => {
      setProductQuantities({ ...productQuantities, [productId]: event.target.value });
    };
    

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add stock</DialogTitle>
          <DialogContent>
            {selected.map((item) => {
              return(
              <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                <Typography>Product ID:{item}</Typography>
                <TextField id={`size-${item}`} value={productSizes[item]} onChange={(e) => handleSizeChange(e, item)} />
                <TextField id={`quantity-${item}`} value={productQuantities[item]} onChange={(e) => handleQuantityChange(e, item)} />
              </Paper>)
            })}
          </DialogContent>
        <DialogActions>
          <Button onClick={handleAddStock}>Add</Button>
        </DialogActions>
      </Dialog>
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div" >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" cus_id="tableTitle" component="div" >
            Product
          </Typography>
        )}
        {numSelected > 0 ? (
          <Stack direction="row" spacing={2}>
          <Tooltip title="Add Stock" onClick={e=>setOpen(true)}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Product" onClick={handleDelete}>
            <IconButton >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleShowFilters}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
}

SelectedTool.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
    const [openAdd, setOpenAdd] = useState(false);
    
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
    }, [filteredRows]);

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

    const handleDelete = (event) => {
      axios.delete("http://localhost:8080/productinventory/delete", { data:{ product_id: event.target.id }})
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
            <Button variant="contained" onClick={() => setOpenAdd(!openAdd)}>
              {openAdd ? 'Close' : 'Add Product'}
            </Button>
          </Grid>
          <Grid item xs={4} sm={4}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={orderBy} label="Order By" onChange={event=>handleRequestSort(event,event.target.value)} >
              <MenuItem value={"product_id"}>Product ID</MenuItem>
              <MenuItem value={"product_description"}>Name</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        <Grid item xs={12} sm={12}>
        {openAdd&&<AddProduct/>}
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
                        {openeditList[index] ? <Stack direction="row" spacing={1}><IconButton onClick={() => { const openListCopy = [...openeditList]; openListCopy[index] = !openeditList[index]; setOpeneditList(openListCopy); }}><EditIcon/></IconButton><Button id={row.product_id} onClick={handleDelete}>delete</Button></Stack>
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
                                    <TableCell align="left"><TextField value={item.product_quantity}></TextField></TableCell>
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