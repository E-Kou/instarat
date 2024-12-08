import { IconSearch } from '@tabler/icons-react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './search.css';

export default function Search() {
    const position = [51.505, -0.09]
  return (
    <main id='searchMain' className='noPadding lockWidth'>
        <div className='searchUI'>
        <h1>Αναζήτηση</h1>
       <div className='searchTop'>
                <label className='InputArea' htmlFor='userSearch'>
                <IconSearch/>    
            <input id='userSearch' type='text'/>
            </label>
            </div>
            <div className='userList'>

            <div id='locationSuggestion'>
                <img src='/locationLogo.png'/>
                <p>Θέλετε να προσθέσετε τον εαυτό σας στον χάρτη;</p>
                <button className='mainButton'>Ενεργοποίηση</button>
            </div>

            </div>
        </div>
          <MapContainer id='userMap' center={position} zoom={13} scrollWheelZoom={false}>
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
