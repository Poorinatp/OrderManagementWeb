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


// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     order_id: 'order_id',
//     numeric: false,
//     disablePadding: true,
//     label: 'Order ID',
//   },
//   {
//     order_id: 'cus_id',
//     numeric: true,
//     disablePadding: false,
//     label: 'Customer ID',
//   },
//   {
//     order_id: 'order_amount',
//     numeric: true,
//     disablePadding: false,
//     label: 'Amount',
//   },
//   {
//     order_id: 'order_price',
//     numeric: true,
//     disablePadding: false,
//     label: 'price',
//   },
//   {
//     order_id: 'order_date',
//     numeric: true,
//     disablePadding: false,
//     label: 'Date',
//   },
//   {
//     order_id: 'order_ShipMethod',
//     numeric: true,
//     disablePadding: false,
//     label: 'Ship Method',
//   },
//   {
//     order_id: 'order_status',
//     numeric: true,
//     disablePadding: false,
//     label: 'Status',
//   }
// ];

// function SelectedItem(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.order_id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.order_id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.order_id}
//               direction={orderBy === headCell.order_id ? order : 'asc'}
//               onClick={createSortHandler(headCell.order_id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.order_id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// SelectedItem.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function SelectedTool(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           order_id="tableTitle"
//           component="div"
//         >
//           Order
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// SelectedTool.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const Order = (props) => {
  const rows = props.data;
  const pages = props.pages;
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('order_id');
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchOID, setSearchOID] = useState("");
  const [searchCID, setSearchCID] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  const filteredRows = (searchOID === "" && searchCID === "" && searchDate === "" && filterStatus === "")
  ? (rows) // case 1: no search
  : (searchOID === "") // case 2-6: search by brand, category, or both
    ? (searchCID === "") // case 2-3: search by category or brand
      ? (filterStatus !== "")?rows.filter((row) => row.order_date.toLowerCase().includes(searchDate.toLowerCase()) && row.order_status.includes(filterStatus)):rows.filter((row) => row.order_date.toLowerCase().includes(searchDate.toLowerCase())) // case 2: search by category
      : (searchDate === "") // case 3-4: search by brand or both
        ? (filterStatus !== "")?rows.filter((row) => row.cus_id.toString().includes(searchCID) && row.order_status.includes(filterStatus)):rows.filter((row) => row.cus_id.toString().includes(searchCID)) // case 3: search by brand
        : (filterStatus !== "")?rows.filter((row) => row.cus_id.toString().includes(searchCID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase()) && row.order_status.includes(filterStatus)):rows.filter((row) => row.cus_id.toString().includes(searchCID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase())) // case 4: search by brand and category
    : (searchCID === "") // case 5-8: search by id, id and category, id and brand, or id, brand and category
      ? (searchDate === "") // case 5-6: search by id or id and category
        ? (filterStatus !== "")?rows.filter((row) => row.order_id.toString().includes(searchOID) && row.order_status.includes(filterStatus)):rows.filter((row) => row.order_id.toString().includes(searchOID)) // case 5: search by id
        : (filterStatus !== "")?rows.filter((row) => row.order_id.toString().includes(searchOID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase()) && row.order_status.includes(filterStatus)):rows.filter((row) => row.order_id.toString().includes(searchOID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase())) // case 6: search by id and category
      : (searchDate === "") // case 7-8: search by id and brand or id, brand and category
        ? (filterStatus !== "")?rows.filter((row) => row.order_id.toString().includes(searchOID) && row.cus_id.toString().includes(searchCID) && row.order_status.includes(filterStatus)):rows.filter((row) => row.order_id.toString().includes(searchOID) && row.cus_id.toString().includes(searchCID)) // case 7: search by id and brand
        : (filterStatus !== "")?rows.filter((row) => row.order_id.toString().includes(searchOID) && row.cus_id.toString().includes(searchCID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase()) && row.order_status.includes(filterStatus)):rows.filter((row) => row.order_id.toString().includes(searchOID) && row.cus_id.toString().includes(searchCID) && row.order_date.toLowerCase().includes(searchDate.toLowerCase()));// case 8: search by id, brand and category
  
  
  const [openeditList, setOpeneditList] = useState(Array(filteredRows.length).fill(false));
  const [anchorEl, setAnchorEl] = useState(null);
  const [newEdit, setNewEdit] = useState("");
  const pageRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchCID, searchOID, searchDate, filterStatus]);

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
  const emptyRows =
  currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - filteredRows.length) : 0;

  const headCells = [
    {
      id: 'order_id',
      numeric: false,
      disablePadding: true,
      label: 'Order ID',
    },
    {
      id: 'cus_id',
      numeric: true,
      disablePadding: false,
      label: 'Customer ID',
    },
    {
      id: 'order_amount',
      numeric: true,
      disablePadding: false,
      label: 'Amount',
    },
    {
      id: 'order_price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'order_date',
      numeric: true,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'order_ShipMethod',
      numeric: true,
      disablePadding: false,
      label: 'Ship Method',
    },
    {
      id: 'order_status',
      numeric: true,
      disablePadding: false,
      label: 'Status',
    }
  ];

  const downloadInvoice = (order_id) => {
    axios.get("http://localhost:8080/taxinvoice/" + order_id, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "tax_invoice_order_"+order_id+".pdf");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  const updateStatus = (e, order_id) => {
    axios.put("http://localhost:8080/updateorder/" + order_id, {
      order_status: e.target.value,
    })
    .then((response) => {
      const timestamp = new Date();
      navigate('/admin/order', { state: { status:'success', action:'update status', message: "Order Status Is Updated Successful At "+timestamp.toLocaleString() } });
      window.location.reload();
      alert("Order Update!");
    }
    )
    .catch((error) => {
      const timestamp = new Date();
      navigate('/admin/order', { state: { status:'error', action:'update status', message: "Order Status Is Updated Unsuccessful At "+timestamp.toLocaleString() } });
      window.location.reload();
    }
    );
  }

  return(
  <Box sx={{ p: 2, width: '100%',backgroundColor:'white' }}>
    <Noti location={location}/>
      {pages!=="admin"&&
      <>
      <Paper sx={{ p: 2, width: '100%', mb: 2, elevation:10 }} >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120}} >
        <InputLabel>Status</InputLabel>
          <Select value={filterStatus} label="Status" onChange={e=>setFilterStatus(e.target.value)} >
            <MenuItem value={""}>-</MenuItem>
            <MenuItem value={"จัดส่งแล้ว"}>จัดส่งแล้ว</MenuItem>
            <MenuItem value={"กำลังจัดส่ง"}>กำลังจัดส่ง</MenuItem>
            <MenuItem value={"ยกเลิก"}>ยกเลิก</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <Paper sx={{ width: '100%', mb: 2, elevation:10}}>
        <Grid container >
          <Grid item xs={4} sm={4} >
          <Stack direction="row" spacing={1} sx={{ p: 2 }} alignItems="center">
            <Typography variant="h8" >Customer ID</Typography>
            <TextField  value={searchCID} onChange={(e) => setSearchCID(e.target.value)} />
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
            <Typography variant="h8">Date</Typography>
            <TextField value={searchDate}  onChange={(e) => setSearchDate(e.target.value)} />
          </Stack>
          </Grid>
        </Grid>
        </Paper>
        </>}
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
          {/* <TableBody>
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <>
                  <TableRow tabIndex={-1} key={row.order_id} >
                    <TableCell>

                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" >
                      {row.order_id}
                    </TableCell>
                    <TableCell align='left'><Typography >{row.cus_id}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.order_amount}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.order_price}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.order_date}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.order_ShipMethod}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.order_status}</Typography></TableCell>
                    <TableCell align='left'>
                      <Tooltip title="Print Tax Invoice" placement="top">
                        <IconButton onClick={e=>downloadInvoice(row.order_id)}>
                          <ReceiptIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='left'>
                    <Popover
                        open={openeditList[index]}
                        anchorEl={anchorEl}
                        onClose={e=>{
                          const openListCopy = [...openeditList];
                          openListCopy[index] = !openeditList[index];
                          setOpeneditList(openListCopy);
                          setAnchorEl(null);
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                      <Select value={newEdit} label="Status" onChange={e=>updateStatus(e,row.order_id)} >
                        <MenuItem value={""}>-</MenuItem>
                        <MenuItem value={"จัดส่งแล้ว"}>จัดส่งแล้ว</MenuItem>
                        <MenuItem value={"กำลังจัดส่ง"}>กำลังจัดส่ง</MenuItem>
                        <MenuItem value={"ยกเลิก"}>ยกเลิก</MenuItem>
                      </Select>
                      </Popover>
                      <Tooltip title="Update Status" placement="top">
                        <IconButton onClick={(e) => { 
                          const openListCopy = [...openeditList];
                          openListCopy[index] = !openeditList[index];
                          setOpeneditList(openListCopy);
                          setAnchorEl(e.currentTarget);
                          }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
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
          </TableBody> */}
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={currentPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
  </Box>
  )
}
export default Order
