import { IconDots, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { FocusTrap } from 'focus-trap-react';
import { uniqueId } from 'lodash';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Homepage() {

  return (
    <main role='feed' id={styles.feed}>
      <div className={styles.storyBar}></div>
      <div className={styles.postRoller}>
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
      </div>

    
    </main>
  )
}
