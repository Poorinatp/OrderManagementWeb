import React from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Login from '../Login';

const Front = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper elevation={3}>
                <Login/>
            </Paper>
        </Box>
        
    );
}

export default Front;
