import React from 'react'
import {Link, Route, Router,Routes} from 'react-router-dom';

import './Login_and_Help.css'
import Help from './FrontComponent/Help'
import Login from './FrontComponent/Login';
import MyNavFront from './MyNavFront';
import Front from './Front';
import Profile from './Profile';

function Login_and_Help() {
    const token = localStorage.getItem('token');
    //const token = 'have';
    console.log("token = "+token);
    
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/Help'>Help </Link>
                </li>
                <li>
                    {!token ? <Link to='/Login'>Login </Link> 
                    :<Link to='/Profile'>Profile</Link> }
                </li>
            </ul>
        </nav>
        <MyNavFront/>
        <Routes>
            <Route path="/" element={<><Front/></>}/>
            <Route path="/Help" element={<><Help/></>}/>
            <Route path="/Login" element={<><Login/></>}/>
            <Route path="/Front" element={<><Front/></>}/>
        </Routes>
        
    </div>
  )
}

export default Login_and_Help