import React, { useState,useEffect,useRef } from "react"
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Collapse, Link, Popover, ThemeProvider, Typography, Dialog, List, ListItem, ListItemText, Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { blue, purple } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";


const MyButton = styled(Button)({
  width: 'fit-content',
});

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

const NavItem = (props) => {

    const catdata = props.catdata;
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedFilter, setSelectedFilter] = useState({
      productType: '',
      productGender: '',
      productBrand: '',
      productPromotion: '',
    });

    const updateFilter = (propertyName, propertyValue) => {
      setSelectedFilter((prevFilter) => ({
        ...prevFilter,
        [propertyName]: propertyValue,
      }));
    };

    const goaway = () => {
      navigate('/ProductPage/productTable', { state: { selectedFilter:selectedFilter } });
      //window.location.reload();
    }
    const handleClick1 = (gender, type) => {
      if(gender ==='Men'){
        updateFilter('productGender', 'Men');
        updateFilter('productType', type);
        //console.log(selectedFilter);
        
      }
      else if(gender ==='Women'){
        updateFilter('productGender', 'Women');
        updateFilter('productType', type);
        //console.log(selectedFilter);
        
      } 
      else if(gender==='Brand'){
      }
      else{
      };
      goaway();
    };

    const handleClick2 = (gender, type, detail) => {
      if(gender ==='Men'){
        updateFilter('productGender', 'Men');
        updateFilter('productType', type);
        updateFilter('productBrand', detail);
        //console.log(selectedFilter);
        
      }
      else if(gender ==='Women'){
        updateFilter('productGender', 'Women');
        updateFilter('productType', type);
        updateFilter('productBrand', detail);
        //console.log(selectedFilter);
        
      } 
      else if(gender==='Brand'){
      }
      else{
      };
      goaway();
    };

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opendialogList, setOpendialogList] = useState([false,false,false,false]);

  const handleMouseEnter = (event,index) => {
    //setAnchorEl(event.currentTarget);
    const openListCopy = [...opendialogList];
    openListCopy[index] = !opendialogList[index];
    setOpendialogList(openListCopy);
  };

  const handleMouseLeave = (index) => {
    //setAnchorEl(null);
    const openListCopy = [...opendialogList];
    openListCopy[index] = !opendialogList[index];
    setOpendialogList(openListCopy);
  };


  return (
      <div>
        <Stack spacing={2} direction="row">
        {catdata.data.map((item,index) => {
          return(
            <div key={"div"+index}>
            <MenuItem
            key={"menu"+index}
            onMouseEnter={
              e=>{
                const openListCopy = [...opendialogList];
                openListCopy[index] = !opendialogList[index];
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
              <Box sx={{ mt:13,width: '100%', height: '100%', bgcolor: '#F1ECE1'}}>
              <List onMouseLeave={
              e=>{
                const openListCopy = [...opendialogList];
                openListCopy[index] = !opendialogList[index];
                setOpendialogList(openListCopy);
                }
            }>
              
              {item.subCat.subcat1.map((item2,index2) => {
                return(
                  <>
                    <MenuItem key={"menu2"+index2} onClick={e=>handleClick1(item.title, item2)}>
                    
                    <Typography key={"typography"+index2} color="#000000" variant="h3"  sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      }} >
                      {" "}{item2}
                    </Typography>
                    </MenuItem>
                    {/*<Grid container>
                        <Grid item xs={6}>
                          <img src=".\img\logoadidas.png" alt="Logo adidas Image"/>
                        </Grid>
                        <Grid item xs={6}>
                          <img src=".\img\logonike.png" alt="Logo nike Image"/>
                        </Grid>
                    </Grid>*/}
                      {index===2 && index2===0 ? 
                      <Grid container style={{width:"50%"}}>
                        <Grid item xs={6}>
                          <img style={{width:"50%"}} src=".\img\logoadidas.png" alt="Logo adidas Image"/>
                        </Grid>
                        <Grid item xs={6}>
                          <img style={{width:"50%"}} src=".\img\logonike.png" alt="Logo nike Image"/>
                        </Grid>
                      </Grid>
                      :index===3 && index2=== 2 ?
                      <img style={{width:"100%"}} src=".\img\Fsale2.jpg" alt="Sale Image"/>
                      :item.subCat.subcat2.map((item3,index3) => {
                        return(
                          <>
                            <MenuItem key={"menu3"+index3} onClick={e=>handleClick2(item.title, item2, item3)}>
                            <Typography color="#707070" key={"typography"+index3} fontc variant="h6" >
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
      </div>
  );
}

export default NavItem;