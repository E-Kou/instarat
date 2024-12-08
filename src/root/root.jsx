import LoginBanner from '@/utils/loginBanner/loginBanner';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function Root({focreLogin = true, children}) {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("connectedAs") && !!focreLogin){
      return toHereFN();
    }
  },[])
  return (
    <div className='mainWindow'>
       <Navbar/>
       <div className='mainContent'>
       <LoginBanner />
        <Outlet />
        {children}
        </div>
    </div>
  )
}
