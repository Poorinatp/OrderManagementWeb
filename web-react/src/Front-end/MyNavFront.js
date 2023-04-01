import { useState } from 'react';
import NavItem from './FrontComponent/NavItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Container, IconButton, Menu, Toolbar, Typography, Button, Grid, MenuItem, Dialog, List, Badge, Paper, ListItemText, Divider, ListItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Stack } from '@mui/system';
import './MyNavFront.css';

import Login_and_Help from './Login_and_Help';
import Front from './Front';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import ProductTable from './FrontComponent/ProductTable';
import ProductPage from './ProductPage';

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
    [theme.breakpoints.up('sm')]: {
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
  const [openCart, setOpenCart] = useState(false);
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
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky"  style={{ background: '#B8AD93' }}  >
      <Login_and_Help/>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Front"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO 2
          </Typography>
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/Front"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO 1
          </Typography>
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
                  <Box key={'box'+index} sx={{ mt:13,width: '100%', height: '100%', bgcolor: '#F1ECE1'}}>
                  <List key={'list'+index} onMouseLeave={
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
                          <img style={{width:"100%"}} src=".\img\Fsale2.jpg" alt="Sale Image"/>
                          :item.subCat.subcat2.map((item3,index3) => {
                            return(
                              <>
                                <MenuItem key={"menu"+index+index2+index3} onClick={e=>handleClick2(item.title, item2, item3)}>
                                <Typography key={"typography"+index+index2+index3} color="#707070" variant="h6" >
                                  {item3}
                                </Typography>
                                </MenuItem>
                                {index === 2 && index2===1 && index3 === 3 && <img style={{width:"100%"}} src=".\img\3men.jpg" alt="Man Image"/>}
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
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  className='SeachBox'
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid item xs={4}>
            <IconButton
              size="large"
              color="inherit"
              onClick={e=>{setOpenCart(!openCart);console.log(openCart);}}
            >
              <Badge badgeContent={4} color="primary">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            </Grid>
          </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <MyCart
      fullScreen
      open={openCart}
      onClose={e=>setOpenCart(false)}
      placement="bottom-start"
    >
      <Button onClick={e=>setOpenCart(false)}>Close</Button>
    <Grid container sx={{width:"100%",height:"100%"}}>
      <Grid item xs={6}>
        <Box sx={{ p:10,mt:5, width: '100%', height: '100%', bgcolor: 'red', alignContent:'center' }}>
          <Typography variant="h5" gutterBottom sx={{  }}>
            Cart
          </Typography>
          <Typography variant="body1" paragraph sx={{ ml:5}}>
            There are no items in your cart
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ p:2,mt:5, width: '100%', height: '100%', bgcolor: 'blue', alignContent:'center' }}>
          <List>
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $0.00
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Shipping" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $0.00
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Tax" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $0.00
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $0.00
              </Typography>
            </ListItem>
          </List>
          <Button variant="contained" sx={{ mt: 2, ml: 1 }}>
            Checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
    </MyCart>
    
    {location.pathname === '/' && <Front/> }
    {location.pathname === '/Front' && <Front/> }
    
    {location.pathname === '/ProductPage/Men/Shoes' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Shoes/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Men/Cloth' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Cloth/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Men/Accessories' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Men/Accessories/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Woman/Shoes' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Shoes/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Woman/Cloth' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Cloth/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Woman/Accessories' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Nike' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Adidas' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Newbalance' && <ProductPage filter={selectedFilter}/>}
      {location.pathname === '/ProductPage/Woman/Accessories/Converse' && <ProductPage filter={selectedFilter}/>}

    {location.pathname === '/ProductPage/Nike' && <ProductPage filter={selectedFilter}/>}
    {location.pathname === '/ProductPage/Adidas' && <ProductPage filter={selectedFilter}/>}
    {location.pathname === '/ProductPage/Newbalance' && <ProductPage filter={selectedFilter}/>}
    {location.pathname === '/ProductPage/Converse' && <ProductPage filter={selectedFilter}/>}
    </Box>
  );
}

export default MyNavFront;