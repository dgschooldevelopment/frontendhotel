import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
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

  const handlePointChange = (index, pointIndex, value) => {
    updateSpace(index, `point${pointIndex}`, value); // Update point
  };

  const addPoint = (index) => {
    const nextPointIndex = Object.keys(hotelImages[index]).filter(key => key.startsWith('point')).length + 1;
    updateSpace(index, `point${nextPointIndex}`, ''); // Initialize new point with empty string
  };

  const removePoint = (index, pointIndex) => {
    updateSpace(index, (prevSpace) => {
      // Create a copy of the previous space object
      const updatedSpace = { ...prevSpace };

      // Delete the targeted point property
      delete updatedSpace[`point${pointIndex}`];

      // Return the updated space object
      return updatedSpace;
    });
  };

  return (
    <div>
      <div className="spacelabel">
        Space
      </div>
      <div className={`form-groupspace ${hotelImages.length > 2 ? 'scrollable' : ''}`}>
        {hotelImages.map((space, index) => (
          <div key={index} className="space-item">
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeSpace(index)}
              aria-label={`Remove space ${index + 1}`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
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
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      aria-label={`Remove image from space ${index + 1}`}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <span>Select an image</span>
                )}
              </div>
            </div>
            <div className="space-details">
              <label className='addpoint'>Add details to your hotel rooms...</label>
              <ul>
                {Object.keys(space)
                  .filter(key => key.startsWith('point'))
                  .map((key, pointIndex) => (
                    <li key={key} className="point-item">
                      <div className="input-with-icon">
                        <input
                          type="text"
                          className="form-control point-input"
                          placeholder={`Point ${pointIndex + 1}`}
                          value={space[key] || ''}
                          onChange={(e) => handlePointChange(index, pointIndex + 1, e.target.value)}
                        />
                        <button
                          type="button"
                          className="remove-point-btn remove-btn"
                          onClick={() => removePoint(index, pointIndex + 1)}
                          aria-label={`Remove point ${pointIndex + 1} from space ${index + 1}`}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
              <button
                type="button"
                className="add-point-btn"
                onClick={() => addPoint(index)}
                aria-label={`Add point to space ${index + 1}`}
              >
                Add Point
              </button>
            </div>
          </div>
        ))}
        <div className="add-space-btn-container">
          <button
            type="button"
            className="add-space-btn"
            onClick={addSpace}
            aria-label="Add new space"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spaces;