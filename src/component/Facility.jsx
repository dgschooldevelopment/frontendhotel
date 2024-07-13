import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faDumbbell, faHotTub } from '@fortawesome/free-solid-svg-icons';
import '../css/Facility.css';

const Facility = () => {
  const [facilities, setFacilities] = useState({
    parking: false,
    gym: false,
    spa: false,
    // Add more facilities as needed
  });

  const handleFacilityChange = (facilityName) => {
    setFacilities({
      ...facilities,
      [facilityName]: !facilities[facilityName]
    });
  };

  return (
    <div className="form-group">
      <label className="FacilityLabel">Select Facilities</label>
      <div className="facility-row">
        <div
          className={`form-check1 ${facilities.parking ? 'selected' : ''}`}
          onClick={() => handleFacilityChange('parking')}
        >
          <div className="facility-icon-container">
            <FontAwesomeIcon icon={faCar} className="facility-icon" />
          </div>
          <span className='facilityname'>Parking</span>
        </div>
        <div
          className={`form-check1 ${facilities.gym ? 'selected' : ''}`}
          onClick={() => handleFacilityChange('gym')}
        >
          <div className="facility-icon-container">
            <FontAwesomeIcon icon={faDumbbell} className="facility-icon" />
          </div>
          <span className='facilityname'>Gym</span>
        </div>
        <div
          className={`form-check1 ${facilities.spa ? 'selected' : ''}`}
          onClick={() => handleFacilityChange('spa')}
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
