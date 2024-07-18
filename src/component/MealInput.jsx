import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing close icon
import '../css/MealInput.css';

const MealInput = ({ meals, updateMeal, addMeal, removeMeal }) => {
  const fileInputRefs = useRef([]);

  useEffect(() => {
    // Initialize with one default meal space if meals array is empty
    if (meals.length === 0) {
      addMeal();
    }
  }, [meals, addMeal]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 part after comma
        updateMeal(index, 'photoPreview', reader.result); // Update meal state with preview URL
        // Avoid updating 'image_data' here to prevent storing base64 in 'image_data'
      };
      reader.readAsDataURL(file); // Read file as data URL (base64)
    }
  };
  

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    updateMeal(index, name, value); // Update meal details
  };

  const handleRemoveMeal = (index) => {
    removeMeal(index); // Remove meal
  };

  const handleAddMeal = () => {
    addMeal(); // Add new meal
  };

  return (
    <div className="meal-input-container">
      {meals.map((meal, index) => (
        <div key={index}>
          <div className="form-group">
            <label className='spacelabel'>Meal Image or Video</label>
            <div className="meal-input">
              <input
                type="file"
                className="form-control-file"
                style={{ display: 'none' }}
                ref={(el) => (fileInputRefs.current[index] = el)} // Ref for file input
                onChange={(e) => handleFileChange(index, e)} // Handle file change for the input
              />
              <div
                className="image-placeholder_meal"
                onClick={() => fileInputRefs.current[index].click()} // Trigger file input click
              >
                {meal.photoPreview ? (
                  <div className="image-preview">
                    <img src={meal.photoPreview} alt="Meal Preview" />
                    <button
                      type="button"
                      onClick={() => updateMeal(index, { image_data: '', photoPreview: '' })}
                    >
                      <FontAwesomeIcon icon={faTimes} /> {/* Using close icon */}
                    </button>
                  </div>
                ) : (
                  <span>Select an image or video</span>
                )}
              </div>
              <textarea
                className="form-control"
                name="meal_description"
                rows="3"
                placeholder="Meal Description"
                value={meal.description || ''}
                onChange={(e) => handleChange(e, index)} // Handle changes in meal details
                style={{ width: '80%' }} // Use double curly braces for inline styles in React
              />

              {index > 0 && (
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
