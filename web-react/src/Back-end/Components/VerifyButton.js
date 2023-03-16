import { useContext,useState } from "react";
import { MyContext } from "../../MyContext";
import { Button, createTheme, Paper, Popper, ThemeProvider } from '@mui/material';
import axios from 'axios';

const VerifyButton = (props) => {
    const api = useContext(MyContext).api;
    const action = props.action;
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const mdTheme = createTheme();
    const handleVerify = e => {
        e.preventDefault();
        axios
        .get('http://localhost:8080/verify', { username:"admin", password:password })
        .then(response => {
            alert("Verify successful!");
            setOpen(false);
            setIsVerify(true);
        })
        .catch(error => {
            alert(action+" failed! Your password is incorrect.");
            console.log(error);
        });
    }

    const handelAction = e => {
        e.preventDefault();
        axios
        .post(api+action, { username:"admin", password:password })
        .then(response => {
            alert(action+" successful!");
        })
        .catch(error => {
            alert(action+" failed! Your password is incorrect.");
            console.log(error);
        });
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Popper open={open} placement="top" anchorEl={document.getElementById("verify-button")}>
                <Paper sx={{ p: 2, m: 1, width: 300 }}>
                    <p>Enter your password to {action}.</p>
                    <input type="password" onChange={e =>setPassword(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleVerify}>Verify</Button>
                </Paper>
            </Popper>
            {isVerify ? 
            <Button
                id="verify-button"
                variant="contained"
                color="primary"
                onClick={handelAction}
                sx={{ mt: 3, mb: 2 }}
            >
                {action}
            </Button>
            :
            <Button
                id="verify-button"
                variant="contained"
                color="primary"
                onClick={e=>{setOpen(!open)}}
                sx={{ mt: 3, mb: 2 }}
            >
                verify
            </Button>
            }
        </ThemeProvider>
    );
    }
export default VerifyButton;