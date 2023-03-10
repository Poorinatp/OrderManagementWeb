// functional component with react for manging sql database

import React, { useState, useEffect } from 'react';
import './App.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Back-end/Home';
import { Button, Link } from '@mui/material';
import MyNavFront from './Front-end/MyNavFront';
import Front from './Front-end/Front';

const App = () => {
  return (
    <div>
      <MyNavFront/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Front/>}/>
        <Route path="/home" element={<Home />}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
