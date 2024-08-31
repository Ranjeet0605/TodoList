import React, { useEffect, useState } from "react";
import logo from "../image/logo.jpg";
import { Link } from "react-router-dom";
import { IoMdBookmarks } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { authAcitons } from "../../Store";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isMobileView,setIsMobileView] = useState(window.innerWidth<=600)
 
const logout = () => {
    sessionStorage.clear("id");
    dispatch(authAcitons.logout());
    if(isMobileView) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = ()=>{
    if(isMobileView) setIsMenuOpen(false);
  }
  useEffect(()=>{
    const handleResize = ()=>{
      setIsMobileView(window.innerWidth<=600);
    };
    window.addEventListener("resize",handleResize);
    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  },[])
  return (
    <div className="main_container">
      <Link to="/" onClick={closeMenu}>
        <span>
          <div className="home_icon">
            <IoMdBookmarks /> todo
          </div>
        </span>
      </Link>
      <button className="menu_button" onClick={toggleMenu}>
        &#9776; 
      </button>
      <div className={`right_container ${isMenuOpen ? "show_menu" : ""}`}>
        <div className="right_items">
          <Link to="/" onClick={closeMenu}>
            <div className="home">Home</div>
          </Link>
          <Link to="/about" onClick={closeMenu}>
            <div className="About_us">About Us</div>
          </Link>
        </div>

        <div className="authentication">
          {!isLoggedIn && (
            <>
              <Link to="/signin" onClick={closeMenu}>
                <div className="sign_up">Sign In</div>
              </Link>

              <Link to="/signup" onClick={closeMenu}>
                <div className="signIn">Sign Up</div>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/signin" onClick={closeMenu}>
              <div className="Log_out" onClick={logout}>
                Log Out
              </div>
            </Link>
          )}
           
            <Link to="/todolist" onClick={closeMenu}>
             <div >ToDO</div>
             </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
