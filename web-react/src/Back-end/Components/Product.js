import React, { useState,useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { alpha, Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, IconButton, Paper, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import MyOption from "./MyOption"
import visuallyHidden from "@mui/utils/visuallyHidden"
import PropTypes from 'prop-types';
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import VerifyButton from "./VerifyButton";
import { MyContext } from "../../MyContext"

const AddProduct = (props) => {
  const [product_price, setProduct_price] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [product_brand, setProduct_brand] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_image, setProduct_image] = useState("");
  const [product_discount, setProduct_discount] = useState("");
  const navigate = useNavigate();
  const { setShowAlert } = useContext(MyContext);
  const handleAdd = (e) => {
    axios.post("http://localhost:8080/addproduct", { product_price:product_price, product_type:product_type, product_brand:product_brand, product_description:product_description, product_image:product_image, product_discount:product_discount })
    .then((res) => {
      const timestamp = new Date();
        navigate('/admin', { state: { message: "Product Added Successful At "+timestamp.toLocaleString() } });
        setShowAlert(true);
        alert("Product Added!");
      })
    .catch((err) => {
      console.log(err);
    });
  };


  return (
    <FormControl fullWidth margin="1" style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField required
            id="product_type"
            label="Product Type"
            value={product_type}
            onChange={(e) => setProduct_type(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required
            id="product_brand"
            label="Product Brand"
            value={product_brand}
            onChange={(e) => setProduct_brand(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <TextField required
            id="product_description"
            label="Product Description"
            value={product_description}
            onChange={(e) => setProduct_description(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField required
            id="product_price"
            label="Product Price"
            value={product_price}
            onChange={(e) => setProduct_price(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <TextField required
        id="product_image"
        label="Product Image"
        value={product_image}
        onChange={(e) => setProduct_image(e.target.value)}
        margin="normal"
      />
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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="product_price"
          label="Product Price"
          value={product_price}
          onChange={(e) => setProduct_price(e.target.value)}
        />
        <TextField
          required
          id="product_description"
          label="Product Description"
          value={product_description}
          onChange={(e) => setProduct_description(e.target.value)}
        />
        <TextField
          required
          id="product_category"
          label="Product Category"
          value={product_category}
          onChange={(e) => setProduct_category(e.target.value)}
        />
        <TextField
          required
          id="product_image"
          label="Product Image"
          value={product_image}
          onChange={(e) => setProduct_image(e.target.value)}
        />
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
function SelectedItem(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
            />
          </TableCell>
          <TableCell>
          </TableCell>
          {props.headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ maxWidth: '200px' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
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
    );
}

SelectedItem.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
function SelectedTool(props) {
    const { numSelected } = props;
    const selected = props.selected;
    const [showFilters, setShowFilters] = useState(false);

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
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            cus_id="tableTitle"
            component="div"
          >
            Product
          </Typography>
        )}
        {numSelected > 0 ? (
          <Stack direction="row" spacing={2}>
          <Tooltip title="Add Stock">
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
    const product_order = props.product_order;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('product_id'); 
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);


    const filteredRows = searchQuery === "" ? rows : rows.filter((row) => {
      const productDescription = row.product_description.toLowerCase();
      const productBrand = row.product_brand.toLowerCase();
      const search = searchQuery.toLowerCase();
      return row.product_id === parseInt(search) || productDescription.includes(search) || productBrand.includes(search);
    });
    const pageRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

    useEffect(() => {
      setCurrentPage(0);
    }, [filteredRows]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = filteredRows.map((n) => n.product_id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

    const handleClick = (event, product_id) => {
        const selectedIndex = selected.indexOf(product_id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, product_id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleDelete = (event) => {
      console.log(selected);
      axios.delete("http://localhost:8080/productinventory/delete", { data:{ product_id: event.target.id }})
      .then((res) => {
        const timestamp = new Date();
        alert("Product Deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Search Product Name or Brand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpenAdd(!openAdd)}>
          {openAdd ? 'Close' : 'Add Product'}
        </Button>
        {/*<Button variant="contained" onClick={() => setOpenEdit(!openEdit)}>
          Edit Product
    </Button>*/}
        {openEdit&&<EditProduct open={openEdit} setOpen={setOpenEdit} />}
        </Stack>
        {openAdd&&<AddProduct/>}
        <SelectedTool numSelected={selected.length} selected={selected}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
          >
            <SelectedItem
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              headCells = {headCells}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.product_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const img = row.product_urlimg.replace(/\//g, "/");
                  return (
                    <>
                    <TableRow
                      tabIndex={-1}
                      key={row.product_id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => {handleClick(event, row.product_id);}}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.product_id}
                      </TableCell>
                      <TableCell align='left'><Typography >{row.product_type}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_brand}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_description}</Typography></TableCell>
                      <TableCell align='left'><Typography >{row.product_price}</Typography></TableCell>
                      <TableCell>
                        <img src={img} style={dense ? { width: '50px' } : { width: '100px' }}/>
                      </TableCell>
                      <TableCell align='center'><Button id={row.product_id} onClick={handleDelete}>delete</Button></TableCell>
                    </TableRow>
                    {open ? (
                      <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        {inventory.length === 0 ? (
                                <Typography variant="h3" color="text.secondary">Out of stock</Typography>
                            ) : (
                              <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                  <Typography variant="h6" gutterBottom component="div">
                                    Stock
                                  </Typography>
                                <Table sx={{ backgroundColor: "#8249" }} size={dense ? 'small' : 'medium'} aria-label="stock">
                                <TableHead sx={{ backgroundColor: "#8244" }}>
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
                                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
    )
}
export default Product
