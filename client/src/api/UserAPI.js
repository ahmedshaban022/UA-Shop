import React,{useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios'
const UserAPI = (token) => {
    const [isLogged,setIsLogged]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [cart,setCart]= useState([]);
    const [history,setHistory]=useState([]);
   


    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try {
                    const res = await axios.get('/user/infor',{headers:{Authorization:token}});
                    
                   setIsLogged(true);
                   res.data.role===1?setIsAdmin(true):setIsAdmin(false);
                   setCart(res.data.cart);
                  
                } catch (err) {
                    toast.error(err.response.data.msg)
                }
            }
            getUser()
        }

    },[token]);


    const addCart = async (product)=>{
        if(!isLogged) return toast.info('Please Login to continue buying');

        const check = cart.every(item=>{
            return item._id !== product._id
        });
        if(check){
            setCart([...cart,{...product,quantity:1}]);
            const res =await axios.patch('/user/addcart',{cart:[...cart,{...product,quantity:1}]},
            {headers:{Authorization:token}
            });
            toast.info(res.data.msg);
        }else{
            toast.warning("This product has been added to cart")
        }
    }



    return {
        isAdmin:[isAdmin,setIsAdmin],
        isLogged:[isLogged,setIsLogged],
        cart:[cart,setCart],
        addCart:addCart,
        history:[history,setHistory]
    }
}

export default UserAPI;
