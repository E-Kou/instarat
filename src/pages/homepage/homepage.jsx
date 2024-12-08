import { IconDots, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './homepage.module.css';

function Post({file, user, description}){
  const [hearted, setHearted]=useState(false);
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
          <button>
            <IconDots/>
          </button>
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
      </div>

    
    </main>
  )
}
