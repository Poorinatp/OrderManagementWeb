import { Box, Button, Fade, Grid, Paper, Popper, TextField, Typography } from '@mui/material';
import React , { useState } from 'react';
import VerifyButton from './VerifyButton';

const MyOption = ({ value, label }) => {
    const [password, setPassword] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };
    return (
        <Box sx={{mt:200,  width: 200 }}>
            <Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                <Paper>
                    <Typography sx={{ p: 1 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    label="Verify your password"
                                    defaultValue={"please enter your password"}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <VerifyButton action="delete" password={password}/>
                            </Grid>
                        </Grid>
                    </Typography>
                </Paper>
                </Fade>
            )}
            </Popper>
            <Paper sx={{ p: 2, display: 'flex',alignContent:'center', alignItems: 'center', width: 200 }}>
                <Button onClick={handleClick}>Delete</Button>
            </Paper>
        </Box>
    );
};

export default MyOption;