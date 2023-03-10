import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


const NavItem = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const title = props.title;
    const cat = props.Cat;
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
      <div>
        <MenuItem
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color='light'
        >
          {title}
        </MenuItem>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Stack spacing={2}>
                    {cat.subcat1.map((item,index) => {
                      return(
                        <Stack spacing={2} key={index}>
                        <MenuItem key={index} color='light' onClick={handleClose}>
                          <Typography variant="h5" textAlign="center">{item}</Typography>
                        </MenuItem>
                        {cat.subcat2.map((item,index) => {
                            return(
                              <MenuItem key={index} color='light' onClick={handleClose}>
                                <Typography variant="h7" textAlign="center">{item}</Typography>
                              </MenuItem>
                            )
                          }
                          )}
                        </Stack>   
                    )})}
                  </Stack>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}

export default NavItem;