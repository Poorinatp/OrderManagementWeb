import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, FormControl, Paper, Stack, ThemeProvider } from '@mui/material';

const api = 'http://localhost:8080/';

const AdminLogin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        axios//ล็อคอิน
        .post(api+'loginAdmin', { username:username, password:password })
        .then(response => {
            const token = response.data.token;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', username);
            navigate('/Admin');
            alert("Login successful!");
        })
        .catch(error => {
            console.log(error);
            alert("Login failed! Your username or password is incorrect.");
        });
    }
    return (
        <ThemeProvider theme={
            createTheme(
                {
                    palette: {
                    backgroundColor: '#66b3ff',
                    },
                }
            )
        }>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            background: '#66b3ff',
          }}
        >
            <FormControl>
            <Stack spacing={3} alignItems="center">
                <AccountCircleIcon sx={{ fontSize: 100 }} />
                <Typography mb={3} component="h1" variant="h5">
                    ADMIN LOGIN
                </Typography>
            <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 500, flexGrow: 1 }}>
            <Stack spacing={2} alignItems="center" direction="row">
            <PersonIcon />
            <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                id="username"
                onChange={e => {setusername(e.target.value)}}
            >
            </TextField>
            </Stack>
            </Paper>
            <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 500, flexGrow: 1 }}>
            <Stack spacing={2} alignItems="center" direction="row">
            <LockIcon />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {setpassword(e.target.value)}}
            />
            </Stack>
            </Paper>
            <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                LOG IN
            </Button>
            </Stack>
            </FormControl>
        </Box>
        </ThemeProvider>
    )
}
export default AdminLogin