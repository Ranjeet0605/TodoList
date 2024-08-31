import React, { useEffect, useState } from 'react'
import "./Todolist.css"
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';

import { useSelector,useDispatch } from 'react-redux';

import axios from 'axios';
let id = sessionStorage.getItem("id");
console.log(id);
let updateArray = [];
const Todolist =()=> {
  const [input,setInput] = useState({title:"", body:""})
  const[listArray, setListArray] = useState([])
  const[displayshow, setDisplayshow] = useState(false);
 
  const inputHandler=(e)=>{
    const {name, value} = e.target;


    setInput({...input,[name]:value})
  }
  const submitHandler = async()=>{
    if(input.title==="" || input.body===""){
      toast.error("Title or Body can't be Empty");
    }else{
      if(id){
        await axios.post(`${window.location.origin}/api/v2/addTask`,{
          title:input.title,
          body:input.body,
          _id:id
        }).then((response)=>{
          console.log(response);
        })
        
        setInput({title:"",body:""});
        toast.success("Your Task  is Added");
       
       }
       else{
       
        setInput({title:"",body:""});
       
        toast.error("Your Task is Not Saved ! Please SignUp")
       }
      
    }
  }

 
    const show = ()=>{
        document.getElementById("textArea").style.display='block'
    }
    const updateHandler = (id)=>{
    setDisplayshow(true)
    updateArray = listArray[id];
    console.log(id);
       
    }
    const deleteHandler = async(cardId)=>{
       if(id){
     await  axios.delete(`${window.location.origin}/api/v2/DeleteTask/${cardId}`,{data:{id:id},}).then((response)=>{
       console.log(response);
       toast.success(response.data.message)
     })
    }else{
      toast.error("Please signup first");
    }
      
    }
   const  displayshowHandler  =(show)=>{
      setDisplayshow(show);
   }
  useEffect(()=>{
    if(id){
     const fetch = async()=>{
      await axios.get(`${window.location.origin}/api/v2/getTask/${id}`).then((response)=>{
        setListArray(response.data.list);
 
      });
   
  }
  fetch();
}else{
  toast.error("Please signup first!")
}
  },[submitHandler])
  return (
   <>
    <div className="todo">
      <ToastContainer />
        <div className="todo_main_container">
            <div className="todo_inputs">
              <input type='text' 
              placeholder='TITLE' 
              name='title'
              value={input.title}
              onClick={show}
              className='title'
              onChange={inputHandler}
              />  
              <textarea 
              id='textArea'
              type="text" placeholder='body'
              className='text_area'
              name='body'
              value={input.body}
              onChange={inputHandler}
              />
               </div>
              <div className="btn">
              <button className='addItems' onClick={submitHandler}>Add</button>
              </div>
           
        </div>

        <div className="todo_body">
            <div className="todo_container">
              {listArray?.map((item,index)=>(
                <>
                <TodoCards title={item.title} body={item.body} id={item._id} deleteId={deleteHandler} updateTodo={updateHandler} updateId={index}/>
                </>
              ))}
            </div>
        </div>
    </div>
    <div className="todo_update"  style={{display:displayshow===true?"block": "none"}}>
      <div className="container_update">
        <Update closeupdate={displayshowHandler}  update={updateArray} userId={id}/>
      </div>
    </div>
    </>
    
  )
}

export default Todolist
