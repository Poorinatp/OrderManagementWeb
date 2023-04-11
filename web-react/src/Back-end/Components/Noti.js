import { Alert,Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Noti = ({location}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(location.state?.message || null);
    const status = location.state? location.state.status : null;
    const severity = status === "success" ? "success" : "error";
    
    
    
    useEffect(() => {
      let myArray = JSON.parse(localStorage.getItem("myArray")) || [];
        if (message) {
          myArray = [...myArray, message]; // Fix: create a new array with the previous values and add the new message
          console.log("myArray", myArray);
          console.log("message", message);
          localStorage.setItem("myArray", JSON.stringify(myArray));
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false); 
            setMessage(null);
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