import {useState,useEffect} from 'react';
import axios from 'axios'
const Productsapis = () => {
    const [products,setProducts]=useState([]);
    const [callBack,setCallBack]=useState(false);
    const [category,setCategory]=useState('');
    const [sort,setSort]=useState('');
    const [search,setSearch]=useState('');
    const [page,setPage]=useState(1);
    const [result,setResult]=useState(0);

    useEffect(()=>{
        const getProducts= async ()=>{
            const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
            setProducts(res.data.products);
            setResult(res.data.products);
        }
        getProducts()
    },[callBack,category,sort,page,search])

  
    return {products: [products,setProducts],
            callBack: [callBack,setCallBack],
            category:[category,setCategory],
            sort:[sort,setSort],
            search:[search,setSearch],
            page:[page,setPage],
            result:[result,setResult],
            }
}

export default Productsapis;
