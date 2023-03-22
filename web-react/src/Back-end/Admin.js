import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SecondaryListItems } from './MyNav';
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
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios';
import Noti from './Components/Noti';
import { useNavigate } from 'react-router-dom';
import Product from './Components/Product';
import Customer from './Components/Customer';
import Order from './Components/Order';
import Payment from './Components/Payment';

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
  let location = useLocation();
  const navigate = useNavigate();
  
    useEffect(()=>{
      const fetchTodos = async () => {
      const results1  = await axios.get('http://localhost:8080/customer');
      const results2  = await axios.get('http://localhost:8080/order');
      const results3  = await axios.get('http://localhost:8080/payment');
      const results4  = await axios.get('http://localhost:8080/product_detail');
      const results5  = await axios.get('http://localhost:8080/product_inventory');
      const results6  = await axios.get('http://localhost:8080/product_order');

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
    }
  };

  const menuName = ["Admin", "Order", "Product", "Customer", "Payment", "Stock"]
  const menuIcon = [<DashboardIcon/>, <ShoppingCartIcon/>, <LayersIcon/>, <PeopleIcon/>,<PaymentsIcon/>,<img src="/img/in-stock.png" alt="stock" width="24" height="24"/>]
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
    <ThemeProvider theme={mdTheme}>
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
          <List component="nav">
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
            <SecondaryListItems />
            </React.Fragment>
            {/*<MyOption/>*/}
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
          {/*<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {location && isAdmin&& (<Noti location={location}/>)}
            {isOrder&& (<Order data = {orderdata}/>)}
            {isCustomer&& (<Customer data = {cusdata}/>)}
            {isPayment&& (<Payment data = {paymentdata}/>)}
            {isProduct&& (<Product data = {productdata} order={productorderdata} inventory={productinventorydata}/>)}
        </Container>*/}
          
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            {location.pathname === '/admin' && <h1>admin</h1>}
            {location.pathname === '/admin/order' && <Order data = {orderdata}/>}
            {location.pathname === '/admin/customer' && <Customer data = {cusdata}/>}
            {location.pathname === '/admin/payment' && <Payment data = {paymentdata}/>}
            {location.pathname === '/admin/product' && <Product  data = {productdata} order={productorderdata} inventory={productinventorydata}/>}
          </Container>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default Admin;

