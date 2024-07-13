
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing close icon
import '../css/Spaces.css';

const Spaces = ({ spaces, updateSpace, addSpace, removeSpace }) => {
  const fileInputRefs = useRef([]);

  useEffect(() => {
    // Ensure each space has at least one point by default
    spaces.forEach((space, index) => {
      if (Object.keys(space).filter(key => key.startsWith('point')).length === 0) {
        updateSpace(index, 'point1', ''); // Add default point
      }
    });
  }, [spaces, updateSpace]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSpace(index, 'photo', file);
        updateSpace(index, 'photoPreview', reader.result); // Save the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    updateSpace(index, 'photo', null); // Clear the photo
    updateSpace(index, 'photoPreview', ''); // Clear the photo preview URL
  };

  const handlePointChange = (index, pointIndex, value) => {
    updateSpace(index, `point${pointIndex}`, value); // Update space point based on index
  };

  const addPoint = (index) => {
    const nextPointIndex = Object.keys(spaces[index]).filter(key => key.startsWith('point')).length + 1;
    updateSpace(index, `point${nextPointIndex}`, ''); // Initialize new point with empty string
  };

  const removePoint = (index, pointIndex) => {
    // Only remove the point if there are more than one points
    const points = Object.keys(spaces[index]).filter(key => key.startsWith('point'));
    if (points.length > 1) {
      const updatedSpace = { ...spaces[index] };
      delete updatedSpace[`point${pointIndex}`];
      updateSpace(index, updatedSpace); // Update space state with the modified space object
    }
  };

  return (
    <div>
      <div className="spacelabel">
        <label>Spaces:</label>
      </div>
      <div className={`form-groupspace ${spaces.length > 2 ? 'scrollable' : ''}`}>
        {spaces.map((space, index) => (
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
                {space.photoPreview ? (
                  <div className="image-preview">
                    <img src={space.photoPreview} alt="Space Preview" />
                    <button type="button" onClick={() => handleRemoveImage(index)}>
                      <FontAwesomeIcon icon={faTimes} /> {/* Using close icon */}
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
                          <FontAwesomeIcon icon={faTimes} /> {/* Using close icon */}
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
              <button type="button" className="add-point-btn" onClick={() => addPoint(index)}>Add Point</button>
            </div>
            {spaces.length > 1 && (
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
