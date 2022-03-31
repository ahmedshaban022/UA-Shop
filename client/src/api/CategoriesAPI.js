import axios from 'axios';
import React ,{useState,useEffect}from 'react';

const CategoriesAPI = () => {
    const [categories,setCategories] = useState([]);
    const [callback,setCallBack] = useState(false);


    useEffect(()=>{
        const getCategories = async ()=>{
            const res = await axios.get('/api/category');
            setCategories(res.data);
        }
        getCategories()
    },[callback])
    return {
        categories:[categories,setCategories],
        callback: [callback,setCallBack] ,
    }
}

export default CategoriesAPI;
