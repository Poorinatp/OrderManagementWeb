// functional component with react for manging sql database
import { Route,Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Front from './Front-end/Front';
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
import Stock from './Back-end/Components/Stock';
import ReportChart from './Back-end/Components/ReportChart';
import AdminLogin from './Back-end/AdminLogin';
import ContactUs from './Front-end/Help/ContactUs';
import OrderStatus from './Front-end/Help/OrderStatus';
import OrderHistory from './Front-end/Help/OrderHistory';
import ProductDetail from './Front-end/FrontComponent/ProductDetail';
import OrderStatus_search from './Front-end/Help/OrderStatus_search';

const App = () => {

  return (
    <div>
      {/* <MyNavFront/> */}
      <Routes>
          <Route path="/" element={<MyNavFront/>}>

            <Route path="ContactUs" element={<><ContactUs/></>}/>
            <Route path="OrderStatus" element={<><OrderStatus/></>}/>
            <Route path="OrderStatus_search" element={<><OrderStatus_search/></>}/>
            <Route path="OrderHistory" element={<><OrderHistory/></>}/>

            <Route path="/Product" element={<ProductDetail/>} />

            <Route path="Login" element={<><Login/></>}/>
            <Route path="Front" element={<Front/>}/>
            <Route path="Profile" element={<><Profile/></>}/>
            <Route path="ProductPage" element={<ProductPage/>}>
              <Route path="Men" element={<ProductTable/>}>
                <Route path="Shoes" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
                <Route path="Cloth" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
                <Route path="Accessories" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
              </Route>
              <Route path='Woman' element={<ProductTable/>}>
                <Route path="Shoes" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
                <Route path="Cloth" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
                <Route path="Accessories" element={<ProductTable/>}>
                  <Route path="Nike" element={<ProductTable/>}/>
                  <Route path="Adidas" element={<ProductTable/>}/>
                  <Route path="Newbalance" element={<ProductTable/>}/>
                  <Route path="Converse" element={<ProductTable/>}/>
                </Route>
              </Route>
              <Route path="Nike" element={<ProductTable/>}/>
              <Route path="Adidas" element={<ProductTable/>}/>
              <Route path="Newbalance" element={<ProductTable/>}/>
              <Route path="Converse" element={<ProductTable/>}/>
            </Route>
          </Route>
          <Route path="/ordermanagement" element={<AdminLogin/>}/>
          <Route path="/admin" element={<Admin/>}>
            <Route path="product" element={<Product/>}/>
            <Route path="customer" element={<Customer/>}/>
            <Route path="order" element={<Order/>}/>
            <Route path="payment" element={<Payment/>}/>
            <Route path="stock" element={<Stock/>}/>
            <Route path="report" element={<ReportChart/>}>
              <Route path="currentMonth" element={<ReportChart/>}/>
              <Route path="lastQuarter" element={<ReportChart/>}/>
              <Route path="lastYear" element={<ReportChart/>}/>
            </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
