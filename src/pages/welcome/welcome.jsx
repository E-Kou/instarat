import SSizeContext from '@/utils/screenSize';
import { IconChevronLeft, IconChevronRight, IconLogin2, IconX } from '@tabler/icons-react';
import levenshtein from 'js-levenshtein';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import useMeasure from 'react-use-measure';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Checkmark from '../../utils/checkmark/checkmark';
import Loader from '../../utils/loader/loader';
import "./welcome.css";

function NoteBox({children, boxClass}){
  return <motion.div initial={{opacity:0,height:0,padding:'0px 8px', marginTop:'0', borderWidth:0}} animate={{opacity:1,height:'auto', padding:'6px 8px', marginTop:'0.3rem', borderWidth:2}} exit={{opacity:0,height:0,padding:'0px 8px', marginTop:'0', borderWidth:0}} className={`noteBox ${boxClass}`}>
    {children}
    </motion.div>
} 

export default function Welcome() {

  const { width,loggedIn ,setLoggedIn } = useContext(SSizeContext);


 const names = [
  "giorgos",
  "george",
  "giwrgos",
  "giannis",
  "gianhs",
  "yiannis",
  "yianhs",
  "yannis",
  "gianis",
  "gian",
  "vaggelis",
  "kostas",
  "kwstas",
  "costas",
  "dimitris",
  "dhmhtrhs",
  "dim",
  "dhmhtrios",
  "nikos",
  "niko",
  "nikolas",
  "nicolas",
  "nick",
  "christos",
  "xristos",
  "hristos",
  "vasilis",
  "basilis",
  "vasilhs",
  "basilhs",
  "panos",
  "panos",
  "petros",
  "petro",
  "stefanos",
  "stef",
  "michalis",
  "mixalis",
  "thanasis",
  "thanasis",
  "thanas",
  "athanasios",
  "a8anasios",
  "spyros",
  "spiros",
  "spyro",
  "alexandros",
  "alex",
  "alexhs",
  "aleksandros",
  "apostolos",
  "apost",
  "andreas",
  "marios",
  "aris",
  "athanasios",
  "fotis",
  "fwtis",
  "grigoris",
  "grigorhs",
  "haris",
  "harries",
  "ilias",
  "ilia",
  "ioannis",
  "yannis",
  "kyriakos",
  "kiriakos",
  "kyriak",
  "kiriak",
  "lefteris",
  "lefterhs",
  "loukas",
  "lucas",
  "manolis",
  "man",
  "pavlos",
  "pav",
  "panagiotis",
  "pan",
  "panagos",
  "angelos",
  "aggelos",
  "ang",
  "aggel",
  "maria",
  "mariya",
  "eleni",
  "elenh",
  "elen",
  "dimitra",
  "dhmhtra",
  "konstantina",
  "konst",
  "ioanna",
  "yanna",
  "gianna",
  "ywanna",
  "katerina",
  "katherina",
  "katerinh",
  "sofia",
  "sof",
  "sofi",
  "evangelia",
  "evang",
  "fotini",
  "foteinh",
  "vasiliki",
  "vasilikh",
  "panagiota",
  "panagiwta",
  "panagioth",
  "chrysoula",
  "xrysoula",
  "chrys",
  "xrys",
  "anastasia",
  "anastas",
  "tasia",
  "stasia",
  "georgia",
  "theodora",
  "dora",
  "argyro",
  "aikaterini",
  "eleftheria",
  "eirini",
  "irene",
  "niki",
  "nicky",
  "xenia",
  "olga",
  "paraskevi",
  "paraskeuh",
  "rania",
  "stella",
  "zoi",
  "zoe",
  "charoula",
  "angeliki",
  "aggelikh",
  "angel",
  "marika",
  "athanasia",
  "ath",
  "alex",
  "chris",
  "christina",
  "nikoleta",
  "nikolet",
  "taki",
  "taki",
  "vaso",
  "dimi",
  "demy",
  "foti",
  "hary",
  "riko",
  "louko",
  "viki",
  "giota",
  "theo",
  "manoli",
  "tania",
  "taniah",
  "eva",
  "nina",
  "lola",
  "vivi",
  "liza",
  "lili",
  "elli",
  "danae",
  "eirene",
  "vasil",
  "arghiro"
]
function analyzeUsername(username) {
  // Regex for Greeklish names
  
  // Regex for birth years or short forms (e.g., 1990, '85)
  const yearPattern = /\b(19[0-9]{2}|20[0-9]{2}|'[0-9]{2})\b/;

  // Test for Greeklish name
  const rgU = /(_|\.)|(\d{2,})/;
  const uNamefragments = username.split(rgU).reduce((acc, curr) => {
    if (!curr || rgU.test(curr)) {
      return acc;
    }
    if (acc.length > 0 && acc[acc.length - 1].length === 1) {
      acc[acc.length - 1] += curr;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  const hasGreeklishName = !!names.find(i=>i.includes(username)||username.includes(i)||!!uNamefragments.find(b=>levenshtein(i,b) < 3))

  // Test for birth year
  const hasBirthYear = yearPattern.test(username);

  // Return results
  return {
    hasName: hasGreeklishName,
    hasYear: hasBirthYear
  };
}
 
    let sliderRef = useRef(null);
    const [formPageRef, {height}] = useMeasure();
    let formRef = useRef(null);
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const [scrollAction, setScrollAction] = useState(null);
    const scrollActionRef = useRef(null);
    const [dataWarning, setDataWarning] = useState(false);
    const [notedSafetyW, setNotedSafetyW] = useState(false);

    const [hasBeenLoaded, setHasBeenLoaded] = useState(null);
    useEffect(()=>{
if(!localStorage.getItem("connectedAs")){
    setHasBeenLoaded(false)
    setLoggedIn(false)
} else{
  setLoggedIn(true)
  if(!!searchParams.get("n")){
      navigate(decodeURIComponent(searchParams.get("n")),{replace:true});
  } else{
       setHasBeenLoaded(true)
  }
}
    },[])

    function logout(){
      localStorage.removeItem("connectedAs")
      setHasBeenLoaded(false);
      setLoggedIn(false)
    }

    function firstStep(){
        sliderRef.slickGoTo(1);
    }
    function hasSequentialChars(str) {
      let matchesFound = 0;
      for (let i = 0; i < str.length - 2; i++) {
        const char1 = str.charCodeAt(i);     // Current character
        const char2 = str.charCodeAt(i + 1); // Next character
        const char3 = str.charCodeAt(i + 2); // Character after that
    
        // Check if they are sequential
        if (char2 === char1 + 1 && char3 === char2 + 1) {
          matchesFound += 1;
        }
      }
      return matchesFound;
    }
    
    async function checkCreds(e) {
      e?.preventDefault();
      setScrollAction('loading')
      const formData = new FormData(formRef?.current);
      const finalOBJ = {};

      const username = formData.get("username");
      const password = formData.get("password");

      function proceed(){
        setDataWarning(false);
        localStorage.setItem("connectedAs", username);
        setScrollAction('success');
        sliderRef.slickGoTo(2);
        if(!localStorage.getItem('preloaded')){
          /// impliment firebase analytics
          localStorage.setItem('preloaded',true)
        }
        setLoggedIn(true)
        if(!!searchParams.get("n")){
          setTimeout(()=>{
            navigate(decodeURIComponent(searchParams.get("n")),{replace:true});
          }, 1700)
        } else{
          setTimeout(()=>{
            navigate('/',{replace:true});
          },2600)
          
        }
      }
      if( !/^[a-zA-Z0-9_.]*$/.test(username)){
        finalOBJ.username = 'allowedCharacters'
      } else if(username.length < 6 || username.length > 16 ){
        finalOBJ.username = 'length'
      }
      else{
        let analysed = analyzeUsername(username);

       if(!!analysed.hasName){
        finalOBJ.username = 'dataSafety';
      } 
       if(!!analysed.hasYear){
        finalOBJ.year = 'dataSafety';
      }
    }

      if(!formData.get("school")){
        finalOBJ.school='notSet'
      }
        if (password.length == 0) {
  //Code from Apotamieusis checkPass FN
      finalOBJ.password='notSet';
          }
          else if (!password.match(/(((.*[A-Z].*)(.*[a-z].*)|(.*[a-z].*)(.*[A-Z].*))|((.*[Α-ΩΊΪΌΆΈύΎΫΉΏ].*)(.*[α-ωίϊΐόάέύϋΰήώ].*)|(.*[α-ωίϊΐόάέύϋΰήώ].*)(.*[Α-ΩΊΪΌΆΈύΎΫΉΏ].*)))/)) {
           finalOBJ.password='Ο κωδικός σας πρέπει να αποτελείται από κεφαλαία και μικρά γραμματα.'
          }
          else if (!password.match(/([0-9])/)) {
           finalOBJ.password='Ο κωδικός σας πρέπει να περιέχει νούμερα.'
          }
         else if (hasSequentialChars(password)>1) {
          finalOBJ.password='Ο κωδικός σας απαγορεύεται να έχει απλές ακολουθίες χαρακτήρων.'
        }
          else if (password.length < 8) {
            finalOBJ.password='Ο κωδικός σας πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.'
              }      

              setDataWarning(finalOBJ);

              const errorList = [...new Set(Object.values(finalOBJ))];
            if (errorList.length === 0){
              proceed();
            } else if(errorList.length = 1 && errorList[0] == 'dataSafety'){
              if(!!notedSafetyW){
                proceed();
              }else{
                setNotedSafetyW(true);
                setScrollAction(false);
              }
            } else{
              setScrollAction(false);
            }

    };
    const previous = () => {
        sliderRef.slickGoTo(0);
    };

    const [scrollbeforeTab, setScrollbeforeTab] = useState(0);
    const [scrollTab, setScrollTab] = useState();
    const [showScrollBack, setShowScrollBack] = useState(false);

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      adaptiveHeight: true,
      arrows:false,
      beforeChange: (c, next) => {
        setScrollbeforeTab(next);
      },
      afterChange: current => setScrollTab(current)
    };

    const [schTab, setSchTab] = useState();


    useEffect(()=>{
      if(scrollbeforeTab == 2){
        if(scrollAction == false){
          firstStep();
          setScrollAction('back');
        } else if(scrollAction != 'back' && scrollAction != 'loading'){
          setScrollAction('loading');
          checkCreds();
        }

      }
    },[scrollbeforeTab,scrollAction,scrollTab])
   
    useEffect(()=>{
if(scrollTab != 2){
  setScrollAction(null);
} else if (scrollAction == 'back'){
  setTimeout(()=>{firstStep(); setTimeout(()=>{setShowScrollBack(true)},300)},300)

}},[scrollTab])
useEffect(()=>{
if(!!showScrollBack&& scrollbeforeTab!=2 && scrollTab!=2){
  setShowScrollBack(false);
}
console.log('scrollbeforeTab: ' + scrollbeforeTab)
console.log('scrollTab: ' + scrollTab)
console.log('showScrollBack: ' + showScrollBack)
},[scrollbeforeTab,scrollTab,showScrollBack])


    const containerRef = useRef(null);
    const schTabElementRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current;
  
      if (schTab && container) {
        const activeTabElement = schTabElementRef.current;
  
        if (activeTabElement) {
          const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeTabElement;
          const clipTop = offsetTop;
          const clipBottom = offsetHeight + offsetTop;
          const clipLeft = offsetLeft;
          const clipRight = offsetLeft + offsetWidth;
          container.style.clipPath = `inset(${Number((clipTop / container.offsetHeight) * 100).toFixed()}% ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% ${Number(100 - (clipBottom / container.offsetHeight) * 100).toFixed()}% ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 5px)`;
        }
      }
    }, [schTab, schTabElementRef, containerRef]);
  

    function ListItem({name, text, category, ...otherProps}){
      return <div ref={schTab === name ? schTabElementRef : null}> 
      <input type="radio" checked={schTab == name} aria-label={text} aria-checked={schTab == name} {...otherProps} onChange={() => {setSchTab(name);setDataWarning((({ school, ...o }) => o)(dataWarning))}} id={name} name={category} value={name}/>
      <label htmlFor={name}>{text}</label>
      </div>
      }


  return (
    <div id='WelcomePage'>
        {hasBeenLoaded === false?
                <Slider
                ref={slider => {
                  sliderRef = slider;
                }}
                {...settings}
              >
       <div inert={scrollbeforeTab!==0?"inert":undefined} className='page'> 
        <img className='logo' src='/instarat_low.png'/>
        <h1>Καλωσορίσατε στο InstaRat</h1>
      <div className='welcomeText'> <p>Το παρόν web-app κατασκευάστηκε από τον μαθητή <Link to='/user/koutsogiann1s'><b>Ευάγγελο Κουτσογιάννη</b></Link> για την ενημέρωση των νέων περί των κινδύνων των κοινωνικών δικτύων. Συνδιάζει τη χρήση Τεχνητής Νοημοσύνης και βιωματικής μάθησης σε ένα πλαίσιο replica κοινωνικού δικτύου.
        </p>
        <Link to='about'>Μαθετε περισσότερα</Link>
        </div> 
        <div className='bottomNav'>
            <button className='mainButton' onClick={firstStep}>Συνέχεια</button>
            </div>
            </div>
            
            <div inert={scrollbeforeTab!==1?"inert":undefined} ref={formPageRef} className='page'> 
            <IconLogin2/>
            <h1>Οριστε τα στοιχεία σας</h1>
            <p>Τα στοιχεία σε αυτή τη σελίδα δεν θα αποθηκευτούν όμως θα κοινοποιηθούν για ανάλυση ασφαλείας.</p>
            <form ref={formRef} onSubmit={checkCreds}>
                <div className='InputArea'>
                <label htmlFor='userNameField'>Όνομα Χρήστη</label>
                <input onInput={()=>{setDataWarning((({ username, ...o }) => o)(dataWarning));setNotedSafetyW(false)}} name='username' id='userNameField' type="text"/>
                <AnimatePresence>
                {!!dataWarning.username && dataWarning.username != 'dataSafety'?
                <NoteBox boxClass='error'>
                  {dataWarning.username == 'length'&&<p>Το όνομα χρήστη πρέπει να αποτελείται απο 6 εως 16 χαρακτήρες.</p>}
                  {dataWarning.username == 'allowedCharacters'&&<p>Το όνομα χρήστη πρέπει να περιέχει μόνο λατινικούς χαρακτήρες, _ και .</p>}
                  <Link to='/info/logindata#usernames'>Μαθετε περισσότερα</Link>
                  </NoteBox>:
(!!dataWarning.username || !!dataWarning.year)&&
<NoteBox boxClass='warning'>
{dataWarning.username == 'dataSafety'&&<p>Το όνομα χρήστη ενδέχεται να αποκαλύπτει το πραγματικό σας όνομα.</p>}
{dataWarning.year == 'dataSafety'&&<p>Το όνομα χρήστη ενδέχεται να αποκαλύπτει την ημερομηνία γέννησης σας.</p>}
                  
                  <Link to='/info/logindata#pii'>Μαθετε γιατι αυτό είναι επικινδυνο</Link>
                </NoteBox>
                
              }
              </AnimatePresence>
                </div>
                <div className='InputArea'>
                  <label htmlFor='passwordField'>Κωδικός Πρόσβασης</label>
                <input onInput={()=>{setDataWarning((({ password, ...o }) => o)(dataWarning));setNotedSafetyW(false)}} id='passwordField' name='password' type="password"/>
                <AnimatePresence>
                {!!dataWarning.password&&
                <NoteBox boxClass='error'>
                  {dataWarning.password == 'notSet'?
                  <p>Ορίστε έναν κωδικό πρόσβασης</p>
                  :
                    <><p>{dataWarning.password}</p>
                  <Link to='/info/logindata#usernames'>Μαθετε περισσότερα</Link>
                  </>
                  }
                
                </NoteBox>}
                </AnimatePresence>
                </div>
                <div className='selectArea'>
                <p>Είμαι μαθητής</p>
                <div className='radioList'>
                  <div className='radioPointer' role='radiogroup' ref={containerRef}/>
                    <ListItem category='school' name='elementarySchool' text='Δημοτικού'/>
<ListItem category='school' name='middleSchool' text='Γυμνασίου'/>
<ListItem category='school' name='highSchool' text='Λυκείου'/>
<ListItem category='school' name='completedSchool' text='Τελειόφοιτος'/>
</div>
<AnimatePresence>
{dataWarning.school &&
<NoteBox boxClass='error'>
<p>Επιλέξτε την βαθμίδα εκπαίδευσής σας</p>        
                  <Link to='/info/logindata#pii'>Σε τι χρησιμεύει αυτο;</Link>
                </NoteBox>}
                </AnimatePresence>
                </div>
                <div className='buttomArea'>
                <button type='button' aria-label='Επιστροφή στην πρώτη σελίδα' className="backButton mainButton" onClick={previous}><IconChevronLeft /></button>
          {!!notedSafetyW?<button className='mainButton' type='submit' disabled={scrollAction == 'loading'?'disabled':undefined}>Συνέχεια παρ' όλα αυτά{scrollAction == 'loading'&&<Loader fill='#fff'/>}</button>:<button className='mainButton loadButton' type='submit' disabled={scrollAction == 'loading'?'disabled':undefined}>Έλεγχος Στοιχείων{scrollAction == 'loading'&&<Loader fill='#fff'/>}</button>}
                </div>
                
                </form>
                </div>
                <div inert={scrollbeforeTab!==2?"inert":undefined} className='actionSlide'>
                <div ref={scrollActionRef} style={{minHeight:Math.round(height)}}>

                  {scrollAction == 'loading'?
                                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} className='loading'>
                                    <svg height="100" width="100" className='rippleLoader'>
  <circle class="inner" cx="50" cy="50" r="23.5" stroke-width="4" fill="none" />
  <circle class="outer" cx="50" cy="50" r="48.5" stroke-width="4" fill="none" />
</svg>
                                    <p>Έλεγχος Στοιχείων</p>
                                                      </motion.div>
                 
                  :scrollAction == 'back'?
                  <motion.div className='error' layout>
                  <IconX/>
                  <p>Υπήρξε κάποιο σφάλμα</p>
                  <AnimatePresence>
                  {!!showScrollBack&&<motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}  exit={{opacity:0,y:-20}} transition={{duration:0.3, ease:'easeOut'}} onClick={firstStep} className='mainButton'>Επιστροφή</motion.button>}
                  </AnimatePresence>
                </motion.div>
                  :scrollAction == 'success'?
                  <motion.div className='success'>
                  <Checkmark/>
                  <p>Τα στοιχεία σας ορίστηκαν επιτυχώς.</p>
                </motion.div>
                  : <motion.div className='scroll'>
                  <IconChevronRight/>
                  <p>Κυλήστε προς τα δεξια για έλεγχο στοιχείων</p>
                </motion.div>
                }
                
                  </div>  
                </div>
                </Slider>
    :<div className='loggedInpage'>
      <img className='logo' src='/instarat_low.png'/>
      <h1>Είστε ήδη συνδεδεμένος</h1>
      <Link to='/' className='mainButton'>Συνέχεια στην αρχική σελίδα</Link>
      <button onClick={logout} className='secondaryButton'>Αποσύνδεση</button>
      </div>}  
    </div>
  )
}