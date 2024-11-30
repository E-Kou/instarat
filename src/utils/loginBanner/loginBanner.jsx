import WelocomeToHere from "../welocometoHere";
import styles from './loginBanner.module.css';

export default function LoginBanner() {
  return (
    <div className={styles.loginBanner}>
        <div className={styles.leftArea}>
      <img className='logo' src='/instarat_low.png'/>
        <span>Instarat</span>
        </div>
        <WelocomeToHere className='mainButton'>Σύνδεση</WelocomeToHere>
    </div>
  )
}
