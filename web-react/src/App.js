// functional component with react for manging sql database
import { Route,Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Front from './Front-end/Front';
import Help from './Front-end/FrontComponent/Help';
import Login from './Front-end/FrontComponent/Login';
import Profile from './Front-end/Profile';
import ProductTable from './Front-end/FrontComponent/ProductTable';
import ProductPage from './Front-end/ProductPage';

import MyNavFront from './Front-end/MyNavFront';

import Admin from './Back-end/Admin';
import Product from './Back-end/Components/Product';
import Customer from './Back-end/Components/Customer';
import Order from './Back-end/Components/Order';
import Payment from './Back-end/Components/Payment';

const App = () => {

  return (
    <div>
      <MyNavFront/>
      <Routes>
          <Route path="/" element={<><Front/></>}/>
          <Route path="/Help" element={<><Help/></>}/>
          <Route path="/Login" element={<><Login/></>}/>
          <Route path="/Front" element={<><Front/></>}/>
          <Route path="/Profile" element={<><Profile/></>}/>
          <Route path="/ProductTable" element={<><ProductTable/></>}/>
          <Route path="/ProductPage" element={<><ProductPage/></>}/>

          <Route path="/admin" element={<Admin/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/customer" element={<Customer/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </div>
  );
}

export default App;
