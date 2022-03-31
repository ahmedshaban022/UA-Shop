import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Globalstate } from '../../../../GlobalState';

const Btnrender = ({product,deleteProduct}) => {
       const state = useContext(Globalstate);
       const [isAdmin]=state.userAPI.isAdmin;
       const addCart=state.userAPI.addCart;
       
    return (
        <div className='row_btn'>
            {
                isAdmin?
                <>
                    <Link id='btn_view' to={`/edit_product/${product._id}`}> Edit</Link>
                    <Link id='btn_buy' to={`#!`} onClick={()=>deleteProduct(product._id,product.images.public_id)}>Delete</Link>
                </> :
                <>
                
                <Link id='btn_view' to={`/details/${product._id}`}> View</Link>
                <Link id='btn_buy' to={`#!`} onClick={()=>addCart(product)}>Buy</Link>
                </>
            }
            </div>
    );
}

export default Btnrender;
