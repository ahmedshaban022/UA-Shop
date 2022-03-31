
import axios from 'axios';
import React,{useContext, useState} from 'react';
import { toast } from 'react-toastify';
import { Globalstate } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import Productitem from '../utils/productItem/ProductItem';
import Filters from './Filters';
import Loadmore from './LoadMore';

const Products = () => {
    const state = useContext(Globalstate);
    const [products,setProducts] = state.productsAPI.products;
    const [isAdmin]=state.userAPI.isAdmin;
    const [token] = state.token;
    const [callBack,setCallback]= state.productsAPI.callBack;
    const [loading,setLoading] =useState(false);
    const [isChecked,setIsChecked]=useState(false);

    const handleCheck=(id)=>{
       products.forEach(product => {
           if(product._id === id) product.checked = !product.checked;
       });
       setProducts([...products]);
    }

    const deleteProduct= async(id,public_id)=>{
       
        try {
            setLoading(true);
            await axios.post('/api/destroy',{public_id},{
                headers:{Authorization:token}
            });

           await axios.delete(`/api/products/${id}`,{public_id},{
                headers:{Authorization:token}
            });
            toast.success('Deleted Successfully');
            setCallback(!callBack);
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data.msg)
        }

    }

    const checkAll=()=>{
      products.forEach(product=>{
          product.checked = !isChecked
      });
      setIsChecked(!isChecked)
      setProducts([...products]) 
    }

    const deleteAll=async()=>{
       if(window.confirm('Warrning you will delete the checked products !!')){
        products.forEach(product=>{
            if(product.checked)  deleteProduct(product._id,product.images.public_id);
          });
      
       }
       else{
           return false
       }
    }

    if(loading) return <div><Loading/></div>
    return (
        <>
        <Filters />
        {
            isAdmin && 
            <div className='delete-all'>
                <span>Select all</span>
                <input type="checkbox" checked={isChecked} onChange={checkAll} />
                <button onClick={deleteAll}> Delete All</button>
            </div>
        }
        <div className='products'>
          {
              products.map(product=>{
                  return <Productitem key={product._id} product={product} isAdmin={isAdmin} 
                  deleteProduct={deleteProduct} handleCheck={handleCheck}/>
                })
            }
        </div>
        <Loadmore/>
        {products.length === 0 && <div className='loading-products'>
            <Loading/>
            </div>
            }
            </>
    );
}

export default Products;
