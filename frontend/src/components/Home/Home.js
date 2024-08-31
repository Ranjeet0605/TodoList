import React from 'react'
import  "./Home.css"
import {Link} from "react-router-dom"
const  Home=()=> {
  return (
    <div className="home_main_container">
       <div className="text_content">
        <h1>Organize your <br/> work and life, finally . </h1>
        <p>Become focused, organized, and calm with <br/> todo app. The World's #1 task manager app.</p>
       <Link to='/todolist'>
        <button >Make Todo List</button>
        </Link>
       </div>

    </div>
  )
}

export default Home;
