import React, { Fragment } from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './styles/index.css'
import Cart from './pages/Cart'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import OrderSummry from './pages/OrderSummry'
import OrderDetails from './pages/OrderDetails'
import AllOrders from './pages/AllOrders'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Wishlist from './pages/Wishlist'
import CustomPizza from './pages/CustomPizza'
import Address from './pages/Address'
import Admin from './pages/Admin'
import AdminOrders from './pages/AdminOrders'
import AddProduct from './pages/AddProduct'
const App = () => {
    return (
        
        <Router>
            <Fragment>
            <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/shipping" element={<Shipping/>}/>
              <Route path="/payment" element={<Payment/>}/>
              <Route path="/order" element={<OrderSummry/>}/>
              <Route path="/order/:id" element={<OrderDetails/>}/>
              <Route path="/orders" element={<AllOrders/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/wishlist" element={<Wishlist/>}/>
              <Route path='/custom-pizza' element={<CustomPizza/>}/>
              <Route path="/your-address" element={<Address/>}/>
              <Route path='/admin-side' element={<Admin/>}/>
              <Route path='/admin-orders' element={<AdminOrders/>}/>
              <Route path='/add-product' element={<AddProduct/>}/>
            </Routes>
             </main>
            </Fragment>
        </Router>
         
        
    )
}

export default App
