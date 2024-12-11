import LoginBanner from '@/utils/loginBanner/loginBanner';
import { toHereFN } from '@/utils/welocometoHere';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function Root({focreLogin = true, children}) {

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
