import React, { useRef, useEffect } from 'react';
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
        const base64String = reader.result.split(',')[1]; // Get base64 string without data:image/jpeg;base64,
        updateMeal(index, 'image_data', base64String); // Save image data as base64
        updateMeal(index, 'photoPreview', reader.result); // Save the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    updateMeal(index, 'meal_description', value); // Update meal description
  };

  const handleRemoveMeal = (index) => {
    removeMeal(index); // Remove meal
  };

  const handleAddMeal = () => {
    addMeal(); // Add new meal
  };

  const handleClearImage = (index) => {
    updateMeal(index, 'image_data', ''); // Clear image_data
    updateMeal(index, 'photoPreview', ''); // Clear photoPreview
  };

  return (
    <div className="meal-input-container">
      {meals.map((meal, index) => (
        <div key={index}>
          <div className="form-group">
            {/* Input for Meal Description */}
            <textarea
              className="form-control"
              name="meal_description"
              rows="3"
              placeholder="Meal Description"
              value={meal.meal_description || ''}
              onChange={(e) => handleChange(e, index)} // Handle changes in meal description
              style={{ width: '80%' }} // Inline style for textarea width
            />
          </div>
          <div className="form-group">
            {/* Input for Meal Image/Video */}
            <label className="spacelabel">Meal Image or Video</label>
            <div className="meal-input">
              {/* Hidden file input */}
              <input
                type="file"
                className="form-control-file"
                style={{ display: 'none' }}
                ref={(el) => (fileInputRefs.current[index] = el)} // Ref for file input
                onChange={(e) => handleFileChange(index, e)} // Handle file change for the input
              />
              {/* Image placeholder */}
              <div
                className="image-placeholder_meal"
                onClick={() => fileInputRefs.current[index].click()} // Trigger file input click
              >
                {meal.photoPreview ? (
                  // Show preview if photoPreview exists
                  <div className="image-preview">
                    <img src={meal.photoPreview} alt="Meal Preview" />
                    <button
                      type="button"
                      onClick={() => handleClearImage(index)}
                    >
                      <FontAwesomeIcon icon={faTimes} /> {/* Using close icon */}
                    </button>
                  </div>
                ) : (
                  // Placeholder text if no preview
                  <span>Select an image or video</span>
                )}
              </div>
            </div>
          </div>
          {/* Remove meal button */}
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
      ))}

      {/* Add meal button */}
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
