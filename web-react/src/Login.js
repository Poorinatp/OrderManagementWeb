import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const api = 'http://localhost:8080/';


const Login = () => {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState("")
    const [zipcode, setzipcode] = useState(0)
    const [username, setusername] = useState("");
    const [password, setpassword] = useState(0);
    const [email, setemail] = useState("");
    const [isJoinus, setisJoinus] = useState(false);
    
    const handleSubmit = e => {
        if(isJoinus){
        e.preventDefault()
        console.log("fname = "+fname, "lname = "+lname, "address = "+address, "phone = "+phone, "zipcode = "+zipcode)
            axios
            .post(api+'signup', { username:username, password:password, email:email, fname:fname, lname:lname, address:address, phone:phone, zipcode:zipcode })
            .then(response => {
                console.log(response)
            })
        }else{
            console.log("fname = "+fname, "lname = "+lname, "address = "+address, "phone = "+phone, "zipcode = "+zipcode)
            axios
            .post(api+'login', { username:username, password:password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log(response)
            })
        }
    }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">
            Enter your email to
            <Link href="#" onClick={e=>setisJoinus(true)}>join us</Link>. or <Link href="#" onClick={e=>setisJoinus(false)}>Sign in</Link>.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                id="username"
                onChange={e => {setusername(e.target.value)}}
            />
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
            {isJoinus && (
                <React.Fragment>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => {setemail(e.target.value)}}
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="name"
                    name="fname"
                    onChange={e => {setfname(e.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lname"
                    label="surname"
                    id="lname"
                    onChange={e => {setlname(e.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    onChange={e => {setphone(e.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="address"
                    id="address"
                    onChange={e => {setaddress(e.target.value)}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="zipcode"
                    label="postal code"
                    id="zipcode"
                    onChange={e => {setzipcode(e.target.value)}}
                />
                </React.Fragment>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isJoinus ? "Join us" : "Sign in"}
            </Button>
            <Typography align='center' variant="h5">
                {isJoinus ? 
                <Link href="#" variant="body2" onClick={e=>setisJoinus(false)}>{"Sign in"}</Link>
                :<Link href="#" variant="body2" onClick={e=>setisJoinus(true)}>{"Join us"} </Link>}
            </Typography>
          </Box>
        </Box>
      </Container>
    )
}
export default Login