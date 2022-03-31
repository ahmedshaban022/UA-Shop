import React ,{useContext}from 'react';
import {Routes,Route, BrowserRouter, useNavigate} from 'react-router-dom'
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Notfound from './utils/NotFound/NotFound';
import Productdetails from './productDetails/ProductDetails';
import { Globalstate } from '../../GlobalState';
import Ordershistory from './history/OrdersHistory';
import OrderdDetails from './history/OrderdDetails';
import Categories from './categories/Categories';
import Createproduct from './createProduct/CreateProduct';
const Pages = () => {
  const state = useContext(Globalstate);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const navigate=useNavigate();

    return (
   
      <Routes>

            <Route path='/' exact element={<Products/>}/>
            <Route path='/details/:id' exact element={<Productdetails/>}/>
            <Route path='/login' exact element={isLogged ?<Products/>:<Login/>}/>
            <Route path='/register' exact element={isLogged ?<Products/>:<Register/>}/>
            <Route path='/cart' exact element={<Cart/>}/>
            <Route path='/history' exact element={isLogged ? <Ordershistory/>:<Login/>}/>
            <Route path='/history/:id' exact element={isLogged ? <OrderdDetails/>:<Login/>}/>
            <Route path='/category' exact element={isAdmin ? <Categories/>:<Login/>}/>
            <Route path='/create_product' exact element={isAdmin ? <Createproduct/>:<Login/>}/>
            <Route path='/edit_product/:id' exact element={isAdmin ? <Createproduct/>:<Login/>}/>

            <Route path='*'  element={<Notfound/>}/>
      </Routes>
   
     
    
    );
}

export default Pages;
