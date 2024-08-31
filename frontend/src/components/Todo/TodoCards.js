import React from 'react'
import "./TodoCards.css"
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
const TodoCards = ({title,body,id,deleteId,updateTodo,updateId}) => {
  return (
    <div className="todo_cards_main">
        
            <h5>{title}</h5>
            <p> {body.split("",77)}... </p>
            <div className='icons'>
            <div className='icon_update' onClick={()=>{updateTodo(updateId)}}><GrDocumentUpdate/></div>
            <div  className='icon_delete' onClick={()=> {deleteId(id)}}><AiFillDelete/></div>
            
            </div>
    </div>
  )
}

export default TodoCards
