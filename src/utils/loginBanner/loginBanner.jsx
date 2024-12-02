import { useEffect, useState } from "react";
import WelocomeToHere from "../welocometoHere";
import styles from './loginBanner.module.css';

export default function LoginBanner() {
  const [showBanner,setShowBanner] = useState(null);
useEffect(()=>{
  if(!localStorage.getItem("connectedAs")){
    setShowBanner(true)
  }
},[])
  return (
    <>{showBanner&&
    <div className={styles.loginBanner}>
        <div className={styles.leftArea}>
      <img className='logo' src='/instarat_low.png'/>
        <span>Instarat</span>
        </div>
        <WelocomeToHere className='mainButton'>Σύνδεση</WelocomeToHere>
    </div>
}</>
  )
}
