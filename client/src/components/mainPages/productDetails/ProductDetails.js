import React,{useContext,useState,useEffect} from 'react';
import { useParams ,Link} from 'react-router-dom';
import { Globalstate } from '../../../GlobalState';
import Productitem from '../utils/productItem/ProductItem';
const Productdetails = () => {
  
    const params=useParams();
    const state = useContext(Globalstate);
    const [prodcuts]=state.productsAPI.products;
    const addCart = state.userAPI.addCart;
    const [detailsProduct,setDetailsProduct]=useState([]);
 
    useEffect(() => {
        if(params.id){
            prodcuts.forEach(product=>{
                if(product._id === params.id)
                {
                   
                    setDetailsProduct(product)
                }
            })
        }
       
    }, [params.id,prodcuts]);

    if(detailsProduct.length===0) return null;
    return (
        <>
        <div className='detail'>
            <img src={detailsProduct.images.url} alt=''/>
            <div className='box-detail'>
                <div className="row">
                    <h2>{detailsProduct.title}</h2>
                    <h6>#id: {detailsProduct.product_id}</h6>
                </div>
                <span>$ {detailsProduct.price}</span>
                <p>{detailsProduct.description}</p>
                <p>{detailsProduct.content}</p>
                <p>Sold: {detailsProduct.sold}</p>
                <Link to={'/cart'} className='cart'
                onClick={()=>addCart(detailsProduct)}
                >Buy Now</Link>
            </div>

        </div>
        <div>
        <h2>Related prodcuts</h2>
        <div className='products'>
            {
                prodcuts.map(product=>{
                    return product.category ===detailsProduct.category
                    ? <Productitem key={product._id} product={product}/> :null
                })
            }
        </div>
        </div>
        </>
    );
}

export default Productdetails;
