import axios from 'axios';
import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../utils/loading/Loading';


const Register = () => {
    const [user,setUser]=useState({
        email:'',
        password:'',
        name:''
    });
    const navigate=useNavigate();

    const onChangeInput= e=>{
        const {name,value}= e.target;
        setUser({...user,[name]:value});

    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        
        try {
            await axios.post('/user/register',{...user});
            localStorage.setItem('firstLogin',true);
            toast.success("Registration Successful")
        //    navigate("/");
        window.location.href='/';
        } catch (err) {
            toast.error(err.response.data.msg);
        }
   
    }
    return (
        <div className='login-page'>
           <form onSubmit={onSubmit}>
           <h2>Register</h2>
               <input type='text' onChange={onChangeInput} name='name' required placeholder='Name' value={user.name}/>
               <input type='email' onChange={onChangeInput} name='email' required placeholder='Email' value={user.email}/>
               
               <input type='password'onChange={onChangeInput} autoComplete="on" name='password' required placeholder='Password' value={user.password}/>
       
                <div className='row'>
                    <button type='submit'>Register</button>
                    <Link to={'/login'}>Login</Link>
                </div>
           </form>
            
        </div>
    );
}

export default Register;
