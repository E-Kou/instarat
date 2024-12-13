import { useContext } from 'react';

import SSizeContext from '@/utils/screenSize';
import { IconHome, IconLayoutSidebarFilled, IconLayoutSidebarLeftCollapseFilled, IconMenu2, IconMessageCircle, IconSearch, IconSquareRoundedPlus, IconUser } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


function BarButton(params){
  return(
    <li id="home-item" className="item">
    <NavLink end={params.end} to={params.path} className="link flex">
    {params.icon}
      <span>{params.title}</span>
    </NavLink>
  </li>
  )
}


export default function Navbar() {
  const [sidebarLocked, setSidebarLocked]= useState(true);
    const { width,loggedIn } = useContext(SSizeContext);
    

    function toggleSidebar(){
      setSidebarLocked(!sidebarLocked);
  }
  if(!!loggedIn){
  return (
    <nav role="navigation" className={`${width > 1200?'instaratSidebar':'instaratMobileSidebar'} ${sidebarLocked ? 'locked' :'close'}`}>
      {width > 1200 ? 
      <>
    <div className="logo_items flex">
      <span className="nav_image">
        <img id="closed-img" src="" alt="logo_img" />
        <img id="open-img" src="" alt="logo_img" />
      </span>
      <IconLayoutSidebarFilled onClick={toggleSidebar} id='lock-icon' className={`${!sidebarLocked ? 'show' :''}`} />
      <IconLayoutSidebarLeftCollapseFilled id='minimize-sidebar' onClick={toggleSidebar} className={`${sidebarLocked ? '' :'hide'}`} />
      <i id="sidebar-close" onClick={toggleSidebar} className="fa-solid fa-xmark"></i>
    </div>

    <div className="menu_container">
      <ul className="menu_items">
          <BarButton icon={<IconHome/>} path='/' title='Αρχική σελίδα' end={true}/>
          <BarButton icon={<IconMessageCircle/>} path='/dms' title='Μηνύματα'/>
          <BarButton icon={<IconSearch />} path='/search' title='Αναζήτηση'/>
          <BarButton icon={<IconSquareRoundedPlus/>} path='/services/savings' title='Νέα δημοσίευση'/>
  </ul>

      <div className="sidebar_profile">

      <div className={`connector`}>
            <AnimatePresence>
       <motion.div exit={{width:0, height:50, opacity:0}} className="buttonBox">
        <button className="disconnect-btn"><IconUser/><span>Ο λογαριασμός σας</span></button>
            </motion.div>

</AnimatePresence>
            </div> 
        <div className={`connector`}>
            <AnimatePresence>
         <motion.div exit={{width:0, height:50, opacity:0}} className="buttonBox">
        <button className="disconnect-btn"><IconMenu2/><span>Περισσότερα</span></button>
            </motion.div>

</AnimatePresence>
            </div>  
                  </div>
    </div>
  </>:
     <div className="menu_container">
     <ul className="menu_items">
         <BarButton icon={<IconHome/>} path='/' title='Αρχική σελίδα' end={true}/>
         <BarButton icon={<IconSearch />} path='/search' title='Αναζήτηση'/>
         <BarButton icon={<IconSquareRoundedPlus/>} path='/services/savings' title='Νέα δημοσίευση'/>
         <BarButton icon={<IconMessageCircle/>} path='/dms' title='Μηνύματα'/>
         <BarButton icon={<IconUser/>} path='/account' title='Ο λογαριασμός σας'/>
 </ul>
   </div> 
  }
  </nav>
  )
}
}
