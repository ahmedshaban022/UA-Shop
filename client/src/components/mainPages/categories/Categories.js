import axios from 'axios';
import React,{useState,useEffect, useContext} from 'react';
import { toast } from 'react-toastify';
import { Globalstate } from '../../../GlobalState';

const Categories = () => {

    const state = useContext(Globalstate);
    const [categories]= state.categoriesAPI.categories;
    const [category,setCategory] = useState('');
    const [token] =state.token;
    const [callback,setCallBack] =state.categoriesAPI.callback;
    const [onEdit,setOnEdit]=useState(false);
    const [id,setID]=useState('');

    const createCategory= async(e)=>{
        e.preventDefault();
        try {
            if(onEdit)
            {
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers:{Authorization:token}
                });
                toast.success(res.data.msg)
            }
            else{

                const res = await axios.post('/api/category',{name:category},{
                    headers:{Authorization:token}
                });
                setCategory('');
                toast.success(res.data.msg)
            }
            setOnEdit(false)
            setCallBack(!callback);
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    const editCategory= async (id,name)=>{
        setID(id);
        setCategory(name);
        setOnEdit(true);

    }
    const deleteCategory =async(id)=>{
        try {
            const res = await axios.delete(`/api/category/${id}`,{headers:{Authorization:token}});
        toast.success(res.data.msg);
        setCallBack(!callback)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <div className='categories'>
            <form onSubmit={createCategory}>
                <label htmlFor='category'>Category</label>
                <input type='text' name="category" value={category} required 
                onChange={e=>setCategory(e.target.value)}
                />
                <button type='submit'>{onEdit?'Update':'Create'}</button>
            </form>

            <div className='col'>
                {
                    categories.map(category=>(
                        <div className='row' key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={()=>editCategory(category._id,category.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(category._id)}>Delete</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Categories;
