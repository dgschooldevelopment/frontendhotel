import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/Spaces.css';

const Spaces = ({ hotelImages, updateSpace, addSpace, removeSpace }) => {
  const fileInputRefs = useRef([]);

  useEffect(() => {
    // Ensure each space has at least one point by default
    hotelImages.forEach((_, index) => {
      if (Object.keys(hotelImages[index]).filter(key => key.startsWith('point')).length === 0) {
        updateSpace(index, 'point1', ''); // Add default point
      }
    });
  }, [hotelImages, updateSpace]);

  useEffect(() => {
    // Add a default space if there are no spaces
    if (hotelImages.length === 0) {
      addSpace();
    }
  }, [hotelImages, addSpace]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSpace(index, 'image_data', reader.result); // Save base64 encoded image data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    updateSpace(index, 'image_data', null); // Clear the image data
  };

  const handleCaptionChange = (index, value) => {
    updateSpace(index, 'image_description.caption', value); // Update image caption
  };

  const handleLocationChange = (index, value) => {
    updateSpace(index, 'image_description.location', value); // Update image location
  };

  const handlePointChange = (index, pointIndex, value) => {
    updateSpace(index, `point${pointIndex}`, value); // Update point
  };

  const addPoint = (index) => {
    const nextPointIndex = Object.keys(hotelImages[index]).filter(key => key.startsWith('point')).length + 1;
    updateSpace(index, `point${nextPointIndex}`, ''); // Initialize new point with empty string
  };

  const removePoint = (index, pointIndex) => {
    // Only remove the point if there are more than one points
    const points = Object.keys(hotelImages[index]).filter(key => key.startsWith('point'));
    if (points.length > 1) {
      const updatedSpace = { ...hotelImages[index] };
      delete updatedSpace[`point${pointIndex}`];
      updateSpace(index, updatedSpace); // Update space state with the modified space object
    }
  };

  return (
    <div>
      <div className="spacelabel">
        {/* Optional: Label for the Spaces section */}
        Space
      </div>
      <div className={`form-groupspace ${hotelImages.length > 2 ? 'scrollable' : ''}`}>
        {hotelImages.map((space, index) => (
          <div key={index} className="space-item">
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                ref={el => fileInputRefs.current[index] = el}
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(index, e)}
              />
              <div
                className="image-placeholder"
                onClick={() => fileInputRefs.current[index].click()}
              >
                {space.image_data ? (
                  <div className="image-preview">
                    <img src={space.image_data} alt={`Space ${index + 1}`} />
                    <button type="button" onClick={() => handleRemoveImage(index)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <span>Select an image</span>
                )}
              </div>
            </div>
            <div className="space-details">
             
              <ul>
                {Object.keys(space)
                  .filter(key => key.startsWith('point'))
                  .map((key) => (
                    <li key={key} className="point-item">
                      <div className="input-with-icon">
                        <input
                          type="text"
                          className="form-control point-input"
                          placeholder={`Point ${key.slice(5)}`}
                          value={space[key] || ''}
                          onChange={(e) => handlePointChange(index, parseInt(key.slice(5)), e.target.value)}
                        />
                        <button
                          type="button"
                          className="remove-point-btn remove-btn"
                          onClick={() => removePoint(index, parseInt(key.slice(5)))}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
              <button type="button" className="add-point-btn" onClick={() => addPoint(index)}>Add Point</button>
            </div>
            {hotelImages.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removeSpace(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="add-space-btn-container">
        <button type="button" className="add-space-btn" onClick={addSpace}>
          Add Space
        </button>
      </div>
    </div>
  );
};

export default Spaces;
