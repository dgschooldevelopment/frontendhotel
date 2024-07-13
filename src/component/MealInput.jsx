import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing close icon
import '../css/MealInput.css';

const MealInput = ({ spaces, updateSpace, addSpace, removeSpace }) => {
  const fileInputRefs = useRef([]);

  useEffect(() => {
    // Initialize with one default meal space if spaces array is empty
    if (spaces.length === 0) {
      addSpace();
    }
  }, [spaces, addSpace]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSpace(index, 'photo', file); // Update space with file object
        updateSpace(index, 'photoPreview', reader.result); // Save the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    updateSpace(index, name, value); // Update space with changed details
  };

  const handleAddMeal = () => {
    addSpace();
  };

  const handleRemoveMeal = (index) => {
    removeSpace(index);
  };

  return (
    <div className="meal-input-container">
      {spaces.map((space, index) => (
        <div key={index}>
          <div className="form-group">
            <label className='mealname'>Add Meal Image or Video</label>
            <div className="meal-input">
              <input
                type="file"
                className="form-control-file"
                style={{ display: 'none' }}
                ref={el => fileInputRefs.current[index] = el} // Ref for file input
                onChange={(e) => handleFileChange(index, e)} // Handle file change for the input
              />
              <div
                className="image-placeholder_meal "
                onClick={() => fileInputRefs.current[index].click()} // Trigger file input click
              >
                {space.photoPreview ? (
                  <div className="image-preview">
                    <img src={space.photoPreview} alt="Meal Preview" />
                    <button type="button" onClick={() => updateSpace(index, { photo: null, photoPreview: '' })}>
                      <FontAwesomeIcon icon={faTimes} /> {/* Using close icon */}
                    </button>
                  </div>
                ) : (
                  <span className='meallabel'>Select an image or video</span>
                )}
              </div>
              <textarea
                className="form-control"
                name="details"
                rows="3"
                placeholder="Meal Description"
                value={space.details || ''}
                onChange={(e) => handleChange(e, index)} // Handle changes in meal details
              />
              {index > 0 && ( // Conditionally render Remove Meal button for additional meals
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveMeal(index)} // Remove meal button click handler
                >
                  Remove Meal
                </button>
              )}
            </div>
          </div>
        
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddMeal} // Add meal button click handler
      >
        Add Meal
      </button>
    </div>
  );
};

export default MealInput;
