import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing close icon
import '../css/MealInput.css';
import Amenities from './Amenities';
import PriceBasedRooms from './PriceBasedRooms';
import OfferForm from './OfferForm';
import Spaces from './Spaces';
import Facility from './Facility';
import LocationDisplay from './LocationDisplay';
import PolicyRulesForm from './PolicyRulesForm';
import Faq from './Faq';
import AddPhoto from './AddPhoto';
import MealInput from './MealInput'; // Import MealInput component

function HotelForm() {
  const initialAmenitiesState = {
    swimmingPool: false,
    garden: false,
    beachView: false,
    mealsAvailable: false,
    wifi: false,
    // Add more amenities as needed
  };

  const [villaData, setVillaData] = useState({
    name: '',
    maxGuests: '',
    availableVillas: '',
    address: '',
    description: '',
    location: '',
    amenities: initialAmenitiesState,
    policyRules: [],
    homeRules: [],
    offers: [],
    meals: [], // Initialize meals array
    hotelImages: [],
    frontImages: [null, null, null],
    latitude: '',
    longitude: '',
  });

  const [villaFacilities, setVillaFacilities] = useState({
    parking: false,
    gym: false,
    spa: false,
  });

  const [priceRooms, setPriceRooms] = useState([]);

  const handleImageChange = (newImages) => {
    setVillaData((prevState) => ({
      ...prevState,
      frontImages: newImages,
    }));
  };

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
      hotelImages: [...prevState.hotelImages, { image_description: '', image: '', image_url: '' }],
    }));
  };

  const updateSpace = (index, name, value) => {
    setVillaData((prevState) => ({
      ...prevState,
      hotelImages: prevState.hotelImages.map((space, i) =>
        i === index ? { ...space, [name]: value } : space
      ),
    }));
  };

  const removeSpace = (index) => {
    setVillaData((prevState) => ({
      ...prevState,
      hotelImages: prevState.hotelImages.filter((space, i) => i !== index),
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

    const transformedData = {
      name: villaData.name,
      total_no_of_guests: villaData.maxGuests,
      total_no_of_rooms: villaData.availableVillas,
      type_of_accommodation: 'villa',
      location: villaData.address,
      about: villaData.description,
  
      price_per_room: priceRooms,
      amenities: villaData.amenities,
      policy_rules: villaData.policyRules,
      facilities: villaFacilities,
      FAQ: villaData.faqs,
      home_rules_and_truths: villaData.homeRules,
      offers: villaData.offers,
      meals: villaData.meals.map((meal, index) => ({
        meal_name:meal.meal_name,
        meal_descriptions: meal.meal_description,
        image_data: meal.image_data,
      })),
      hotel_images: villaData.hotelImages.filter((image) => image !== null).map((image, index) => ({
        image_url: image.url,
        image_description: image.description,
        image_data:image.image_data
      })),
      front_images: villaData.frontImages.filter((image) => image !== null).map((image, index) => ({
        image_url: image.url,
        image_description: image.description,
      })),
    };

    try {
      const response = await fetch('http://localhost:3001/hotel_insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Villa data submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting villa data:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        {/* AddPhoto component for uploading hotel images */}
      
            
            <AddPhoto images={villaData.frontImages} setImages={handleImageChange} />
     </div>
    
        {/* Villa Details Section */}
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
            {/* Component for Price Based Rooms */}
            <PriceBasedRooms priceRooms={priceRooms} setPriceRooms={setPriceRooms} />
          </div>
        </div>

        {/* Spaces Component */}
        

        {/* Amenities Component */}
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <Amenities amenities={villaData.amenities} handleAmenityChange={handleAmenityChange} />
          </div>
        </div>

        {/* OfferForm Component */}
        <OfferForm offers={villaData.offers} updateOffer={updateOffer} addOffer={addOffer} />

        {/* Facility Component */}
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <Facility facilities={villaFacilities} handleFacilityChange={handleFacilityChange} />
          </div>
        </div>
        <Spaces
          hotelImages={villaData.hotelImages}
          updateSpace={updateSpace}
          addSpace={addSpace}
          removeSpace={removeSpace}
        />

        {/* MealInput Component */}
        <MealInput
          meals={villaData.meals}
          updateMeal={(index, key, value) => {
            const updatedMeals = [...villaData.meals];
            updatedMeals[index] = {
              ...updatedMeals[index],
              [key]: value,
            };
            setVillaData((prevState) => ({
              ...prevState,
              meals: updatedMeals,
            }));
          }}
          addMeal={() => {
            setVillaData((prevState) => ({
              ...prevState,
              meals: [
                ...prevState.meals,
                {
                
                 image_data: '',
                  meal_description: '',
                },
              ],
            }));
          }}
          removeMeal={(index) => {
            const updatedMeals = [...villaData.meals];
            updatedMeals.splice(index, 1);
            setVillaData((prevState) => ({
              ...prevState,
              meals: updatedMeals,
            }));
          }}
        />

        {/* LocationDisplay Component */}
        <LocationDisplay location={villaData.location} latitude={villaData.latitude} longitude={villaData.longitude} />

        {/* PolicyRulesForm Component */}
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

        {/* Faq Component */}
        <Faq faqs={villaData.faqs} handleFAQChange={handleFAQChange} addFAQ={addFAQ} deleteFAQ={deleteFAQ} />

        {/* Submit Button */}
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </div>
 
    </form>
  );
}

export default HotelForm;
