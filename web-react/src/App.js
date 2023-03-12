// functional component with react for manging sql database

import React from 'react';
import './App.css';
import Admin from './Back-end/Admin';
import Login_and_Help from './Front-end/Login_and_Help';
import {Route,Routes} from 'react-router-dom';
import Login from './Front-end/FrontComponent/Login';

const App = () => {
  return (
    <div>
      <Login_and_Help/>
      <Routes>
          <Route path="/" element={<Admin/>}/>
          <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
