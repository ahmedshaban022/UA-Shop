import React ,{useState,useContext, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import { Globalstate } from '../../../GlobalState';


const OrderdDetails = () => {
    const state=useContext(Globalstate);
    const [history]=state.userAPI.history;
    const [orderDetails,setOrderderDetails]=useState([]);

    const params = useParams();

    useEffect(() => {
        if(params.id){
            history.forEach(item=>{
                if(item._id===params.id) setOrderderDetails(item)
            })
        }

    }, [params.id,history]);


    if(orderDetails.length===0) return null;
    return (
        <div className='history-page'>
          
                            <div style={{margin:"20px auto",width:"800px"}}>

                            <h3>Name : {orderDetails.address.recipient_name}</h3> 
                            <h3>Address : {orderDetails.address.line1 + " - " + orderDetails.address.city }</h3>
                            <h3>Postal Code : {orderDetails.address.postal_code}</h3>
                            <h3>Country Code : {orderDetails.address.country_code}</h3>
                            </div>
                  
                           
          

                <table style={{margin:"30px 0px"}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                           {
                               orderDetails.cart.map(item=>(
                                   <tr key={item._id}>
                                       <td><img src={item.images.url} alt=""/></td>
                                       <td>{item.title}</td>
                                       <td>{item.quantity}</td>
                                       <td>$ {item.price * item.quantity}</td>
                                   </tr>
                               ))
                           }
                    </tbody>
                </table>


        </div>
    );
}

export default OrderdDetails;
