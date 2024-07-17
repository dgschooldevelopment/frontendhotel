import React, { useState } from 'react';
import '../css/PriceBasedRooms.css'; // Ensure this path is correct based on your project structure

const PriceBasedRooms = ({ priceRooms, setPriceRooms }) => {
  const [newRoomType, setNewRoomType] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const addRoom = () => {
    if (newRoomType && newPrice) {
      setPriceRooms([...priceRooms, { roomType: newRoomType, price: newPrice }]);
      setNewRoomType('');
      setNewPrice('');
    }
  };

  const updateRoom = (index, name, value) => {
    setPriceRooms((prevRooms) =>
      prevRooms.map((room, i) =>
        i === index ? { ...room, [name]: value } : room
      )
    );
  };

  return (
    <div className="price-rooms-container">
      <div className="price-section">
        <label className="villasprice">Add villas prices +:</label>
        {priceRooms.map((room, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Room Type"
              value={room.roomType}
              onChange={(e) => updateRoom(index, 'roomType', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={room.price}
              onChange={(e) => updateRoom(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <div className="add-room-form">
          <input
            type="text"
            placeholder="Add villas prices +"
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Add per villas prices + "
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button type="button" className="add-room-btn" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBasedRooms;
