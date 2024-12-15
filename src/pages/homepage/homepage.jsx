import SSizeContext from '@/utils/screenSize';
import { IconDots, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { FocusTrap } from 'focus-trap-react';
import { uniqueId } from 'lodash';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import styles from './homepage.module.css';

function Post({file, user, description}){
  const [hearted, setHearted]=useState(false);
  const [showDotMenu, setShowDotMenu]=useState(false);
  const id = uniqueId('post_options_');

  const focusTrapOptions ={
    escapeDeactivates:true,
    clickOutsideDeactivates:true,
    onDeactivate:()=>setShowDotMenu(false),
  }
  return(
    <article className={styles.post}>
      <div className={styles.mediaArea}>
      <img src={file}/>
      </div>
      <div className={styles.infoArea}>
        <div className={styles.actionArea}>
        <Link className={styles.userName} to={`/user/${user}`}>@{user}</Link>
        <div>
          <button onClick={()=>{setHearted(!hearted)}}>
            {hearted?<IconHeartFilled style={{color:'red'}} />:<IconHeart/>}
          </button>
          <FocusTrap active={showDotMenu} focusTrapOptions={focusTrapOptions} >
          <div className={styles.optionsArea}>
          <button aria-haspopup="menu" aria-controls={id} title='Περισσότερες επιλογές σχετικά με αυτήν την ανάρτηση' onClick={()=>setShowDotMenu(!showDotMenu)}>
            <IconDots/>
          </button>
          <AnimatePresence>
          {showDotMenu&&
         <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className={styles.postOptionMenu}>
          <div id={id} role="menu">
            <button role='menuitem'>Αναφορά</button>
            <button role='menuitem'>Κοινοποίηση</button>
            </div>
          </motion.div>
          }
          </AnimatePresence>
          </div></FocusTrap>
        </div>
        </div>
        <p>{description}</p>
      </div>
    </article>
  )
}

function WelcomePost({skipTutorial}){
  const [hearted, setHearted]=useState(false);
  const [showDotMenu, setShowDotMenu]=useState(false);
  const id = uniqueId('post_options_');

  const focusTrapOptions ={
    escapeDeactivates:true,
    clickOutsideDeactivates:true,
    onDeactivate:()=>setShowDotMenu(false),
  }
  return(
    <article className={styles.post}>
      <div className={styles.mediaArea}>
      <img src='/signUpMouse.jpeg'/>
      </div>
      <div className={styles.infoArea}>
        <div className={styles.actionArea}>
        <h1 className={styles.userName}>Καλωσορίσατε στο Instarat!</h1>
        <div>
          <button onClick={()=>{setHearted(!hearted)}}>
            {hearted?<IconHeartFilled style={{color:'red'}} />:<IconHeart/>}
          </button>
          <FocusTrap active={showDotMenu} focusTrapOptions={focusTrapOptions} >
          <div className={styles.optionsArea}>
          <button aria-haspopup="menu" aria-controls={id} title='Περισσότερες επιλογές σχετικά με αυτήν την ανάρτηση' onClick={()=>setShowDotMenu(!showDotMenu)}>
            <IconDots/>
          </button>
          <AnimatePresence>
          {showDotMenu&&
         <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className={styles.postOptionMenu}>
          <div id={id} role="menu">
            <button onClick={skipTutorial} role='menuitem'>Παράλειψη εισαγωγής</button>
            </div>
          </motion.div>
          }
          </AnimatePresence>
          </div></FocusTrap>
        </div>
        </div>
        <div className={styles.notice}>
        <p>Ελάτε να σας δείξουμε τα κατατόπια, ας ανακαλύψουμε αυτή την εφαρμογή!</p>
        <button className='mainButton'>Ξεκινήστε</button>
        </div>
      </div>
    </article>
  )
}

export default function Homepage() {
  const { width } = useContext(SSizeContext);
  const [postListRef, {width:feedWidth}] = useMeasure();
  const [tutorialCompleted,setTiutorialCompleted] = useState(null);

  function skipTutorial(){
    localStorage.setItem('tutoralDone', 'skipped');
    setTiutorialCompleted(true)
  }

  useEffect(()=>{
    if(!!localStorage.getItem('tutoralDone')){
      setTiutorialCompleted(true)
    } else{
      setTiutorialCompleted(false)
    }
  },[])

  return (
    <main role='feed' className='noPadding' id={styles.feed}>
      <div aria-hidden="true" id={styles.logoTop}>
        <h1><img src='/instarat_low.png' /> instarat</h1>
      </div>
      <div className={styles.storyBar}></div>
      <div ref={postListRef} className={`${styles.postRoller} ${feedWidth + 20>=width?styles.mobileView:''}`}>
        {tutorialCompleted === false?
        <WelcomePost skipTutorial={skipTutorial}/>
        :tutorialCompleted === true &&
        <>
<Post file='https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i3drYviVJQSE/v0/-1x-1.webp' user='tester1' description='ma.writes - Followers: 215 | Following: 180
@travel_buddy99 - Followers: 340 | Following: 430
@john_doe87 - Followers: 105 | Following: 78
@sofia.foodie - Followers: 150 | Following: 220
@lily.gamer - Followers: 92 | Following: 60
@mike_fitness10 - Followers: 410 | Following: 300
@nora_photographs - Followers: 285 | Following: 245
@brian_bookshelf - Followers: 180 | Following: 190
@sam.the.artist - Followers: 320 | Following: 210'/>
<Post file='https://cdn.shopify.com/s/files/1/0070/7032/files/SHOPIFY_BLOG_how_often_to_post_on_Instagram_v02.png?v=1642195326' user='tester1' description='ma.writes - Followers: 215 | Following: 180
@travel_buddy99 - Followers: 340 | Following: 430
@john_doe87 - Followers: 105 | Following: 78
@sofia.foodie - Followers: 150 | Following: 220
@lily.gamer - Followers: 92 | Following: 60
@mike_fitness10 - Followers: 410 | Following: 300
@nora_photographs - Followers: 285 | Following: 245
@brian_bookshelf - Followers: 180 | Following: 190
@sam.the.artist - Followers: 320 | Following: 210'/>
<Post file='https://media.sproutsocial.com/uploads/2024/04/Best-times-to-post_2024_IG_heatmap-global.png' user='tester1' description='ma.writes - Followers: 215 | Following: 180
@travel_buddy99 - Followers: 340 | Following: 430
@john_doe87 - Followers: 105 | Following: 78
@sofia.foodie - Followers: 150 | Following: 220
@lily.gamer - Followers: 92 | Following: 60
@mike_fitness10 - Followers: 410 | Following: 300
@nora_photographs - Followers: 285 | Following: 245
@brian_bookshelf - Followers: 180 | Following: 190
@sam.the.artist - Followers: 320 | Following: 210'/>
<Post file='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyv4hJ4sAagzGnfpnS1lOxjNE2W8q5XPwLA&s' user='tester1' description='ma.writes - Followers: 215 | Following: 180
@travel_buddy99 - Followers: 340 | Following: 430
@john_doe87 - Followers: 105 | Following: 78
@sofia.foodie - Followers: 150 | Following: 220
@lily.gamer - Followers: 92 | Following: 60
@mike_fitness10 - Followers: 410 | Following: 300
@nora_photographs - Followers: 285 | Following: 245
@brian_bookshelf - Followers: 180 | Following: 190
@sam.the.artist - Followers: 320 | Following: 210'/>
</>
}
      </div>

    
    </main>
  )
}
