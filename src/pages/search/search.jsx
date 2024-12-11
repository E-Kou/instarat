import { IconDots, IconMapPin, IconSearch } from '@tabler/icons-react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './search.css';

function UserBox({username, followers, pfp }){
  return(
    <li>
      <Link to={`/user/${username}`}>
      <img src={pfp}/>
    <div className='rightInfo'>
      <h2>{username}</h2>
      <p>{followers} ακόλουθοι</p>
    </div>
    </Link>
    <div>
      <button><IconMapPin/></button>
      <button>
            <IconDots/>
          </button>
    </div>
    </li>
  )
}

export default function Search() {
    const position = [51.505, -0.09]
  return (
    <main id='searchMain' className='noPadding fullWidth'>
        <div className='searchUI'>
        <h1>Αναζήτηση</h1>
       <div className='searchTop'>
                <label className='InputArea' htmlFor='userSearch'>
                <IconSearch/>    
            <input placeholder='Εισάγετε όνομα χρήστη' id='userSearch' type='text'/>
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
            <div id='locationSuggestion'>
                    <div className='topText'>
                <img src='/locationLogo.png'/>
                <div>
                <h3>Θέλετε να προσθέσετε τον εαυτό σας στον χάρτη;</h3>
                <p>Κοινοποιήστε την τοποθεσία σας με όλη τη Γη, μέσω της <Link to='/services/instaloc'>InstaLoc</Link></p>
                </div>
                </div>
                <button className='mainButton'>Ενεργοποίηση</button>
            </div>
        </div>
          <MapContainer id='userMap' center={position} zoom={0} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
        <Marker position={position}>
          <Popup>
            <Link to='safg'>@dasfg</Link>
          </Popup>
        </Marker>
      </MapContainer>
      </main>
  )
}
