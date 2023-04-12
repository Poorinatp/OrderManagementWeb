import { React,useEffect,useState } from 'react';
import NavItem from './FrontComponent/NavItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Container, IconButton, Menu, Toolbar, Typography, Button, Grid, MenuItem, Dialog, List, Badge, Paper, ListItemText, Divider, ListItem, RadioGroup, Radio, FormControlLabel, Select, Checkbox, TextField } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Stack } from '@mui/system';

import Front from './Front';
import { Link, Route, useLocation, useNavigate } from 'react-router-dom';
import ProductPage from './ProductPage';
import Login from './FrontComponent/Login';
import Profile from './Profile';

import './MyNavFront.css';
import ContactUs from './Help/ContactUs';
import OrderStatus from './Help/OrderStatus';
import OrderHistory from './Help/OrderHistory';
import ProductDetail from './FrontComponent/ProductDetail';
import axios from 'axios';
import OrderStatus_search from './Help/OrderStatus_search';

const MyDialog = styled(Dialog)({
  width: '50%',
  height: '100%',
  zIndex: 1000,
  // remove background color
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  // remove box shadow

});

const MyCart = styled(Dialog)({
  width:"100%",
  height:"100%",
  backgroundColor:"rgba(0,0,0,0.5)",
  top:0,
  left:0,
  zIndex:1000,
  padding:"0px",
  margin:"0px",
  alignItems:"center",
});

const Cart = ({cart, setCart, openCart, setOpenCart}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardType, setCardType] = useState('');
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
 
  const [vat, setVat] = useState(7.00);
  const [shipping, setShipping] = useState(50.00);
  const [total, setTotal] = useState(5050.00);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingMethod, setShippingMethod] = useState("Standard");

  function validateCardNumber(cardNumber) {
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      const digit = parseInt(cardNumber[i]);
      if (isEven) {
        const doubledDigit = digit * 2;
        sum += (doubledDigit > 9) ? (doubledDigit - 9) : doubledDigit;
      } else {
        sum += digit;
      }
      isEven = !isEven;
    }
    return (sum % 10) === 0;
  }
  
  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, '');
    let type = '';
    let isValid = false;
    if (/^4/.test(input)) {
      type = 'Visa';
      if (input.length >= 16 && input.length <= 19 && validateCardNumber(input)) {
        isValid = true;
      }
    } else if (/^5[1-5]/.test(input)) {
      type = 'Mastercard';
      if (input.length >= 16 && input.length <= 19 && validateCardNumber(input)) {
        isValid = true;
      }
    } else if (/^3[47]/.test(input)) {
      type = 'American Express';
      if (input.length >= 15 && input.length <= 19 && validateCardNumber(input)) {
        isValid = true;
      }
    } else if (/^35(2[89]|[3-8][0-9])/.test(input)) {
      type = 'JCB';
      if (input.length >= 16 && input.length <= 19 && validateCardNumber(input)) {
        isValid = true;
      }
    }
  
    setCardType(type);
    setCardNumber(input);
    setIsCardNumberValid(isValid);
  };
  
  const handleExpiryDateChange = (event) => {
    let expiryDate = event.target.value.replace(/\D/g, '');
    if (expiryDate.length > 2) {
      const month = expiryDate.substring(0, 2);
      const year = expiryDate.substring(2, 4);
      expiryDate = month + '/' + year;
      if (parseInt(month) > 12) {
        expiryDate = '01/' + year;
      }
    }
    setExpiryDate(expiryDate);
  };

  const handleCvvChange = (event) => {
    let cvv = event.target.value.replace(/\D/g, '');
    setCvv(cvv);
  };

  const handleFirstNameChange = (event) => {
    let firstName = event.target.value.replace(/[^a-zA-Z]/g, '');
    setFirstName(firstName);
  };

  const handleLastNameChange = (event) => {
    let lastName = event.target.value.replace(/[^a-zA-Z]/g, '');
    setLastName(lastName);
  };

  //============================================================================== createOrder ==================================================================================
  const handlePayment = (item) => {
    //create payment bill
    const currentDate = new Date();
    // get full year 2 digit
    const dateStr = `${(currentDate.getFullYear()).toString().substr(-2)}${currentDate.getMonth()+1}${currentDate.getDate()}`;
    const timeStr = `${currentDate.getHours()}${currentDate.getMinutes()}`;
    const paymentBill = `${dateStr}${timeStr}`;
    // store item.product_id, item.product_size, item.product_amount to array
    const product_id = [];
    const product_size = [];
    const product_amount = [];
    // check if id and size is same, if same, add amount
    console.log(item);
    for (let i = 0; i < item.length; i++) {
      if (product_id.includes(item[i].product_id) && product_size.includes(item[i].product_size)) {
        console.log('same');
        console.log("i = "+i+item[i].product_id);
        console.log(item[i].product_qty)
        const index = product_id.indexOf(item[i].product_id);
        product_amount[index] += item[i].product_qty;
      } else {
        console.log('not same');
        console.log("i = "+i+item[i].product_id);
        product_id.push(item[i].product_id);
        product_size.push(item[i].product_size);
        product_amount.push(item[i].product_qty);
      }
    }
    console.log(product_id);
    console.log(product_size);
    console.log(product_amount);

    const orderData = {
      username: localStorage.getItem('user'),
      order_amount: item.length,
      order_price: getLastPrice(),
      order_Shipmethod: shippingMethod,
      order_status: 'pending',
      product_id: product_id,
      product_size: product_size,
      product_amount: product_amount,
      payment_totalvat: getLastPrice(),
      payment_bill: parseInt(paymentBill),
      payment_method: cardType,
      payment_status: 'paid'
    };
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      firstName,
      lastName
    };
  
    console.log(orderData);
    console.log(paymentData);
    // axios create order to /order/create
    axios.post('http://localhost:8080/order/create', orderData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert('Order created');
      })
      .catch((err) => {
        console.log(err);
        alert('Order not created');
      }
    );
  };

  const handleCheckboxChange = (event, index) => {
    // selected item
    const newCart = [...cart];
    newCart[index].selected = event.target.checked;
    setCart(newCart);
  };
  
  const handleDeleteItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };
  
  const handleDeleteSelectedItems = () => {
    // const newCart = cart.filter(item => !item.selected);
    // setCart(newCart);
    const selected = cart.filter(item => item.selected);
    handlePayment(selected);
    console.log(selected);
  };
  
  
  const getTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    } else{    
      let totalPrice = 0;
      cart.forEach(item => {
      if (item.selected) {
          totalPrice += item.product_price * item.product_qty;
      }
    });
    return totalPrice;}
  };
  

  const getLastPrice = () => {
    let lastPrice = getTotalPrice()+shipping ;
    return lastPrice;
  };
  
  return(
    <MyCart
      className='mycart'
      fullScreen
      open={openCart}
      onClose={e=>setOpenCart(false)}
    >
    <Button onClick={e=>setOpenCart(false)}>Close</Button>
    <Grid container sx={{width:"100%",height:"100%" , bgcolor:'#F1ECE1'}} className='cartbox'>
      <Grid item xs={12} md={6} lg ={6}>
        <Box  sx={{ p:10,mt:5, width: 'auto', height: '100%', bgcolor: '#F1ECE1' }}>
{/*======================================================================================== cart show ===========================================================================*/}
          <Typography variant="body1" paragraph sx={{ ml:5}}>            
          {cart.map((item,index) => {
              return(
                <Grid container className="cart-item" key={"grid"+index}>
                  <Grid item xs={1} className="cart-item-checkbox">
                  <Checkbox
                    color="primary" 
                    checked={item.selected}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
                  </Grid>
                  <Grid item xs={3} className="cart-item-image">
                    <img src={item.product_img} alt={item.product_description} />
                  </Grid>
                  <Grid item xs={4} className="cart-item-details">
                    <Grid item xs={12}>
                      <p className="name">{item.product_brand} : {item.product_name}</p>
                      <p>size us: {item.product_size}</p>
                      <p>amount: {item.product_qty}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={() => handleDeleteItem(index)}>
                        <img className="logobin" src="..\img\bin.png" alt="Logo bin" />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} className="cart-item-price">
                    <p>฿ {item.product_price}</p>
                  </Grid>
                </Grid>

              )
            })}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg ={6}>
        <Box  sx={{ p:5, mt:5, width: 'auto', height: '100%', bgcolor: '#F1ECE1' }}>
          <List>
            <ListItem>
              <ListItemText primary="Summarize" />
            </ListItem>
            <ListItem
              secondaryAction={
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  <a>฿ {getTotalPrice()}</a>
                </Typography>
              }
            >
              <ListItemText primary="Price" />
            </ListItem>

            <ListItem
              secondaryAction={
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  <a>฿ {shipping}</a>
                </Typography>
              }
            >
              <ListItemText primary="Estimated shipping" />
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                <a>฿ {getLastPrice()}</a>
              </Typography>
            </ListItem>
            <Divider />
            <ListItem
            className='PaymentChoice'
              secondaryAction={
                <RadioGroup
                  row
                  aria-label="payment"
                  name="row-radio-buttons-group"
                  value={paymentMethod}
                  onChange={e=>{setPaymentMethod(e.target.value);console.log(paymentMethod);}}
                >
                  <FormControlLabel value="credit" control={<Radio/>} label="Credit Card" />
                </RadioGroup>
              }>
              <ListItemText primary="Payment" />
            </ListItem>

            <form className='paymentbox'>
            {/* test card 5555555555554444 : MasterCard
            Visa : 4012888888881881 
            JCB : 3566002020360505
            */}
            <Grid xs={12} >
              <TextField
                label={cardType + " Card Number"}
                value={cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{ maxLength: 16 }}
                className='cardNumber'
              />
              <br />
            </Grid>
            <Grid xs={6}>
            <TextField
              label="Expiry Date"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              inputProps={{ maxLength: 5 }}
            />
            <br />
            </Grid>
            <Grid xs={6}>
            <TextField
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
              inputProps={{ maxLength: 3 }}
            />
            <br />
            </Grid>
            <Grid xs={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              inputProps={{ maxLength: 30 }}
            />
            <br />
            </Grid>
            <Grid xs={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              inputProps={{ maxLength: 30 }}
            />
            </Grid>
            
          </form>

            <ListItem
              className='ShippingChoice'
              secondaryAction={
                <RadioGroup
                  row
                  aria-label="shipping"
                  name="row-radio-buttons-group"
                  value={shippingMethod}
                  onChange={e=>{setShippingMethod(e.target.value);console.log(shippingMethod);}}
                >
                  <FormControlLabel value="standard" control={<Radio/>} label="Standard"/>
                  <FormControlLabel value="ems" control={<Radio/>} label="EMS" />
                </RadioGroup>
              }
            >
              <ListItemText primary="Shipping" />
            </ListItem>
          </List>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, ml: 1 }}
            disabled={!isCardNumberValid}
            onClick={() => {
              handleDeleteSelectedItems();
            }}
          >
            Pay now
          </Button>
        </Box>
      </Grid>
    </Grid>
    </MyCart>
  )
}
const MyNavFront = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [Cat,setCat] =useState(
    {
      data:[{
            title:"Men",
            subCat:{
                subcat1:["Shoes","Clothing","Accessories"],
                subcat2:["Adidas","Nike","Converse","New Balance"]
            }
        },{
            title:"Woman",
            subCat:{
                subcat1:["Shoes","Clothing","Accessories"],
                subcat2:["Adidas","Nike","Converse","New Balance"]
            }
        },{
            title:"Brand",
            subCat:{
                subcat1:["Popular","Brands"],
                subcat2:["Adidas","Nike","Converse","New Balance"]
            }
        },{
            title:"Sale",
            subCat:{
                subcat1:["Men's Product","Woman's Product","Shop All Sale products"],
                subcat2:["Shoes","Clothing","Accessories"]
            }
        }
      ]
    });
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchTodos = async () => {
        const results  = await axios.get('http://localhost:8080/product_detail');
          try{
              setProducts(results.data);
          }catch(err){
              console.log(err);
          }
        }
        fetchTodos();
      },[]);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };    

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    width: 'auto',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const [opendialogList, setOpendialogList] = useState([false,false,false,false]);

  const [selectedFilter, setSelectedFilter] = useState(
    {
      productType: '',
      productGender: '',
      productBrand: '',
      productPromotion: '',
    }
  );
  const handleClick1 = (gender,type) => {
    let types = '';
    if(type === 'Clothing'){
      types = 'Cloth';
    }else
      types = type;
    if(gender === 'Men'){
      setSelectedFilter({
        productType: types,
        productGender: 'M',
        productBrand: '',
        productPromotion: '',
      });
      navigate('/ProductPage/'+gender+'/'+types);
    }else if(gender === 'Woman'){
      setSelectedFilter({
        productType: types,
        productGender: 'F',
        productBrand: '',
        productPromotion: '',
      });
      navigate('/ProductPage/'+gender+'/'+types);
    }else if(type === 'Accessories'){
      setSelectedFilter({
        productType: 'Accessories',
        productGender: gender,
        productBrand: '',
        productPromotion: '',
      });
    }else if(type === 'Popular'){
      setSelectedFilter({
        productType: '',
        productGender: '',
        productBrand: '',
        productPromotion: 'Popular',
      });
    }else if(type === 'Brands'){
      setSelectedFilter({
        productType: '',
        productGender: '',
        productBrand: '',
        productPromotion: 'Brands',
      });
    }
  }
  
  const handleClick2 = (gender,type,brand) => {
    console.log(gender,type,brand);
    let types = '';
    let brands = '';
    if(type === 'Clothing')
      types = 'Cloth';
    else
      types = type;
    if(brand === 'New Balance')
      brands = 'Newbalance';
    else
      brands = brand;

    if(gender === 'Men'){
      setSelectedFilter({
        productType: types,
        productGender: 'M',
        productBrand: brands,
        productPromotion: '',
      });
      navigate('/ProductPage/'+gender+'/'+types+'/'+brands);
    }else if(gender === 'Woman'){
      setSelectedFilter({
        productType: types,
        productGender: 'F',
        productBrand: brands,
        productPromotion: '',
      });
      navigate('/ProductPage/'+gender+'/'+types+'/'+brands);
    }else if(gender==='Brand'){
      setSelectedFilter({
        productType: '',
        productGender: '',
        productBrand: brands,
        productPromotion: '',
      });
      navigate('/ProductPage/'+brands);
    }
  }
  
  //======================================  help/login  ==============================================
  const [istoken,setistoken] = useState(localStorage.getItem('token'));
  //const token = 'have';

  const logout = () =>{
    // delete the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    // redirect the user to the login page
    window.location.href = '/Front';
  }

  const [helpOption, setHelpOption] = useState("");
  const [signInOption, setSignInOption] = useState("");
  const [LoginInOption, setLoginInOption] = useState("");
  const setjoinus = (value) =>{
    localStorage.setItem('isJoinus',value);
  }

  const helpLinks = [
    { title: "Contact Us", url: "/ContactUs" },
    { title: "Order Status", url: "/OrderStatus" },
    { title: "Order History", url: "/OrderHistory" },
  ];

  const signInLinks = [
    { title: "Sign In", url: "/Login" },
    { title: "Join Us", url: "/Login" },
  ];

  const LoginInLinks = [
    { title: "Edit Profile", url: "/Profile" },
    { title: "Log Out", url: "/Front" },
  ];
  const [openCart, setOpenCart] = useState(false);
  // ============================================================================= Cart =======================================================================
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky"  style={{ background: '#B8AD93' }}  >
    {/*================================== help/login ====================================== */}
    <nav className = "help-login">
        <Select
          value={helpOption}
          onChange={(e) => {
            setHelpOption(e.target.value);
            // window.location.href = e.target.value;
          }}
          displayEmpty
          className="select"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Help
          </MenuItem>
          {helpLinks.map((link) => (
            <MenuItem key={link.title} value={link.url}>
              <Link to={link.url}>{link.title}</Link>
            </MenuItem>
          ))}
        </Select>

        {!istoken ? (
            <Select
            value={signInOption}
            onChange={(e) => {
                setSignInOption(e.target.value);
                // window.location.href = e.target.value;
            }}
            displayEmpty
            className="select"
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="" disabled>
                Sign In
            </MenuItem>
            {signInLinks.map((link) => (
                <MenuItem key={link.title} value={link.url}  >
                <Link to={link.url} onClick={() => setjoinus(link.option)} >{link.title}</Link>
                </MenuItem>
            ))}
            </Select>

        ) : (
          // ================================================= login/havetoken ======================================
            <Select
            value={LoginInOption}
            onChange={(e) => {
                setLoginInOption(e.target.value);
                // window.location.href = e.target.value;
            }}
            displayEmpty
            className="select"
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="" disabled>
                Profile
            </MenuItem>
            {LoginInLinks.map((link) => (
                <MenuItem key={link.title} value={link.url}>
                {link.title === "Log Out" ? (
                  <Link to={link.url} onClick={logout}>
                    {link.title}
                  </Link>
                ) : (
                  <Link to={link.url}>{link.title}</Link>
                )}
                </MenuItem>

            ))}
            </Select>
        )}
    </nav>
    {/*================================== logo men won brand sale ====================================== */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <IconButton onClick={e => {navigate('/Front')}}>
            <img src='..\img\logo.png' alt='logo' style={{width: '80px', height: '80px'}}/>
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
            </Menu>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Stack spacing={2} direction="row">
            {Cat.data.map((item,index) => {
              return(
                <div key={"div"+index}>
                <MenuItem
                key={"menu"+index}
                onMouseEnter={
                  e=>{
                    const openListCopy = [false,false,false,false];
                    openListCopy[index] = true;
                    setOpendialogList(openListCopy);
                    }
                }
                id="composition-button"
                aria-haspopup="true"
                color='light'
                >
                {item.title}
                </MenuItem>
                <MyDialog
                  key={"dialog"+index}
                  open={opendialogList[index]}
                  placement="bottom-start"
                  fullScreen
                >
                  <Box key={'box'+index} sx={{ mt:18,width: '100%', height: '100%', bgcolor: '#F1ECE1'}}>
                  <List key={'list'+index} 
                  onMouseLeave={
                  e=>{
                    const openListCopy = [false,false,false,false];
                    openListCopy[index] = false;
                    setOpendialogList(openListCopy);
                    }
                }>
                  
                  {item.subCat.subcat1.map((item2,index2) => {
                    return(
                      <>
                        <MenuItem key={"menu"+index+index2} onClick={e=>handleClick1(item.title, item2)}>
                        
                        <Typography key={"typography"+index+index2} color="#000000" variant="h3"  sx={{
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                          }} >
                          {" "}{item2}
                        </Typography>
                        </MenuItem>
                          {index===2 && index2===0 ? 
                          <Grid container style={{width:"50%"}}>
                            <Grid item xs={6}>
                              <Button key={"button adidas"} onClick={e=>handleClick2(item.title,"","Adidas")}>
                              <img style={{width:"50%"}} src=".\img\logoAdidas.png" alt="Logo adidas Image"/>
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button key={"button nike"} onClick={e=>handleClick2(item.title,"","Nike")}>
                              <img style={{width:"50%"}} src=".\img\logoNike.png" alt="Logo nike Image"/>
                              </Button>
                            </Grid>
                          </Grid>
                          :index===3 && index2=== 2 ?
                          <img className='nav-img-show' src=".\img\Fsale2.jpg" alt="Sale Image"/>
                          :item.subCat.subcat2.map((item3,index3) => {
                            return(
                              <>
                                <MenuItem key={"menu"+index+index2+index3} onClick={e=>handleClick2(item.title, item2, item3)}>
                                <Typography key={"typography"+index+index2+index3} color="#707070" variant="h6" >
                                  {item3}
                                </Typography>
                                </MenuItem>
                                {index === 2 && index2===1 && index3 === 3 && <img className='nav-img-show' src=".\img\3men.jpg" alt="Man Image"/>}
                              </>
                            )
                          })}
                      </>
                    )
                  })}
                  </List>
                  </Box>
                </MyDialog>
                </div>
              )
            })}
            </Stack>
          </Box>
          <Box >
          <Grid container>
            <Grid item xs={6}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid item xs={6}>
            <IconButton
              size="large"
              color="inherit"
              onClick={e=>{
                setOpenCart(!openCart);
                console.log(openCart);}}
            >
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            </Grid>
          </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Cart openCart={openCart} setOpenCart={setOpenCart} cart={cart} setCart={setCart}/>
    
    {location.pathname === '/' && <Front handleClick2={handleClick2}/> }
    {location.pathname === '/Front' && <Front handleClick2={handleClick2}/> }

    {/* ============================================== help/login ========================================================*/}
    {location.pathname === '/Login' && <Login/>}
    {location.pathname === '/Profile' && <Profile/> }

    {location.pathname === '/ContactUs' && <ContactUs/> }
    {location.pathname === '/OrderStatus' && <OrderStatus navigate={navigate} order={order} setOrder={setOrder}/> }
    {location.pathname === '/OrderStatussearch' && <OrderStatus_search order={order}/> }
    {location.pathname === '/OrderHistory' && <OrderHistory/> }

    {/* {location.pathname === '/products/:id' && <ProductDetail/> } */}
    {location.pathname === '/Product' && <ProductDetail setOpenCart={setOpenCart} setCart={setCart} cart={cart}/> }
    {location.pathname === '/ProductPage' && <ProductPage filter={selectedFilter} products={products}/>}
    {/* ============================================== help/login ========================================================*/}
    {location.pathname === '/ProductPage/Men/Shoes' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Men/Cloth' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Men/Accessories' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Woman/Shoes' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Woman/Cloth' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Woman/Accessories' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Converse' && <ProductPage filter={selectedFilter} products={products}/>}

    {location.pathname === '/ProductPage/Nike' && <ProductPage filter={selectedFilter} products={products}/>}
    {location.pathname === '/ProductPage/Adidas' && <ProductPage filter={selectedFilter} products={products}/>}
    {location.pathname === '/ProductPage/Newbalance' && <ProductPage filter={selectedFilter} products={products}/>}
    {location.pathname === '/ProductPage/Converse' && <ProductPage filter={selectedFilter} products={products} />}

    </Box>
  );
}

export default MyNavFront;