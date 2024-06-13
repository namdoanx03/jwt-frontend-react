import React, { useEffect, useState,useContext } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from "react-router-dom";
import { UserConText } from '../../context/UserContext';


const Nav = (props) => {
  const {user} = useContext(UserConText)
  const location = useLocation()

  if(user && user.isAuthenticated === true || location.pathname === "/"){
  return (
    <>
      <div className="topnav">
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/users">User</NavLink>
        <NavLink to="/projects">Project</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </>
  )
}else{
  return <></>
}
}

export default Nav