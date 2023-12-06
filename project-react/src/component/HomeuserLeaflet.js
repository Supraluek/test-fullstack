/* global L */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/leaflet.css'



const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5860/5860579.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const HomeuserLeaflet = () => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1010/shops')
            .then(response => response.json())
            .then(data => setShops(data))
            .catch(error => console.error('Error fetching shops:', error));
    }, []);

    return (
            <MapContainer className='map' center={[0, 0]} zoom={17} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {shops.map((shop, index) => (
                    <Marker key={index} position={[shop.latitude, shop.longitude]} icon={customIcon}>
                        <Popup>
                            <div>
                                <p>ชื่อ: {shop.name}</p>
                                <p>ละติจูด: {shop.latitude}</p>
                                <p>ลองจิจูด: {shop.longitude}</p>
                                
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
    );
};

export default HomeuserLeaflet;

