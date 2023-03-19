// functional component with react for manging sql database
import { Route,Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Front from './Front-end/Front';
import Help from './Front-end/FrontComponent/Help';
import Login from './Front-end/FrontComponent/Login';
import Profile from './Front-end/Profile';
import ProductTable from './Front-end/FrontComponent/ProductTable';

import MyNavFront from './Front-end/MyNavFront';

import Admin from './Back-end/Admin';
import Product from './Back-end/Components/Product';
import Customer from './Back-end/Components/Customer';
import Order from './Back-end/Components/Order';
import Payment from './Back-end/Components/Payment';

const App = () => {

  return (
    <div>
      {/*<Login_and_Help/>*/}
       <Routes>
          <Route path="/" element={<Admin/>}/>
          <Route path="/admin" element={<Admin/>}>
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
