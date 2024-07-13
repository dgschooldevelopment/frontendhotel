import React, { useState } from 'react';
import './MealInput';
function ImageUpload() {
  const [photos, setPhotos] = useState([
    { id: 1, url: '', description: '', file: null },
    { id: 2, url: '', description: '', file: null },
    { id: 3, url: '', description: '', file: null },
  ]);

  const handleAddPhoto = () => {
    setPhotos([...photos, { id: photos.length + 1, url: '', description: '', file: null }]);
  };

  const handleRemovePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const handlePhotoChange = (id, name, value) => {
    setPhotos(
      photos.map((photo) => {
        if (photo.id === id) {
          return { ...photo, [name]: value };
        }
        return photo;
      })
    );
  };

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(
          photos.map((photo) => {
            if (photo.id === id) {
              return { ...photo, url: reader.result, file };
            }
            return photo;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="photo-selector">
      <h2>Select Photos</h2>
      <div className="photo-container">
        {/* Left Side Image */}
        <div className="photo-input">
          <input
            type="file"
            name="photo"
            onChange={(event) => handleFileChange(photos[0].id, event)}
          />
          {photos[0].url && (
            <img
              src={photos[0].url}
              alt={`Photo ${photos[0].id}`}
              className="left-image"
            />
          )}
          <input
            type="text"
            name="description"
            value={photos[0].description}
            onChange={(event) => handlePhotoChange(photos[0].id, 'description', event.target.value)}
            placeholder="Add photo description"
          />
          <button onClick={() => handleRemovePhoto(photos[0].id)}>Remove</button>
        </div>
        {/* Right Side Images */}
        <div className="right-images">
          {photos.slice(1, 3).map((photo) => (
            <div key={photo.id} className="photo-input">
              <input
                type="file"
                name="photo"
                onChange={(event) => handleFileChange(photo.id, event)}
              />
              {photo.url && (
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="right-image"
                />
              )}
              <input
                type="text"
                name="description"
                value={photo.description}
                onChange={(event) => handlePhotoChange(photo.id, 'description', event.target.value)}
                placeholder="Add photo description"
              />
              <button onClick={() => handleRemovePhoto(photo.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleAddPhoto}>Add Photo</button>
    </div>
  );
}

export default ImageUpload;
