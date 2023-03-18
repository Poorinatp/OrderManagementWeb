// functional component with react for manging sql database
import { Route,Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Admin from './Back-end/Admin';
import Front from './Front-end/Front';
import Help from './Front-end/FrontComponent/Help';
import Login from './Front-end/FrontComponent/Login';
import Profile from './Front-end/Profile';
import ProductTable from './Front-end/FrontComponent/ProductTable';

import MyNavFront from './Front-end/MyNavFront';

const App = () => {

  return (
    <div>
      <MyNavFront/>
      <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/" element={<><Front/></>}/>
          <Route path="/Help" element={<><Help/></>}/>
          <Route path="/Login" element={<><Login/></>}/>
          <Route path="/Front" element={<><Front/></>}/>
          <Route path="/Profile" element={<><Profile/></>}/>
          <Route path="/ProductTable" element={<><ProductTable/></>}/>
      </Routes>
      <ProductTable />
    </div>
  );
}

export default App;
