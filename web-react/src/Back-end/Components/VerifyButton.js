import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { Button, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';

const VerifyButton = (props) => {
    const api = useContext(MyContext).api;
    const action = props.action;
    const password = props.password;
    const mdTheme = createTheme();
    const handleVerify = e => {
        e.preventDefault();
        axios
        .post(api+'verify', { username:"poom", password:password })
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleVerify}
                sx={{ mt: 3, mb: 2 }}
            >
                Verify
            </Button>
        </ThemeProvider>
    );
    }
export default VerifyButton;