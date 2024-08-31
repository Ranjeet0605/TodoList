import React, { useEffect, useState } from 'react'
import "./TodoCards.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
 

const Update = ({closeupdate,update}) => {
      useEffect(()=>{
        if(update){
          setInputs({title:update?.title,body:update?.body})
        }
      },[update]);
    const [inputs,setInputs] = useState({title:"",body:""});
    
    const changeHandler =(e)=>{
      console.log(e.target.value);
          const {name,value} = e.target;
          setInputs({...inputs,[name]:value});
    }




    

  const updateHandler = async()=>{
      
    // http://localhost:4000/
        await axios.put(`${window.location.origin}api/v2/updateTask/${update._id}`,{
        title:inputs.title,
        body:inputs.body
        }).then((response)=>{
        toast.success(response.data.message)
           })
   
  }

      

  return (
    <div className="update">
   
        <h4>Update Your Task</h4>
        <input type='text' className='todo-inputs' value={inputs?.title} name='title' onChange={changeHandler}/>
        <textarea className='todo-textarea' value={inputs?.body} name='body' onChange={changeHandler}/>
        <div>
            <button className='update_btn' onClick={updateHandler}>Update</button>
            <button className='delete_btn' onClick={()=>{closeupdate(false)}}>Close</button>
        </div>
    </div>
  )
}

export default Update
