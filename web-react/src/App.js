import React from 'react';
import './App.css';
import Admin from './Back-end/Admin';
import Login_and_Help from './Front-end/Login_and_Help';
import {Route,Routes} from 'react-router-dom';
import Login from './Front-end/FrontComponent/Login';
import Product from './Back-end/Components/Product';
import Customer from './Back-end/Components/Customer';
import Order from './Back-end/Components/Order';
import Payment from './Back-end/Components/Payment';

const App = () => {
  return (
    <div>
      <Login_and_Help/>
       {/*<Routes>
          <Route path="/" element={<Admin/>}/>
          <Route path="/admin" element={<Admin/>}>
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
          </Route>
      </Routes>*/}
    </div>
  );
}

export default App;
