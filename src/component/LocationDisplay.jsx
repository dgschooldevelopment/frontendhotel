import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Make sure Leaflet is imported

import '../css/LocationDisplay.css'; // Import your CSS file

const LocationDisplay = ({ location }) => {
  const [locationData, setLocationData] = useState({
    locationName: '',
    locationImage: '',
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      setLocationData({
        ...locationData,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocationData({ ...locationData, locationImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event) => {
    setLocationData({ ...locationData, locationName: event.target.value });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLocationData({
      ...locationData,
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <div className="location-display">
      <div className="form-group">
        <label className='locationname'>Add Location Image or Video</label>
       </div>
      <MapContainer center={[locationData.latitude || 0, locationData.longitude || 0]} zoom={13} scrollWheelZoom={false} style={{ height: '400px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[locationData.latitude || 0, locationData.longitude || 0]} draggable={true} onDragend={handleMapClick}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      
     
    </div>
  );
}

export default LocationDisplay;
