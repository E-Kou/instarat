import { IconChevronLeft, IconLogin2 } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, replace, useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import AutoHeight from '../../utils/autoHeight';

function ListItem({name, text}){
return             <div> 
<input type="radio" id="elementarySchool" name={name} value={name}/>
<label htmlFor={name}>{text}</label>
</div>
}


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
      swipeToSlide: false,
    };

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
        <p>Το παρόν web-app κατασκευάστηκε από τον μαθητή <Link to='/user/koutsogiann1s'><b>Ευάγγελο Κουτσογιάννη</b></Link>
        για την ενημέρωση των νέων περί των κινδύνων των κοινωνικών δικτύων.
        </p>
        <Link to='about'>Μαθετε περισσότερα</Link>
        <div className='bottomNav'>
            <button onClick={firstStep}>Enter</button>
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
                    <ListItem name='elementarySchool' text='Δημοτικού'/>
<ListItem name='middleSchool' text='Γυμνασίου'/>
<ListItem name='highSchool' text='Λυκείου'/>
<ListItem name='completedSchool' text='Τελειόφοιτος'/>
</div>
                </div>
                <div className='buttomArea'>
                <button type='button' className="button" onClick={previous}><IconChevronLeft /></button>
          <button type='submit'>Έλεγχος Στοιχείων</button>
                </div>
                
                </form>
                </div>
                </Slider>
                </AutoHeight>
    :<p>Already Loaded</p>}
        
    </div>
  )
}