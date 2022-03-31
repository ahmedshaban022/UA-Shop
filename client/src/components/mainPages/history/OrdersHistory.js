import React,{useContext, useEffect} from 'react';
import {Globalstate} from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Ordershistory = () => {
    const state=useContext(Globalstate);
    const [history,setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token]= state.token;

    
    useEffect(() => {
        if(token){
            const getHistory=async()=>{
                if(isAdmin){
                 const res = await axios.get('/api/payment',{headers:{Authorization:token}});
                   setHistory(res.data);
                    
                }
                else{
 
                    const res = await axios.get('/user/history',{headers:{Authorization:token}});
                    setHistory(res.data.history);
                 }
             }
             getHistory();
        }
  
     }, [token,isAdmin,setHistory]);
 
 

 
    return (
        <div className='history-page'>
           <h2>History</h2>

           <h4>You have {history.length} ordered</h4>

            <div >
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Payment ID</th>
                            <th>Date of Purchased</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item,index)=>(
                                <tr key={item._id}>
                                    <td>{index+1}</td>
                                    <td>{item.paymentID}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${item._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Ordershistory;
