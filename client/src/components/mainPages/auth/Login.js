import axios from 'axios';
import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../utils/loading/Loading';


const Login = () => {
    const [user,setUser]=useState({
        email:'',
        password:''
    });
    const navigate=useNavigate();

    const onChangeInput= e=>{
        const {name,value}= e.target;
        setUser({...user,[name]:value});

    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        
        try {
            await axios.post('/user/login',{...user});
            localStorage.setItem('firstLogin',true);
            toast.success("Welcome");
            //    navigate("/");
            window.location.href='/';
        } catch (err) {
            toast.error(err.response.data.msg);
        }
   
    }
    return (
        <div className='login-page'>
           <form onSubmit={onSubmit}>
                <h2>Login</h2>
               <input type='email' onChange={onChangeInput} name='email' required placeholder='Email' value={user.email}/>
               
               <input type='password'onChange={onChangeInput} autoComplete="on" name='password' required placeholder='Password' value={user.password}/>
       
                <div className='row'>
                    <button type='submit'>Login</button>
                    <Link to={'/register'}>Register</Link>
                </div>
           </form>
            
        </div>
    );
}

export default Login;
