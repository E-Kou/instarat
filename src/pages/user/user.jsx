import { IconLinkOff, IconShareOff, IconTagOff } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import WelocomeToHere from '../../utils/welocometoHere';
import './user.css';

export default function Userpage() {
  const { username } = useParams();
  let sliderRef = useRef(null);
  
  const [currentTab, setCurrentTab] = useState(null);
  const [available, setAvailable] = useState(0);

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

  return (
    <main id='userPage'>
      <div id='userHeader'>
        <div id="userTop">
          <img className="pfp" src="https://cdn.vectorstock.com/i/500p/64/79/retro-atomic-stars-seamless-pattern-on-orange-vector-44636479.jpg" />
<div id="topLeft">          <p>"🚀 Pushing the boundaries of Web3 innovation | Crypto programmer on a mission to decentralize the future 🌐 | Builder of blockchain solutions, smart contracts, and cutting-edge decentralized apps 💻⛓️ | Fueled by code, coffee, and a vision of tomorrow ✨ | Always one block ahead, shaping a world of limitless possibilities. ⚡"</p>

          <div className="followCounter">
            <div>
              <h2>20k</h2>
              <p>Ακόλουθοι</p>
            </div>
            <div>
              <h2>1.3k</h2>
              <p>Ακολουθάει</p>
            </div>
            <div>
              <h2>20</h2>
              <p>Αναρτήσεις</p>
            </div>
          </div>
          </div>

        </div>
        <div id="userBelow">
          <h1>{username}</h1>

          <div className="buttonActions"><button className="mainButton">Ακολουθήστε</button>
            <button className="secondaryButton">Μήνυμα</button></div>
        </div>
      </div>
      <div className="tabSwitcher">
        <div><input type="radio" id="posts" checked={currentTab === 0} onChange={(e) => { sliderRef.slickGoTo(0) }} name="currentTab" value="Αναρτήσεις" />
          <label htmlFor="posts">Αναρτήσεις</label></div>

        <div><input type="radio" id="tagged" checked={currentTab === 1} onChange={(e) => { sliderRef.slickGoTo(1) }} name="currentTab" value="Αναφορές" />
          <label htmlFor="tagged">Αναφορές</label></div>

        <div><input type="radio" id="External" checked={currentTab === 2} onChange={(e) => { sliderRef.slickGoTo(2) }} name="currentTab" value="Εξωτερικοί σύνδεσμοι" />
          <label htmlFor="External">Εξωτερικοί σύνδεσμοι</label></div>
      </div>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <div className="userTab">
          {!available ? <WelocomeToHere className='mainButton'>Ορίστε στοίχεια χρήστη για να δείτε περισσότερα</WelocomeToHere>
            :
            <div className="userTab">
            <div className="mainTabBox">
            <IconShareOff/>
            <p>Δεν υπάρχουν αναρτήσεις</p>
            </div>
          </div>
          }</div>
          <div className="userTab">
            <div className="mainTabBox">
            <IconTagOff/>
            <p>Δεν βρέθηκαν αναφορές</p>
            </div>
          </div>
          <div className="userTab">
            <div className="mainTabBox">
            <IconLinkOff/>
            <p>Εξωτερικοί σύνδεσμοι μη διαθέσιμοι</p>
            </div>
          </div>
      </Slider>
    </main>
  )
}
