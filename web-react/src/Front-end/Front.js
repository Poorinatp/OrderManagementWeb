import React from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Login from '../Login';

const Front = () => {
    const token = localStorage.getItem('token');
    console.log("token = "+token);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper elevation={3}>
                {token ? <h1>Logged in</h1> : <h1>Not logged in</h1>}
                <Login/>
            </Paper>
        </Box>
        
    );
}

export default Front;
