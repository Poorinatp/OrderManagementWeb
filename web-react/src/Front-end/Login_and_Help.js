import React, { useState } from 'react'
import {Link, Route, Router,Routes} from 'react-router-dom';

import './Login_and_Help.css'

function Login_and_Help() {
    const [istoken,setistoken] = useState(localStorage.getItem('token'));
    //const token = 'have';
    const logout = () =>{
        // delete the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        // redirect the user to the login page
        window.location.href = '/Front';
      }
  return (
    <div >
        <nav>
            <ul>
                <li>
                    <Link to='/Help'>Help </Link>
                </li>
                <li>
                    {!istoken ? <Link to='/Login'>Login </Link > 
                            :   <Link to='/Profile'>Profile </Link > }
                </li>
                {istoken && <li><Link to='/Front' onClick={logout}> Logout </Link></li>}
            </ul>
        </nav>
    </div>
  )
}

export default Login_and_Help