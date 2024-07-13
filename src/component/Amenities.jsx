import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmingPool, faTree, faUmbrellaBeach, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons';
import '../css/Amenities.css';

const Amenities = ({ amenities, handleAmenityChange }) => {
  const toggleAmenity = (event) => {
    const { name, checked } = event.target;
    handleAmenityChange({
      ...amenities,
      [name]: checked,
    });
  };

  return (
    <div className="form-group">
      <label className="Amenitieslabel">Add your Villas facility +</label>
      <div className="amenities-row">
        <div className={`form-check ${amenities.swimmingPool ? 'selected' : ''}`}>
          <label className="form-check-label" htmlFor="swimmingPool">
            <input
              type="checkbox"
              className="form-check-input"
              id="swimmingPool"
              name="swimmingPool"
              checked={amenities.swimmingPool}
              onChange={toggleAmenity}
            />
            <div className="amenity-icon-container">
              <FontAwesomeIcon icon={faSwimmingPool} className="amenity-icon" />
            </div>
            <span className='animTitle'>Swimming Pool</span>
          </label>
        </div>
        <div className={`form-check ${amenities.garden ? 'selected' : ''}`}>
          <label className="form-check-label" htmlFor="garden">
            <input
              type="checkbox"
              className="form-check-input"
              id="garden"
              name="garden"
              checked={amenities.garden}
              onChange={toggleAmenity}
            />
            <div className="amenity-icon-container">
              <FontAwesomeIcon icon={faTree} className="amenity-icon" />
            </div>
            <span className='animTitle'>Garden</span>
          </label>
        </div>
        <div className={`form-check ${amenities.beachView ? 'selected' : ''}`}>
          <label className="form-check-label" htmlFor="beachView">
            <input
              type="checkbox"
              className="form-check-input"
              id="beachView"
              name="beachView"
              checked={amenities.beachView}
              onChange={toggleAmenity}
            />
            <div className="amenity-icon-container">
              <FontAwesomeIcon icon={faUmbrellaBeach} className="amenity-icon" />
            </div>
            <span className='animTitle'>Beach View</span>
          </label>
        </div>
        <div className={`form-check ${amenities.mealsAvailable ? 'selected' : ''}`}>
          <label className="form-check-label" htmlFor="mealsAvailable">
            <input
              type="checkbox"
              className="form-check-input"
              id="mealsAvailable"
              name="mealsAvailable"
              checked={amenities.mealsAvailable}
              onChange={toggleAmenity}
            />
            <div className="amenity-icon-container">
              <FontAwesomeIcon icon={faUtensils} className="amenity-icon" />
            </div>
            <span className='animTitle'>Meals Available</span>
          </label>
        </div>
        <div className={`form-check ${amenities.wifi ? 'selected' : ''}`}>
          <label className="form-check-label" htmlFor="wifi">
            <input
              type="checkbox"
              className="form-check-input"
              id="wifi"
              name="wifi"
              checked={amenities.wifi}
              onChange={toggleAmenity}
            />
            <div className="amenity-icon-container">
              <FontAwesomeIcon icon={faWifi} className="amenity-icon" />
            </div>
            <span className='animTitle'>WiFi</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
