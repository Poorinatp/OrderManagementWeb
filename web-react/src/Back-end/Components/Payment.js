import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { FormControl, Grid, InputLabel, MenuItem, Popover, Select, Stack, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Noti from './Noti';

const Payment = (props) => {
  const rows = props.data;
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('payment_id');
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchOID, setSearchOID] = useState("");
  const [searchPID, setsearchPID] = useState("");
  const [searchStatus, setsearchStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  const filteredRows = (searchOID === "" && searchPID === "" && searchStatus === "")
  ? (rows) // case 1: no search
  : (searchOID === "") // case 2-6: search by brand, category, or both
    ? (searchPID === "") // case 2-3: search by category or brand
      ? rows.filter((row) => row.payment_status.toLowerCase().includes(searchStatus.toLowerCase())) // case 2: search by category
      : (searchStatus === "") // case 3-4: search by brand or both
        ? rows.filter((row) => row.payment_id.toString().includes(searchPID)) // case 3: search by brand
        : rows.filter((row) => row.payment_id.toString().includes(searchPID) && row.payment_status.toLowerCase().includes(searchStatus.toLowerCase())) // case 4: search by brand and category
    : (searchPID === "") // case 5-8: search by id, id and category, id and brand, or id, brand and category
      ? (searchStatus === "") // case 5-6: search by id or id and category
        ? rows.filter((row) => row.order_id.toString().includes(searchOID)) // case 5: search by id
        : rows.filter((row) => row.order_id.toString().includes(searchOID) && row.payment_status.toLowerCase().includes(searchStatus.toLowerCase())) // case 6: search by id and category
      : (searchStatus === "") // case 7-8: search by id and brand or id, brand and category
        ? rows.filter((row) => row.order_id.toString().includes(searchOID) && row.payment_id.toString().includes(searchPID)) // case 7: search by id and brand
        : rows.filter((row) => row.order_id.toString().includes(searchOID) && row.payment_id.toString().includes(searchPID) && row.payment_status.toLowerCase().includes(searchStatus.toLowerCase()));// case 8: search by id, brand and category
  
  
  const [openeditList, setOpeneditList] = useState(Array(filteredRows.length).fill(false));
  const [anchorEl, setAnchorEl] = useState(null);
  const [newEdit, setNewEdit] = useState("");
  const pageRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchOID, searchPID, searchStatus]);

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

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
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

  const emptyRows =
  currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - filteredRows.length) : 0;

  const headCells = [
    {
      id: 'payment_id',
      numeric: false,
      disablePadding: true,
      label: 'Payment ID',
    },
    {
      id: 'order_id',
      numeric: true,
      disablePadding: false,
      label: 'Order ID',
    },
    {
      id: 'payment_totalvat',
      numeric: true,
      disablePadding: false,
      label: 'Total VAT',
    },
    {
      id: 'payment_bill',
      numeric: true,
      disablePadding: false,
      label: 'Bill',
    },
    {
      id: 'payment_method',
      numeric: true,
      disablePadding: false,
      label: 'Payment Method',
    },
    {
      id: 'payment_status',
      numeric: true,
      disablePadding: false,
      label: 'Payment Status',
    }
  ];

  return(
  <Box sx={{ p: 2, width: '100%',backgroundColor:'white' }}>
    <Noti location={location}/>
      <Paper sx={{ width: '100%', mb: 2, elevation:10}}>
        <Grid container >
          <Grid item xs={4} sm={4} >
          <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
            <Typography variant="h8" >Payment ID</Typography>
            <TextField  value={searchPID} onChange={(e) => setsearchPID(e.target.value)} />
          </Stack>
          </Grid>
          <Grid item xs={4} sm={4}>
          <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
            <Typography variant="h8" >Order ID</Typography>
            <TextField value={searchOID}  onChange={(e) => setSearchOID(e.target.value)} />
          </Stack>
          </Grid>
          <Grid item xs={4} sm={4}>
          <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
            <Typography variant="h8">Payment Status</Typography>
            <TextField value={searchStatus}  onChange={(e) => setsearchStatus(e.target.value)} />
          </Stack>
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
                  <TableRow tabIndex={-1} key={row.payment_id} >
                    <TableCell>

                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" >
                      {row.payment_id}
                    </TableCell>
                    <TableCell align='left'><Typography >{row.order_id}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.payment_totalvat}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.payment_bill}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.payment_method}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.payment_status}</Typography></TableCell>
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
export default Payment