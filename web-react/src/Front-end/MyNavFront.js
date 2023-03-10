import * as React from 'react';
import Stack from '@mui/material/Stack';
import NavItem from './FrontComponent/NavItem';

export default function MyNavFront() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [Cat,setCat] =React.useState(
    {
        Men:{
            title:"Men",
            subCat:{
                subcat1:["Shoes","Clothing","Accessories"],
                subcat2:["adidas","Nike","converse","new balance"]
            }
        },
        Woman:{
            title:"Woman",
            subCat:{
                subcat1:["Shoes","Clothing","Accessories"],
                subcat2:["adidas","Nike","converse","new balance"]
            }
        },
        Brand:{
            title:"Brand",
            subCat:{
                subcat1:["Popular","Brands"],
                subcat2:["adidas","Nike","converse","new balance"]
            }
        },
        Sale:{
            title:"Sale",
            subCat:{
                subcat1:["Shoes","Clothing","Accessories"],
                subcat2:["adidas","Nike","converse","new balance"]
            }
        }
    })
    const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }

    setOpen(false);
    };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  

  return (
    <Stack direction="row" spacing={2}>
        {Cat.Name.map((item,index) => {return(<NavItem key={index} Cat={Cat.SubCat[index]} title={Cat.Name[index]}/>)})}
    </Stack>
  );
}