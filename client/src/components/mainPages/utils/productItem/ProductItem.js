import React from 'react';
import Btnrender from './BtnRender';


const Productitem = ({product,isAdmin,deleteProduct,handleCheck}) => {
    


    return (
        <div className='product_card'>
            {
                isAdmin && <input type='checkbox' checked={product.checked}
                onChange={()=>handleCheck(product._id)}/>
            }
             <img src={product.images.url} alt=""/> 
           
            <div className='product-box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>

            </div>
           <Btnrender product={product} deleteProduct={deleteProduct}/>
        </div>
    );
}

export default Productitem;
