import React, { useState,useEffect,useRef } from "react"
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Collapse, Link, Popover, ThemeProvider, Typography, Dialog, List, ListItem, ListItemText } from '@mui/material';
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
              <List onMouseLeave={
              e=>{
                const openListCopy = [...opendialogList];
                openListCopy[index] = !opendialogList[index];
                setOpendialogList(openListCopy);
                }
            }>
              {item.subCat.subcat1.map((item2,index2) => {
                return(
                  <Paper key={"paper"+index2} sx={(index2===0) ? {mt:15,backgroundColor:'#F1ECE1',p:2} : {mt:2,backgroundColor:'#F1ECE1',p:2}}>
                    <MenuItem key={"menu2"+index2} onClick={e=>handleClick1(item.title, item2)}>
                    <Typography key={"typography"+index2} variant="h3" color="textSecondary" >
                      {item.title} {item2}
                    </Typography>
                    </MenuItem>
                  {item.subCat.subcat2.map((item3,index3) => {
                    return(
                        <MenuItem key={"menu3"+index3} onClick={e=>handleClick2(item.title, item2, item3)}>
                        <Typography key={"typography"+index3} variant="h4" >
                          {item3}
                        </Typography>
                        </MenuItem>
                    )
                  })}
                  </Paper>
                )
              })}
              </List>
            </MyDialog>
            </div>
          )
        })}
        </Stack>
      </div>
  );
}

export default NavItem;