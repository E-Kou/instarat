import { IconChevronLeft, IconLogin2 } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, replace, useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AutoHeight from '../../utils/autoHeight';
import "./welcome.css";



export default function Welcome() {
    let sliderRef = useRef(null);
    let searchParams = useSearchParams();


    const [hasBeenLoaded, setHasBeenLoaded] = useState(null);
    useEffect(()=>{
if(localStorage.getItem("loadedApp") !== "Loaded"){
    setHasBeenLoaded(false)
} else{
    setHasBeenLoaded(true)
}
    },[])

    function firstStep(){
        sliderRef.slickGoTo(1);
    }
    const checkCreds = (e) => {
      e.preventDefault();
      if(!!searchParams.get("n")){
        replace(decodeURIComponent(searchParams.get("n")));
      } else{
        return replace("/");
      }
    };
    const previous = () => {
        sliderRef.slickGoTo(0);
    };
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      adaptiveHeight: true,
      arrows:false,
    };

    const [activeTab, setActiveTab] = useState();
    const containerRef = useRef(null);
    const activeTabElementRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current;
  
      if (activeTab && container) {
        const activeTabElement = activeTabElementRef.current;
  
        if (activeTabElement) {
          const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeTabElement;
          const clipTop = offsetTop;
          const clipBottom = offsetHeight + offsetTop;
          const clipLeft = offsetLeft;
          const clipRight = offsetLeft + offsetWidth;
          container.style.clipPath = `inset(${Number((clipTop / container.offsetHeight) * 100).toFixed()}% ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% ${Number(100 - (clipBottom / container.offsetHeight) * 100).toFixed()}% ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 5px)`;
        }
      }
    }, [activeTab, activeTabElementRef, containerRef]);
  

    function ListItem({name, text, category}){
      return             <div ref={activeTab === name ? activeTabElementRef : null}   onClick={() => {setActiveTab(name)}}> 
      <input type="radio" id={name} name={category} value={name}/>
      <label htmlFor={name}>{text}</label>
      </div>
      }

  return (
    <div id='WelcomePage'>
        {hasBeenLoaded != true?
        <AutoHeight>
                <Slider
                ref={slider => {
                  sliderRef = slider;
                }}
                {...settings}
              >
       <div className='page'> 
        <img src='logo'/>
        <p className='logoDesign'>Λογότυπος από τον Μιχάλη ...</p>
        <h1>Καλωσορίσατε στο InstaRat</h1>
      <div className='welcomeText'> <p>Το παρόν web-app κατασκευάστηκε από τον μαθητή <Link to='/user/koutsogiann1s'><b>Ευάγγελο Κουτσογιάννη</b></Link> για την ενημέρωση των νέων περί των κινδύνων των κοινωνικών δικτύων.
        </p>
        <Link to='about'>Μαθετε περισσότερα</Link>
        </div> 
        <div className='bottomNav'>
            <button className='mainButton' onClick={firstStep}>Συνέχεια</button>
            </div>
            </div>
            
            <div className='page'> 
            <IconLogin2/>
            <h1>Οριστε τα στοιχεία σας</h1>
            <p>Τα στοιχεία σε αυτή τη σελίδα δεν θα αποθηκευτούν όμως θα κοινοποιηθούν για ανάλυση ασφαλείας.</p>
            <form onSubmit={checkCreds}>
                <div className='InputArea'>
                <input type="text"/>
                </div>
                <div className='InputArea'>
                <input type="password"/>
                </div>
                <div className='selectArea'>
                <p>Είμαι μαθητής:</p>
                <div className='radioList'>
                  <div className='radioPointer' ref={containerRef}/>
                    <ListItem category='school' name='elementarySchool' text='Δημοτικού'/>
<ListItem category='school' name='middleSchool' text='Γυμνασίου'/>
<ListItem category='school' name='highSchool' text='Λυκείου'/>
<ListItem category='school' name='completedSchool' text='Τελειόφοιτος'/>
</div>
                </div>
                <div className='buttomArea'>
                <button type='button' className="backButton mainButton" onClick={previous}><IconChevronLeft /></button>
          <button className='mainButton' type='submit'>Έλεγχος Στοιχείων</button>
                </div>
                
                </form>
                </div>
                </Slider>
                </AutoHeight>
    :<p>Already Loaded</p>}
        
    </div>
  )
}