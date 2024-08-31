import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import About from "./components/About/About"
import Login from './components/SignInandSignUp/Login';
import SignUp from './components/SignUp/SignUp';
import Todolist from './components/Todo/Todolist';
import { useDispatch } from 'react-redux';
import { authAcitons } from './Store';
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
   const id = sessionStorage.getItem("id");
   dispatch(authAcitons.login());
     console.log(id);
  },[])
  return (
    <React.Fragment>
    <Router>
    <Navbar/>

 
<Routes>
  <Route path='/' element={<Home/>}/> 
  <Route path='/about' element={  <About/>}/>
  <Route path='/signin' element={<Login/>}/>
  <Route path='/signup'element={<SignUp/>}/>
  <Route path='/todolist' element={<Todolist/>}/>
  </Routes>

  <Footer/>
  </Router>

  </React.Fragment>
  );
}

export default App;
