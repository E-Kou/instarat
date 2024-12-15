import { useOutsideClick } from '@/utils/outsideclick';
import { IconCancel, IconDots, IconMapPin, IconMessageCircle, IconSearch, IconUser, IconX } from '@tabler/icons-react';
import { FocusTrap } from 'focus-trap-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './search.css';

function UserBox({username, followers, pfp }){
  const [showMoreOptions,setShowMoreOptions] = useState(false);
  const thisUserRef = useRef(null);
  useOutsideClick(thisUserRef, () => setShowMoreOptions(false));

  return(
    <li ref={thisUserRef} className={showMoreOptions?'optionsOpen':''}>
      <div className='topPart'>
      <Link aria-label={`Δειτε το προφίλ του χρήστη ${username}`} className='profileLink' to={`/user/${username}`}>
      <img src={pfp}/>
    <div className='rightInfo'>
      <h2>{username}</h2>
      <p>{followers} ακόλουθοι</p>
    </div>
    </Link>
    <div>
      <button title={`Προβολή χρήστη ${username} στον χάρτη`}><IconMapPin/></button>
      <button onClick={()=>{setShowMoreOptions(!showMoreOptions)}} title={`Περισσότερες επιλογές σχετικά με τον χρήστη ${username}`}>
            <IconDots/>
          </button>
    </div>
    </div>
    <AnimatePresence>
  {!!showMoreOptions&&<motion.div className='bottomPart' initial={{height:0}} animate={{height:'auto'}} exit={{height:0}}>
    <div className='bottomInside'>
    <div className='optionsTop'>
    <button title={`Ακολουθήστε τον χρήστη ${username}`} className='mainButton'>Ακολουθήστε</button>
  <button className='secondaryButton' title={`Στείλτε μήνυμα στον χρήστη ${username}`}>Στείλτε μήνυμα</button>
  </div>
<div className='actionList'>
  <button>Block</button>
  <button>Αποστολή Λογαριασμού</button>
  <button>Περιορισμός</button>
</div>
  </div>
    </motion.div>}
</AnimatePresence>
    </li>
  )
}

 function MapItem({position,pfp,username}){
  const iconPerson = new L.Icon({
    iconUrl: pfp,
    iconAnchor: [20,20],
    popupAnchor: [0,-17],
    iconSize: [40,40],
    className: 'map-user-icon'
});
  const markerRef = useRef(null);
  const [showMoreOptions,setShowMoreOptions] = useState(false);
  const [popupOpen,setPopupOpen] = useState(false);

  function closePopup(){
    if(!!markerRef?.current){
      markerRef.current.closePopup();
    }
  }
  function openPopup(){
    if(!!markerRef?.current){
      markerRef.current.openPopup();
    }
  }
const focusTrapOptions ={
  escapeDeactivates:true,
  allowOutsideClick:true,
  clickOutsideDeactivates:false,
  onDeactivate:()=>closePopup()
}
return (
  <Marker ref={markerRef} icon={iconPerson} eventHandlers={{
    popupopen: ()=>setPopupOpen(true),    // Trigger when the popup opens
    popupclose: ()=>setPopupOpen(false), // Trigger when the popup closes
  }}  position={position}>
  <Popup className={showMoreOptions?'moreOptionsOpen':''} closeButton={false}>
    <FocusTrap active={popupOpen} focusTrapOptions={focusTrapOptions} >
      <div>
<AnimatePresence>
  {!!showMoreOptions&&<motion.div className='userPopupOptions' initial={{height:0}} animate={{height:'auto'}} exit={{height:0}}>
    <div className='optionsInside'>
    <button onClick={openPopup} className='redButton'><IconCancel/> <span>Block</span></button>
  <button><IconMessageCircle/> <span>Στείλτε μήνυμα</span></button>
    <button className='followButton' title={`Ακολουθήστε τον χρήστη ${username}`}><IconUser/> <span>Ακολουθήστε</span></button>

  </div>
    </motion.div>}
</AnimatePresence>
    <div className='userPopupArea'>
      <Link className='username' to={`/user/${username}`}>{username}</Link>
    <button title={`Προβολή προφίλ χρήστη ${username}`}><IconUser/></button>
    <button className='optionsButton' onClick={()=>{setShowMoreOptions(!showMoreOptions)}} title={`Περισσότερες επιλογές σχετικά με τον χρήστη ${username}`}><IconDots/></button>
    <button onClick={closePopup} title={`Κλείσιμο`}><IconX/></button>
    </div>
    </div>
    </FocusTrap>
  </Popup>
</Marker>
)
}

export default function Search() {
    const position = [51.505, -0.09];
    const [showInstaLoc,setShowInstaLoc]= useState(false);

    useEffect(()=>{
      if(!sessionStorage.getItem('instaLoc')&&!localStorage.getItem('instaLoc')&&!!localStorage.getItem('searchOpened')){
        setShowInstaLoc(true);
      }else if(!localStorage.getItem('searchOpened')){
        localStorage.setItem('searchOpened',true)
      }
    },[])

    function hideSuggestion(){
      setShowInstaLoc(false)
      // sessionStorage.setItem('instaLoc',true)
    }

  return (
    <main id='searchMain' className='noPadding fullWidth'>
        <div className='searchUI'>
        <h1>Αναζήτηση</h1>
       <div className='searchTop'>
                <label className='InputArea' htmlFor='userSearch'>
                <IconSearch/>    
            <input role="searchbox" placeholder='Εισάγετε όνομα χρήστη' id='userSearch' type='text'/>
            </label>
            </div>
            <ul className='userList'>
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />
<UserBox username='koutsogiannis' followers='2k' pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg' />

            </ul>
            <AnimatePresence>
            {!!showInstaLoc&&
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} id='locationSuggestion'>
              <div>
              <button id='close' onClick={hideSuggestion} className='actionable'><IconX/></button>
                    <div className='topText'>
                <img src='/locationLogo.png'/>
                <div>
                <h3>Θέλετε να προσθέσετε τον εαυτό σας στον χάρτη;</h3>
                <p>Κοινοποιήστε την τοποθεσία σας με όλη τη Γη, μέσω της <Link to='/services/instaloc'>InstaLoc</Link></p>
                </div>
                </div>
                <button className='mainButton'>Ενεργοποίηση</button>
                </div>
            </motion.div>}
            </AnimatePresence>
        </div>
          <MapContainer id='userMap' center={position} zoom={1.85} minZoom={1.85} maxBoundsViscosity={0.9} maxBounds={[[-85.06, -180], [85.06, 180]]} scrollWheelZoom={true}>
          <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OMT</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  />
<MapItem pfp='https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg'
username='evag' position={position}/>
      </MapContainer>
      </main>
  )
}
