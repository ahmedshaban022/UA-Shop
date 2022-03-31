import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react';
import ProductsAPI from "./api/ProductsAPIs"
import UserAPI from "./api/UserAPI"
import CategoriesAPI from './api/CategoriesAPI';

export const Globalstate = createContext();


export const DataProvider =({children})=>{
    const [token,setToken] = useState(false);
   
useEffect(() => {
   const firstLogin = localStorage.getItem('firstLogin');
   if(firstLogin)
   {

   
    const refreshToken= async ()=>{
    const res = await axios.get('/user/refresh_token');
    setToken(res.data.accesstoken);
    setTimeout(()=>{
        refreshToken();
    }, 10 * 60 * 1000)
}
    refreshToken();
}
  
    
}, []);

    ProductsAPI();
    const state={
        token:[token,setToken],
        productsAPI:ProductsAPI(),
        userAPI:UserAPI(token),
        categoriesAPI:CategoriesAPI(),
    }

    return(
        <Globalstate.Provider value={state}>
            {children}
        </Globalstate.Provider>
    )
}
 