import { IconX } from '@tabler/icons-react';
import { FocusTrap } from 'focus-trap-react';
import { ConditonnalWrapper } from '../conditonnalWrapper';
import styles from './popup.module.css';


export default function Popup({type='modal', title=false, xButton=false, escOn=true, bgClassName="", className="", dismissability=false, onDismiss, children}) {
  function closePopup(){
    if(typeof onDismiss === "function"){
      onDismiss()
    }
  }
  const trapConfig ={
    onDeactivate: closePopup,
    allowOutsideClick:dismissability==='transparent',
    clickOutsideDeactivates:dismissability===true,
    escapeDeactivates:!!escOn,
  }
  console.log(typeof title==="string")
  return (
      <ConditonnalWrapper wrap={type==='modal'} wrapper={children=><div className={`${dismissability==='transparent'?styles.transparent:''} ${bgClassName}`} id={styles.popupBG}>{children}</div>}>
    <FocusTrap focusTrapOptions={trapConfig} active={true}>
    <div role="dialog" id={styles.Popup} className={`${styles[type]} ${className}`} aria-modal="true">
      {!!title&&<div className={styles.popupTop}>
        <div className={styles.popupTitle}>
      {typeof title==="number"||typeof title==="string"?<h1>{title}</h1>:{title}}
      </div>
      {!!xButton&&<button className={`${styles.closeButton} actionable`} onClick={closePopup}><IconX/></button>}
      </div>}
      <div className={styles.content}>
      {!title&&!!xButton&&<button className={`${styles.closeButton} ${styles.inline} actionable`} onClick={closePopup}><IconX/></button>}
        {children}
      </div>
    </div>
    </FocusTrap>
    </ConditonnalWrapper>
  )
}
