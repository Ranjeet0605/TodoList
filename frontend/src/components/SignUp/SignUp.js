import React, { Fragment, useState} from 'react';


import "../SignInandSignUp/Login.css"
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const navigate= useNavigate();
const [inputs,setInputs] = useState({email:"",username:"",password:""})
  const  changeHandler=(e)=>{
     const {name, value}  = e.target;
      setInputs({...inputs,[name]:value});
     
  }
  const submitHandler=async(e)=>{

    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`,inputs).then((response)=>{
        if(response.data.message==="signup successfully."){
         
          toast.success(response.data.message);
          
        }
       if(response.data.message==="user already exists"){
           toast.error(response.data.message);
          
       }
       navigate("/signIn");
       
        setInputs({
            email:" ",
            username:" ",
            password:" ",
        });
    })
    
     
  }

  return (
    <Fragment>
    <div className="LoginSignUpContainer">
    <ToastContainer />
    <div className="LoginSignUpBox">
            <div>
            <div className="login_signUp_toggle">
            <p >REGISTER</p>
        </div>
            </div>
        <div  className="loginForm">
        <div className="signUpName">
            <FaceIcon/>
            <input type="text" placeholder="Userame" required
            name='username'
                  onChange={changeHandler}
                />
        </div>
            <div className="loginEmail">
                <EmailIcon/>
                <input type="email" placeholder="Email" required 
                   name='email'
                   onChange={changeHandler}
                />
            </div>
            <div className="loginPassword">
                <LockOpenIcon/>
                <input type="password" placeholder='Password' required
                    name='password'
                    onChange={changeHandler}
                  />
            </div>
            
            <input type="submit"  value="Register" className='loginBtn'
              onClick={submitHandler}
            />
            </div>
            </div>
    </div>
   
   </Fragment>
  )
}

export default SignUp
