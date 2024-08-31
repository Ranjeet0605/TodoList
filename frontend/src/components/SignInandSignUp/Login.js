import React, { Fragment, useState} from 'react';
import "./Login.css";

import { Link, useNavigate} from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authAcitons } from '../../Store';
const  Login=()=> {
  const dispatch = useDispatch();
    const [inputs,setInputs] = useState({email:"",password:"",})
    const navigate = useNavigate();
   const changeHandler=(e)=>{
         const {name, value} = e.target;
           setInputs({...inputs,[name]: value});
   }
  const submitHandler=async(e)=>{
    e.preventDefault();
 
 await axios.post(`${window.location.origin}/api/v1/login`,inputs).then((response)=>{

console.log(response.data.others)
         sessionStorage.setItem("id",response.data.others._id)
      toast.success("sign in successfully");
      dispatch(authAcitons.login());
         navigate("/todolist")
         setInputs({
          email:"",
          password:"",
    })
    
      
  })



  }
 
    
  return (
   <Fragment>
    
    <div className="LoginSignUpContainer">
      <ToastContainer/>
        <div className="LoginSignUpBox">
            <div>
        <div className="login_signUp_toggle">
            <p >LOGIN</p>
        </div>
            </div>
             <div className="loginForm">
              <div className="loginEmail">
                <EmailIcon/>
                <input type="email" placeholder="Email" required 
                name='email'
                value={inputs.email}
                onChange={changeHandler}
                />
            </div>
            <div className="loginPassword">
                <LockOpenIcon/>
                <input type="password" placeholder='Password' required
               name='password'
               value={inputs.password}
                onChange={changeHandler}
              />
            </div>
            
            <input type="submit"  value="Login" className='loginBtn' onClick={submitHandler}/>
            </div>
        </div>
    </div>
   
   </Fragment>
  )
}

export default Login