import SSizeContext from "@/utils/screenSize";
import { IconCheck, IconLayoutGrid, IconLinkOff, IconShare, IconTagOff } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import WelocomeToHere from '../../utils/welocometoHere';
import './user.css';

function FollowDisplay({followers=0,following=0,posts=0}){
return <div className="followCounter">
<div>
  <h2>{followers}</h2>
  <p>Ακόλουθοι</p>
</div>
<div>
  <h2>{following}</h2>
  <p>Ακολουθάει</p>
</div>
<div>
  <h2>{posts}</h2>
  <p>Αναρτήσεις</p>
</div>
</div>
}
function UserActions(){
  return <div className="buttonActions"><button className="mainButton">Ακολουθήστε</button>
              <button className="secondaryButton">Μήνυμα</button></div>
}

export default function Userpage() {
  const { username } = useParams();
  let sliderRef = useRef(null);
  
  const [currentTab, setCurrentTab] = useState(0);
  const [available, setAvailable] = useState(0);
  const { width } = useContext(SSizeContext);

  useEffect(()=>{
    console.log(width)
  },[width])

  useEffect(()=>{
    setAvailable(!!localStorage.getItem("connectedAs"));
  },[])


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    arrows: false,
    className:'userCarousel',
    afterChange: current => setCurrentTab(current),
    beforeChange: (current, next) => setCurrentTab(next)
  };

  const [wasCopied, setWasCopied] = useState(false);

  function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  const shareData = {
    title: "Instarat",
    text: `View ${username} on Instarat`,
    url: `https://insta-rat-gr.web.app/user/${username}`,
  };

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setWasCopied(true);
      setTimeout(()=>{
        setWasCopied(false);
      },2000)
      return true;
    } catch (error) {
      setWasCopied(false);
      console.error(error.message);
    }    
  }

   function ShareAccButton(){
   async function shareIt(){
if(isMobile() && !!navigator.canShare){
  try {
    await navigator.share(shareData);
    resultPara.textContent = "MDN shared successfully";
  } catch (err) {
    console.log(`Sharing Error: ${err}`);
   await copy(`https://insta-rat-gr.web.app/user/${username}`)
  }
} else{
   await copy(`https://insta-rat-gr.web.app/user/${username}`)   
    }
    }
return <button title={wasCopied?'Αντιγράφηκε στο πρόχειρο':'Κοινοποίηση προφίλ χρήστη'} onClick={shareIt}>
  {wasCopied?<IconCheck/>:<IconShare/>}
  </button>
}
  

  return (
    <main id='userPage'>
     {width < 700?
          <div className="mobile" id='userHeader'>
  <div id="userTop">
  <img className="pfp" src="https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg" />

  <h1>{username} <ShareAccButton/></h1>
          </div>
          <div id="userBelow">
  
          <div id="topLeft">    
          <FollowDisplay followers='20k' following='2k' posts='20' />
          <UserActions/>
            </div>
          </div>
          <p>"🚀 Pushing the boundaries of Web3 innovation | Crypto programmer on a mission to decentralize the future 🌐 | Builder of blockchain solutions, smart contracts, and cutting-edge decentralized apps 💻⛓️ | Fueled by code, coffee, and a vision of tomorrow ✨ | Always one block ahead, shaping a world of limitless possibilities. ⚡"</p>

        </div>
     :
          <div id='userHeader'>
          <div id="userTop">
            <img className="pfp" src="https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg" />
  <div id="topLeft">          <p>"🚀 Pushing the boundaries of Web3 innovation | Crypto programmer on a mission to decentralize the future 🌐 | Builder of blockchain solutions, smart contracts, and cutting-edge decentralized apps 💻⛓️ | Fueled by code, coffee, and a vision of tomorrow ✨ | Always one block ahead, shaping a world of limitless possibilities. ⚡"</p>
  
            <FollowDisplay followers='20k' following='2k' posts='20' />
            </div>
  
          </div>
          <div id="userBelow">
            <h1>{username} <ShareAccButton/></h1>
  
            <UserActions/>
          </div>
        </div>
     }
 
      <div role="tablist" className="tabSwitcher">
        <div><input type="radio" aria-controls="postsTab" id="posts" role="tab" aria-selected={currentTab === 0} checked={currentTab === 0} onChange={(e) => { sliderRef.slickGoTo(0) }} name="currentTab" value="Αναρτήσεις" />
          <label htmlFor="posts">Αναρτήσεις</label></div>

        <div><input type="radio" aria-controls="taggedTab" id="tagged" role="tab" aria-selected={currentTab === 1} checked={currentTab === 1} onChange={(e) => { sliderRef.slickGoTo(1) }} name="currentTab" value="Αναφορές" />
          <label htmlFor="tagged">Αναφορές</label></div>

        <div><input type="radio" aria-controls="externalTab" id="external" role="tab" aria-selected={currentTab === 2} checked={currentTab === 2} onChange={(e) => { sliderRef.slickGoTo(2) }} name="currentTab" value="Εξωτερικοί σύνδεσμοι" />
          <label htmlFor="external">Εξωτερικοί σύνδεσμοι</label></div>
      </div>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <div role="tabpanel" aria-labelledby="posts" id="postsTab" className="userTab">
          {!available ? <div className="mainTabBox"><WelocomeToHere style={{width:'100%'}} className='mainButton'>Ορίστε στοίχεια χρήστη για να δείτε περισσότερα</WelocomeToHere></div>
            :
            <div className="userTab">
            <div className="mainTabBox">
            <IconLayoutGrid/>
            <p>Δεν υπάρχουν αναρτήσεις</p>
            </div>
          </div>
          }</div>
          <div role="tabpanel" aria-labelledby="tagged" id="taggedTab" className="userTab">
            <div className="mainTabBox">
            <IconTagOff/>
            <p>Δεν βρέθηκαν αναφορές</p>
            </div>
          </div>
          <div role="tabpanel" aria-labelledby="external" id="externalTab" className="userTab">
            <div className="mainTabBox">
            <IconLinkOff/>
            <p>Εξωτερικοί σύνδεσμοι μη διαθέσιμοι</p>
            </div>
          </div>
      </Slider>
    </main>
  )
}
