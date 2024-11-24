import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function Root() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!!localStorage.getItem("connectedAs")){
      return navigate("/welcome");
    }
  },[])
  return (
    <div>
       <Navbar/>
        <Outlet />
    </div>
  )
}
