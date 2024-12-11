import LoginBanner from '@/utils/loginBanner/loginBanner';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

export default function Root({focreLogin = true, children}) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("connectedAs") && !!focreLogin){
      const target = encodeURIComponent(location.pathname);
        return navigate(`/welcome?n=${target}`);
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
