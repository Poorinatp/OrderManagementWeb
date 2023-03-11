import React from 'react'
import {Link, Route, Router,Routes} from 'react-router-dom';

import './Login_and_Help.css'
import Help from './FrontComponent/Help'
import Login from './FrontComponent/Login';
import MyNavFront from './MyNavFront';
import Front from './Front';

function Login_and_Help() {
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/Help'>Help </Link>
                </li>
                <li>
                    <Link to='/Login'>Login </Link>
                </li>
            </ul>
        </nav>
        <MyNavFront/>
        <Routes>
            <Route path="/Help" element={<><Help/></>}/>
            <Route path="/Login" element={<><Login/></>}/>
            <Route path="/Front" element={<><Front/></>}/>
        </Routes>
        
    </div>
  )
}

export default Login_and_Help