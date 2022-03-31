import React,{useState,useContext, useEffect} from 'react';
import axios from 'axios';
import { Globalstate } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const initialState={
    product_id:'',
    title:'',
    price:0,
    description:'Dell ,Ideapad g5035 15 inch core i 7 12600H  32 Ram 3600 Hz ,Nvida 3050',
    content:'Dell ,Ideapad g5035 15 inch core i 7 12600H  32 Ram 3600 Hz ,Nvida 3050 Dell ,Ideapad g5035 15 inch core i 7 12600H  32 Ram 3600 Hz ,Nvida 3050',
    category:'',
    _id:''
}

const Createproduct = () => {
const state = useContext(Globalstate);
const [product,setProduct] = useState(initialState);
const [categories] = state.categoriesAPI.categories;
const [images,setImages] = useState(false);
const [loading,setLoading] =useState(false);
const [isAdmin] = state.userAPI.isAdmin;
const [token] = state.token;
const navigate= useNavigate();
const params=useParams();
const [products] = state.productsAPI.products;
const [onEdit,setOnEdit]=useState(false);
const [callBack,setCallBack]=state.productsAPI.callBack;

const styleUpload={
    display:images? "block" : "none"
}


    useEffect(() => {
       if(params.id){
           setOnEdit(true)
        products.forEach(product=>{
            if(product._id === params.id) {
                setProduct(product);
                setImages(product.images);
            }
        })
       }else{
        setProduct(initialState);
        setImages(false);
        setOnEdit(false)
    }
       
    }, [params.id,products]);

    const handleUpload= async (e)=>{
        e.preventDefault();
        try {
            if(!isAdmin) return toast.error("you are not an admin");

            const file = e.target.files[0];
            if(!file)return toast.error("File not exist");
            
            if(file.size > 1024 *1024) return toast.error("File size is larger than 1 MB");
           
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return toast.error("File format is incorrect");

            let formData = new FormData();
            formData.append('file',file);
            setLoading(true)
            const res = await axios.post('/api/upload',formData,{
                headers:{'content-type':'multipart/form-data',Authorization:token}
            });
            setLoading(false);
            setImages(res.data);

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleDestroy= async()=>{
        try {
            if(!isAdmin) return toast.error("you are not an admin");
            setLoading(true);
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}
            });
            setLoading(false);
            setImages(false)

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleOnChange =(e)=>{
        const {name,value} = e.target;
        setProduct({...product,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            if(!isAdmin) return toast.error('You are not an admin !');
            if(!images) return toast.error('No images Uplaoded !');
            let res;
            if(onEdit){
               res= await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                });
            }
            else{
                res = await axios.post('/api/products',{...product,images},{
                   headers:{Authorization:token}
               });

            }
            setCallBack(!callBack)
            toast.success(res.data.msg);
         
            navigate('/');
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div className='create_product'>
           <div className='upload'>
               <input type="file"  name='file' id="file_up" onChange={handleUpload}/>
               {
                   loading?  <div id='file_img' style={{top:"21%",left:"22%"}} ><Loading/></div> 
                   :
               <div id='file_img' style={styleUpload}>
                <img src={images?images.url:''} alt=''/>
                <span onClick={handleDestroy}>&times;</span>
               </div>
            }
           </div>

         <form onSubmit={handleSubmit}>
             <div className='row'>
                <label htmlFor='product_id'>Product ID</label>
                <input type='text' onChange={handleOnChange} name='product_id' id='product_id'
                 required value={product.product_id} disabled={onEdit}/>
             </div>

             <div className='row'>
                <label htmlFor='title'>Title</label>
                <input type='text' onChange={handleOnChange}  name='title' id='title'
                 required value={product.title}/>
             </div>

             <div className='row'>
                <label htmlFor='price'>Price</label>
                <input type='number' onChange={handleOnChange} name='price' id='price'
                 required value={product.price}/>
             </div>

             <div className='row'>
                <label htmlFor='description'>Description</label>
                <textarea type='text' onChange={handleOnChange} name='description' id='description'
                 required value={product.description} rows="5"/>
             </div>

             <div className='row'>
                <label htmlFor='content'>Content</label>
                <textarea type='text' onChange={handleOnChange} name='content' id='content'
                 required value={product.content} rows="7" />
             </div>

             <div className='row'>
                <label htmlFor='category'>Category </label>
                <select name='category' required onChange={handleOnChange} value={product.category}>
                    <option value=''>Select Category</option>
                    {
                        categories.map(category=>(
                            <option value={category._id} key={category._id}>
                                {category.name}
                                </option>
                        ))
                    }
                </select>
             </div>
                        <button type='submit'>{onEdit?"update":'Create'}</button>
         </form>

        </div>
    );
}

export default Createproduct;
