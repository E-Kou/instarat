import React from 'react';
import { useParams } from "react-router-dom";
import WelocomeToHere from '../../utils/welocometoHere';


export default function Userpage() {
          const {username} = useParams();
  return (
    <div>
        <div id='userHeader'>
        <h2>Χρήστης: {username}</h2>
        </div>
    {localStorage.getItem("loadedApp") !== "Loaded"?<WelocomeToHere>Ορίστε στοίχεια χρήστη για να δείτε περισσότερα</WelocomeToHere>
    :
    <div>Psots</div>
    }
    </div>
  )
}
