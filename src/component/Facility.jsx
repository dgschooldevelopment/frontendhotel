import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faDumbbell, faHotTub } from '@fortawesome/free-solid-svg-icons';
import '../css/Facility.css';

const Facility = ({ facilities, handleFacilityChange }) => {
  const toggleAmenity = (name) => {
    handleFacilityChange({
      ...facilities,
      [name]: !facilities[name], // Toggle the value of the clicked facility
    });
  };

  return (
    <div className="form-group">
      <label className="FacilityLabel">Select Facilities</label>
      <div className="facility-row">
        <div
          className={`form-check1 ${facilities.parking ? 'selected' : ''}`}
          onClick={() => toggleAmenity('parking')}
        >
          <div className="facility-icon-container">
            <FontAwesomeIcon icon={faCar} className="facility-icon" />
          </div>
          <span className='facilityname'>Parking</span>
        </div>
        <div
          className={`form-check1 ${facilities.gym ? 'selected' : ''}`}
          onClick={() => toggleAmenity('gym')}
        >
          <div className="facility-icon-container">
            <FontAwesomeIcon icon={faDumbbell} className="facility-icon" />
          </div>
          <span className='facilityname'>Gym</span>
        </div>
        <div
          className={`form-check1 ${facilities.spa ? 'selected' : ''}`}
          onClick={() => toggleAmenity('spa')}
        >
          <div className="facility-icon-container">
            <FontAwesomeIcon icon={faHotTub} className="facility-icon" />
          </div>
          <span className='facilityname'>Spa</span>
        </div>
        {/* Add more facility items as needed */}
      </div>
    </div>
  );
};

export default Facility;
