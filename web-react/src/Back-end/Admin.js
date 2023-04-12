import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toolbar, IconButton, Divider, List, Box, CssBaseline, Container,Typography, Badge, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Dialog, ListItem} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material/';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from './Components/Product';
import Customer from './Components/Customer';
import Order from './Components/Order';
import Payment from './Components/Payment';
import Stock from './Components/Stock';
import ReportChart from './Components/ReportChart';

export const Dashboard = (props) => {
  const orderdata = props.orderdata;
  const productinventorydata = props.inventorydata;
  const chartdata = props.chartdata;

  return (
    <Box sx={{  }}>
      <CssBaseline />
      <Paper sx={{ mb:2,p: 2,width:"100%", height: "100%",fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', }}>
      <Typography component="h2" variant="h3" color="primary" >
        Dashboard
      </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <Paper sx={{ mb:2,p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6} lg={6}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Total Orders
                </Typography>
                <Typography component="p" variant="h4">
                  {orderdata.length}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Today Orders
                </Typography>
                <Typography component="p" variant="h4">
                  {orderdata.filter((order) => order.order_date === new Date().toISOString().slice(0, 10)).length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ overflow: 'auto' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              last 5 orders
            </Typography>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Order Price</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderdata.slice(-5).reverse().map((row) => (
                  <TableRow
                    key={"order"+row.order_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='left'><Typography>{row.order_id}</Typography></TableCell>
                    <TableCell align='left'><Typography>{row.cus_id}</Typography></TableCell>
                    <TableCell align='left'><Typography>{row.order_price}</Typography></TableCell>
                    <TableCell align='left'><Typography>{new Date(row.order_date).toLocaleDateString()}</Typography></TableCell>
                    <TableCell align='left'><Typography>{row.order_status}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper sx={{ mb:2,p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Products
            </Typography>
            <Typography component="p" variant="h4">
              {productinventorydata.length}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ overflow: 'auto' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              last 5 products
            </Typography>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Date Added</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productinventorydata.slice(-5).reverse().map((row) => (
                  <TableRow
                    key={"product"+row.product_id+row.product_size}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='left'><Typography >{row.product_id}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.product_size}</Typography></TableCell>
                    <TableCell align='left'><Typography >{row.product_quantity}</Typography></TableCell>
                    <TableCell align='left'><Typography>{new Date(row.product_dateadd).toLocaleDateString()}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
            <ReportChart data = {chartdata} type = {"Current month"}/>
          </Paper>
          </Grid>
        </Grid>
    </Box>
  );
};

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
  // show array length instead of string length
  
  console.log(myArray.length);

  return (
    <IconButton color="inherit" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Badge badgeContent={myArray.length} color="secondary">
        <NotificationsIcon />
      </Badge>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Notifications
        </Typography>
        <Divider />
        <List sx={{ width: 300, maxHeight: 300, overflow: 'auto' }}>
          {myArray.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Dialog>

    </IconButton>
  )
}
const Admin = () => {
  const [cusdata, setcusdata] = useState([]);
  const [orderdata, setorderdata] = useState([]);
  const [paymentdata, setpaymentdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [productorderdata, setproductorderdata] = useState([]);
  const [productinventorydata, setproductinventorydata] = useState([]);
  const [reportType, setReportType] = useState('Current month');
  let location = useLocation();
  const navigate = useNavigate();
  
    useEffect(()=>{
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if(token == null || user !== 'admin'){
        navigate('/ordermanagement');
      }
      const fetchTodos = async () => {
      const results1  = await axios.get('http://localhost:8080/customer');
      const results2  = await axios.get('http://localhost:8080/order');
      const results3  = await axios.get('http://localhost:8080/payment');
      const results4  = await axios.get('http://localhost:8080/product_detail');
      const results5  = await axios.get('http://localhost:8080/product_inventory');
      const results6  = await axios.get('http://localhost:8080/orderline');
        try{
            setcusdata(results1.data);
            setorderdata(results2.data);
            setpaymentdata(results3.data);
            setproductdata(results4.data);
            setproductinventorydata(results5.data);
            setproductorderdata(results6.data);
        }catch(err){
            console.log(err);
        }
      }
      fetchTodos();
    },[]);

  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePageClick = (index) => {
    const page = menuName[index];
    if (page === 'Product') {
      navigate('/admin/product');
    } else if (page === 'Order') {
      navigate('/admin/order');
    } else if (page === 'Customer') {
      navigate('/admin/customer');
    } else if (page === 'Payment') {
      navigate('/admin/payment');
    } else if (page === 'Dashboard') {
      navigate('/admin');
    } else if (page === 'Stock') {
      navigate('/admin/stock');
    } 
  };
  const handleSelectChart = (index) => {
    const chart = chartDuration[index];
    if (chart === 'Current month') {
      setReportType('Current month');
      navigate('/admin/report/currentMonth');
    } else if (chart === 'Last Quarter') {
      setReportType('Last Quarter');
      navigate('/admin/report/lastQuarter');
    } else if (chart === 'Year-end sale') {
      setReportType('Year-end sale');
      navigate('/admin/report/lastYear');
    }
  };
  
  const menuName = ["Dashboard", "Order", "Product", "Customer", "Payment", "Stock"]
  const menuIcon = [<DashboardIcon/>, <ShoppingCartIcon/>, <LayersIcon/>, <PeopleIcon/>,<PaymentsIcon/>, <WarehouseIcon/>]
  const chartDuration= ["Current month", "Last Quarter", "Year-end sale"]
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  const mdTheme = createTheme();

  const handleBackup = () => {
    axios.get('http://localhost:8080/backup')
    .then(res => {
      console.log(res);
      alert("Backup successfully");
    })
  }

  const handleRestore = () => {
    axios.get('http://localhost:8080/restore')
    .then(res => {
      console.log(res);
      alert("Restore successfully");
    })
  }

  const logout = () =>{
    // delete the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    // redirect the user to the login page
    navigate('/ordermanagement');
  }
  
  return (
    <ThemeProvider
        theme={mdTheme}
      >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" color="primary" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Order Management System
            </Typography>
            <Notifications/>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
          <Divider />
          <List >
            <React.Fragment>
            {menuName.map((e, index) => {
                return  (
                  <ListItemButton key={index} onClick={e=>handlePageClick(index)}>
                    <ListItemIcon>
                      {menuIcon[index]}
                    </ListItemIcon>
                    <ListItemText primary={""+e} />
                  </ListItemButton>)
                })}
            <Divider sx={{ my: 1 }} />
            {chartDuration.map((e, index) => {
                return  (
                  <ListItemButton key={index} onClick={e=>handleSelectChart(index)}>
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={""+e} />
                  </ListItemButton>)
                }
                )
            }
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={e=>handleBackup()}>
              <ListItemIcon>
                <BackupIcon />
              </ListItemIcon>
              <ListItemText primary="BackUp" />
            </ListItemButton>
            {/*<ListItemButton onClick={e=>handleRestore()}>
              <ListItemIcon>
                <RestoreIcon />
              </ListItemIcon>
              <ListItemText primary="Restore" />
          </ListItemButton>*/}
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            {location.pathname === '/admin' && <Dashboard orderdata = {orderdata} chartdata = {productorderdata} type = {reportType} inventorydata={productinventorydata}/>}
            {location.pathname === '/admin/order' && <Order data = {orderdata}/>}
            {location.pathname === '/admin/customer' && <Customer data = {cusdata}/>}
            {location.pathname === '/admin/payment' && <Payment data = {paymentdata}/>}
            {location.pathname === '/admin/product' && <Product  data = {productdata} inventory={productinventorydata}/>}
            {location.pathname === '/admin/stock' && <Stock  data = {productinventorydata} inventory={productinventorydata}/>}
            {location.pathname === '/admin/report/currentMonth' && <ReportChart data = {productorderdata} type = {reportType}/>}
            {location.pathname === '/admin/report/lastQuarter' && <ReportChart data = {productorderdata} type = {reportType}/>}
            {location.pathname === '/admin/report/lastYear' && <ReportChart data = {productorderdata} type = {reportType}/>}
          </Container>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default Admin;

