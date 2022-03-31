import React ,{useContext}from 'react';
import { Globalstate } from '../../../GlobalState';

const Loadmore = () => {
    const state=useContext(Globalstate);
    const [page,setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;
    

    return (
        <div className='load_more'>
            {
                result.length < page * 9 ? ""
                :<button onClick={e=>setPage(page+1)}>Load more</button>
            }
        </div>
    );
}

export default Loadmore;
