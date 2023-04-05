import React, { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom"
import { alpha, Box, Button, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import MyOption from "./MyOption"
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
    const [product_id, setproduct_id] = useState("");
    const [product_size, setproduct_size] = useState("");
    const [product_quantity, setproduct_quantity] = useState("");
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate();
    const handleAdd = (e) => {
        axios.post("http://localhost:8080/productinventory/add", {
            product_id: product_id,
            product_size: product_size,
            product_quantity: product_quantity,
        }).then((res) => {
            const timestamp = new Date();
            navigate('/admin/stock', { state: { status:'success', action:'add', message: "Product Stock Added Successful At "+timestamp.toLocaleString() } });
            window.location.reload();
            alert("Product Stock Added!");
        }
        ).catch((err) => {
            console.log(err);
        }
        );
      };

  return (
    <>
    <Button variant="contained" onClick={() => setOpenAdd(!openAdd)}>
      Add Stock
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
              <TextField required id="product_id" label="Product ID" value={product_id} onChange={(e) => setproduct_id(e.target.value)} fullWidth  margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_size" label="Product Size" value={product_size} onChange={(e) => setproduct_size(e.target.value)} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="product_quantity" label="Product Quantity" value={product_quantity} onChange={(e) => setproduct_quantity(e.target.value)}  fullWidth margin="normal" />
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
};

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

const Stock = (props) => {
    const rows = props.data;
    const inventory = props.inventory;
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('product_id'); 
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchPID, setSearchPID] = useState("");
    const [searchSize, setSearchSize] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    
    const navigate = useNavigate();
    const location = useLocation();

    const filteredRows = (searchPID === "" && searchSize === "" && searchDate === "")
    ? (rows) // case 1: no search
    : (searchPID === "") // case 2-6: search by brand, category, or both
      ? (searchSize === "") // case 2-3: search by category or brand
        ? rows.filter((row) => row.product_dateadd.toLowerCase().includes(searchDate.toLowerCase())) // case 2: search by category
        : (searchDate === "") // case 3-4: search by brand or both
          ? rows.filter((row) => row.product_size.toLowerCase().includes(searchSize.toLowerCase())) // case 3: search by brand
          : rows.filter((row) => row.product_size.toLowerCase().includes(searchSize.toLowerCase()) && row.product_dateadd.toLowerCase().includes(searchDate.toLowerCase())) // case 4: search by brand and category
      : (searchSize === "") // case 5-8: search by id, id and category, id and brand, or id, brand and category
        ? (searchDate === "") // case 5-6: search by id or id and category
          ? rows.filter((row) => row.product_id.toString().includes(searchPID)) // case 5: search by id
          : rows.filter((row) => row.product_id.toString().includes(searchPID) && row.product_dateadd.toLowerCase().includes(searchDate.toLowerCase())) // case 6: search by id and category
        : (searchDate === "") // case 7-8: search by id and brand or id, brand and category
          ? rows.filter((row) => row.product_id.toString().includes(searchPID) && row.product_size.toLowerCase().includes(searchSize.toLowerCase())) // case 7: search by id and brand
          : rows.filter((row) => row.product_id.toString().includes(searchPID) && row.product_size.toLowerCase().includes(searchSize.toLowerCase()) && row.product_dateadd.toLowerCase().includes(searchDate.toLowerCase()));// case 8: search by id, brand and category
    
    const pageRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

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

    const handleDelete = (product_id) => {
      axios.delete("http://localhost:8080/productinventory/delete", { data:{ product_id: product_id }})
      .then((res) => {
        const timestamp = new Date();
        navigate('/admin/stock', { state: { status:'success', action:'delete', message: "Product Stock Delete Successful At "+timestamp.toLocaleString() } });
        alert("Product Stock Deleted!");
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
          id: 'product_size',
          numeric: true,
          disablePadding: false,
          label: 'Size',
        },
        {
          id: 'product_quantity',
          numeric: true,
          disablePadding: false,
          label: 'Quantity',
        },
        {
          id: 'product_dateadd',
          numeric: true,
          disablePadding: false,
          label: 'Date Added',
        }
      ];

      return(
        <Box sx={{ p: 2, width: '100%',backgroundColor:'white' }}>
          <Noti location={location}/>
            <Paper sx={{ width: '100%', mb: 2, elevation:10}}>
              <Grid container >
                <Grid item xs={4} sm={4} >
                <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
                  <Typography variant="h8" >Size</Typography>
                  <TextField  value={searchSize} onChange={(e) => setSearchSize(e.target.value)} />
                </Stack>
                </Grid>
                <Grid item xs={4} sm={4}>
                <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
                  <Typography variant="h8" >Product ID</Typography>
                  <TextField value={searchPID}  onChange={(e) => setSearchPID(e.target.value)} />
                </Stack>
                </Grid>
                <Grid item xs={4} sm={4}>
                <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
                  <Typography variant="h8">Date Added</Typography>
                  <TextField value={searchDate}  onChange={(e) => setSearchDate(e.target.value)} />
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
                      <MenuItem value={"product_dateadd"}>Date Added</MenuItem>
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
                      return (
                        <>
                        <TableRow tabIndex={-1} key={row.product_id} >
                          <TableCell></TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none" >
                            {row.product_id}
                          </TableCell>
                          <TableCell align='left'><Typography >{row.product_size}</Typography></TableCell>
                          <TableCell align='left'><Typography >{row.product_quantity}</Typography></TableCell>
                          <TableCell align='left'><Typography >{row.product_dateadd}</Typography></TableCell>
                          <TableCell align='center'>
                          <IconButton id={row.product_id} onClick={e=>handleDelete(row.product_id)}><DeleteIcon >delete</DeleteIcon></IconButton>
                          </TableCell>
                        </TableRow>
                        
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
export default Stock