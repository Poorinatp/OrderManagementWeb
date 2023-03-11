// functional component with react for manging sql database

import React, { useState, useEffect } from 'react';
import './App.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Back-end/Home';
import { Button, Link } from '@mui/material';
import MyNavFront from './Front-end/MyNavFront';
import Login_and_Help from './Front-end/Login_and_Help';

const App = () => {
  return (
    <div>
      <Login_and_Help/>
    </div>
  );
}

export default App;
