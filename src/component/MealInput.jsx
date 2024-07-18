import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/MealInput.css';

const MealInput = ({ meals, updateMeal, addMeal, removeMeal }) => {
  const fileInputRefs = useRef([]);

  useEffect(() => {
    if (meals.length === 0) {
      addMeal();
    }
  }, [meals, addMeal]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        updateMeal(index, 'photoPreview', reader.result);
        updateMeal(index, 'image_data', base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    updateMeal(index, name, value);
  };

  const handleRemoveMeal = (index) => {
    removeMeal(index);
  };

  const handleAddMeal = () => {
    addMeal();
  };

  return (
    <div className="meal-input-container">
      {meals.map((meal, index) => (
        <div key={index} className="meal-input-wrapper">
          <div className="form-group">
            <label className='spacelabel'>Meal Image or Video</label>
            <div className="meal-input">
              <input
                type="file"
                className="form-control-file"
                style={{ display: 'none' }}
                ref={(el) => (fileInputRefs.current[index] = el)}
                onChange={(e) => handleFileChange(index, e)}
              />
              <div
                className="image-placeholder_meal"
                onClick={() => fileInputRefs.current[index].click()}
              >
                {meal.photoPreview ? (
                  <div className="image-preview">
                    <img src={meal.photoPreview} alt="Meal Preview" />
                    <button
                      type="button"
                      onClick={() => {
                        updateMeal(index, 'photoPreview', '');
                        updateMeal(index, 'image_data', '');
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <span>Select an image or video</span>
                )}
              </div>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                placeholder="Meal Description"
                value={meal.description || ''}
                onChange={(e) => handleChange(e, index)}
                style={{ width: '80%' }}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveMeal(index)}
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
        onClick={handleAddMeal}
      >
        Add Meal
      </button>
    </div>
  );
};

export default MealInput;
