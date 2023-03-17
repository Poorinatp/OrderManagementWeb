import { Alert,Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Noti = ({location}) => {
    const [showAlert, setShowAlert] = useState(false);
    const message = location.state && location.state.message;
    const status = location.state && location.state.status;
    const severity = status === "success" ? "success" : "error";

    useEffect(() => {
        if (message) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    }, [message]);

    return (
        <Box>
        {showAlert && <Alert severity={severity} >{message}</Alert>}
        </Box>
    )
}

export default Noti;