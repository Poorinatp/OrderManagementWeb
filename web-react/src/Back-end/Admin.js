import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toolbar, IconButton, Divider, List, Box, CssBaseline, Container,Typography, Badge, Alert} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {ListItemButton, ListItemIcon, ListItemText, ListSubheader} from '@mui/material/';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import BarChartIcon from '@mui/icons-material/BarChart';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios';
import Noti from './Components/Noti';
import { useNavigate } from 'react-router-dom';
import Product from './Components/Product';
import Customer from './Components/Customer';
import Order from './Components/Order';
import Payment from './Components/Payment';
import Stock from './Components/Stock';
import ReportChart from './Components/ReportChart';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isOrder,setIsOrder] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  // fetch data from database
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
    } else if (page === 'Admin') {
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
  
  const menuName = ["Admin", "Order", "Product", "Customer", "Payment", "Stock"]
  const menuIcon = [<DashboardIcon/>, <ShoppingCartIcon/>, <LayersIcon/>, <PeopleIcon/>,<PaymentsIcon/>,<img src="/img/in-stock.png" alt="stock" width="24" height="24"/>]
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
            {location.pathname === '/admin' && <h1>admin</h1>}
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

