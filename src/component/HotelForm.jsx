// HotelForm.jsx

import React, { useState } from 'react';
import '../css/HotelForm.css';
import Amenities from './Amenities';
import PriceBasedRooms from './PriceBasedRooms';
import OfferForm from './OfferForm';
import Spaces from './Spaces';
import Facility from './Facility';
import MealInput from './MealInput';
import LocationDisplay from './LocationDisplay';
import PolicyRulesForm from './PolicyRulesForm';
import Faq from './Faq';
import AddPhoto from './AddPhoto'; // Import AddPhoto component

function HotelForm() {
  const [villaData, setVillaData] = useState({
    name: '',
    address: '',
    maxGuests: '',
    availableVillas: '',
    amenities: {
      swimmingPool: false,
      garden: false,
      beachView: false,
      mealsAvailable: false,
      wifi: false,
    },
    offers: [],
    description: '',
    spaces: [{ photo: '', details: '', location: '' }],
    location: '', // Ensure location state is managed correctly
    policyRules: [],
    homeRules: [],
    faqs: [],
    images: [null, null, null], // State for images
  });

  const [villaFacilities, setVillaFacilities] = useState({
    parking: false,
    gym: false,
    spa: false,
    // Add more facilities as needed
  });

  const [priceRooms, setPriceRooms] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setVillaData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAmenityChange = (newAmenities) => {
    setVillaData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const handleFacilityChange = (event) => {
    const { name, checked } = event.target;
    setVillaFacilities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const addOffer = () => {
    setVillaData((prevState) => ({
      ...prevState,
      offers: [...prevState.offers, { name: '', details: '' }],
    }));
  };

  const updateOffer = (index, name, value) => {
    setVillaData((prevState) => ({
      ...prevState,
      offers: prevState.offers.map((offer, i) =>
        i === index ? { ...offer, [name]: value } : offer
      ),
    }));
  };

  const addSpace = () => {
    setVillaData((prevState) => ({
      ...prevState,
      spaces: [
        ...prevState.spaces,
        { photo: '', details: '', location: '' },
      ],
    }));
  };

  const updateSpace = (index, name, value) => {
    setVillaData((prevState) => ({
      ...prevState,
      spaces: prevState.spaces.map((space, i) =>
        i === index ? { ...space, [name]: value } : space
      ),
    }));
  };

  const removeSpace = (index) => {
    setVillaData((prevState) => ({
      ...prevState,
      spaces: prevState.spaces.filter((space, i) => i !== index),
    }));
  };

  const handlePolicyRuleChange = (event, index) => {
    const newPolicyRules = [...villaData.policyRules];
    newPolicyRules[index] = event.target.value;
    setVillaData((prevState) => ({
      ...prevState,
      policyRules: newPolicyRules,
    }));
  };

  const handleHomeRuleChange = (event, index) => {
    const newHomeRules = [...villaData.homeRules];
    newHomeRules[index] = event.target.value;
    setVillaData((prevState) => ({
      ...prevState,
      homeRules: newHomeRules,
    }));
  };

  const addPolicyRule = () => {
    setVillaData((prevState) => ({
      ...prevState,
      policyRules: [...prevState.policyRules, ''],
    }));
  };

  const addHomeRule = () => {
    setVillaData((prevState) => ({
      ...prevState,
      homeRules: [...prevState.homeRules, ''],
    }));
  };

  const deletePolicyRule = (index) => {
    const newPolicyRules = [...villaData.policyRules];
    newPolicyRules.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      policyRules: newPolicyRules,
    }));
  };

  const deleteHomeRule = (index) => {
    const newHomeRules = [...villaData.homeRules];
    newHomeRules.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      homeRules: newHomeRules,
    }));
  };

  const handleFAQChange = (event, index) => {
    const { name, value } = event.target;
    const newFaqs = [...villaData.faqs];
    newFaqs[index][name] = value;
    setVillaData((prevState) => ({
      ...prevState,
      faqs: newFaqs,
    }));
  };

  const addFAQ = () => {
    setVillaData((prevState) => ({
      ...prevState,
      faqs: [...prevState.faqs, { question: '', answer: '' }],
    }));
  };

  const deleteFAQ = (index) => {
    const newFaqs = [...villaData.faqs];
    newFaqs.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      faqs: newFaqs,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Villa data:', villaData);

    try {
      const response = await fetch('http://localhost:3001/hotel_insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(villaData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Villa data submitted successfully:', data);
      // Optionally, reset form state or navigate to another page upon successful submission
    } catch (error) {
      console.error('Error submitting villa data:', error.message);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <AddPhoto
          images={villaData.images}
          setImages={(newImages) =>
            setVillaData((prevState) => ({
              ...prevState,
              images: newImages,
            }))
          }
        />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control plain-line-input"
                id="name"
                name="name"
                placeholder="Villa Name"
                value={villaData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control plain-line-input"
                id="address"
                name="address"
                placeholder="Address"
                value={villaData.address}
                onChange={handleChange}
              />
            </div>
            <div className="guestdata">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  id="maxGuests"
                  name="maxGuests"
                  placeholder="Maximum Guests"
                  value={villaData.maxGuests}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="availableVillas"
                  name="availableVillas"
                  placeholder="Add available villas and room +"
                  value={villaData.availableVillas}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <PriceBasedRooms
              priceRooms={priceRooms}
              setPriceRooms={setPriceRooms}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-6">
            <Amenities
              amenities={villaData.amenities}
              handleAmenityChange={handleAmenityChange}
            />
          </div>
        </div>

        <OfferForm
          offers={villaData.offers}
          updateOffer={updateOffer}
          addOffer={addOffer}
        />

        <Spaces
          spaces={villaData.spaces}
          updateSpace={updateSpace}
          addSpace={addSpace}
          removeSpace={removeSpace}
        />

        <div className="row">
          <div className="col-md-6 offset-md-6">
            <Facility
              facilities={villaFacilities}
              handleFacilityChange={handleFacilityChange}
            />
          </div>
        </div>

        <MealInput
          spaces={villaData.spaces}
          updateSpace={updateSpace}
          addSpace={addSpace}
          removeSpace={removeSpace}
        />

        {/* LocationDisplay component */}
        <LocationDisplay location={villaData.location} />

        {/* Policy and Home Rules Form */}
        <PolicyRulesForm
          policyRules={villaData.policyRules}
          homeRules={villaData.homeRules}
          handlePolicyRuleChange={handlePolicyRuleChange}
          handleHomeRuleChange={handleHomeRuleChange}
          addPolicyRule={addPolicyRule}
          addHomeRule={addHomeRule}
          deletePolicyRule={deletePolicyRule}
          deleteHomeRule={deleteHomeRule}
        />

        {/* FAQ Component */}
        <Faq
          faqs={villaData.faqs}
          handleFAQChange={handleFAQChange}
          addFAQ={addFAQ}
          deleteFAQ={deleteFAQ}
        />

        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default HotelForm;
