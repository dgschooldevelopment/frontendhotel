import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

import '../css/LocationDisplay.css'; // Import your CSS file

const LocationDisplay = ({ onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Get current user location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialLocation = { latitude, longitude };
          setCurrentLocation(initialLocation);
          setSelectedLocation(initialLocation); // Set initial selected location to current location
          if (onLocationChange) {
            onLocationChange(initialLocation); // Pass initial location to parent component
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [onLocationChange]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({
      latitude: lat,
      longitude: lng,
    });
    if (onLocationChange) {
      onLocationChange({ latitude: lat, longitude: lng }); // Pass selected location to parent component
    }
  };

  return (
    <div className="location-display">
      <h2 className='spacelabel'> Location</h2>
      {currentLocation ? (
        <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={13} scrollWheelZoom={true} style={{ height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedLocation && (
            <Marker
              position={[selectedLocation.latitude, selectedLocation.longitude]}
              draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setSelectedLocation({ latitude: lat, longitude: lng });
                  if (onLocationChange) {
                    onLocationChange({ latitude: lat, longitude: lng }); // Pass dragged location to parent component
                  }
                },
              }}
            >
              <Popup>
                Selected Location: <br />
                Latitude: {selectedLocation.latitude} <br />
                Longitude: {selectedLocation.longitude}
              </Popup>
            </Marker>
          )}
          <UseMapEventsWrapper onClick={handleMapClick} />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

function UseMapEventsWrapper({ onClick }) {
  const map = useMapEvents({
    click: onClick,
  });
  return null;
}

export default LocationDisplay;
