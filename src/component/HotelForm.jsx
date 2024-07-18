import React, { useState } from 'react';
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
  const initialfacilitiesState = {
    parking: false,
    gym: false,
    spa: false,
    // Add more amenities as needed
  };

  const [villaData, setVillaData] = useState({
    name: '',
    maxGuests: '', // Add maxGuests to state
    minGuests: '', 
    total_no_of_rooms: '',
    location: '',
    about: '',
    amenities: initialAmenitiesState,
    policy_rules: [],
    facilities: initialfacilitiesState,
    FAQ: [{ question: '', answer: '' }],
    home_rules_and_truths: [],
    meals: [], // Initialize meals as an empty array
    hotel_images: [], // Initialize hotel_images as an empty array
    front_images: [null, null, null], // Initialize front_images as an empty array
    latitude: '',
    longitude: ''
  });

  const [priceRooms, setPriceRooms] = useState([]);

  const handleImageChange = (newImages) => {
    setVillaData((prevState) => ({
      ...prevState,
      front_images: newImages,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    // Ensure that specific fields like maxGuests, minGuests, or other relevant fields do not accept negative values
    let sanitizedValue = value;
    if (name === 'maxGuests' || name === 'minGuests') {
      sanitizedValue = Math.max(0, parseInt(value, 10)); // Ensure the value is non-negative
    }
  
    setVillaData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : sanitizedValue,
    }));
  };
  
  const handleAmenityChange = (newAmenities) => {
    setVillaData((prevState) => ({
      ...prevState,
      amenities: newAmenities,
    }));
  };

  const handleFacilityChange = (newFacilities) => {
    setVillaData((prevState) => ({
      ...prevState,
      facilities: newFacilities,
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
      hotel_images: [...prevState.hotel_images, { image_description: '', image: '', image_url: '' }],
    }));
  };

  const updateSpace = (index, name, value) => {
    setVillaData((prevState) => ({
      ...prevState,
      hotel_images: prevState.hotel_images.map((space, i) =>
        i === index ? { ...space, [name]: value } : space
      ),
    }));
  };

  const removeSpace = (index) => {
    setVillaData((prevState) => ({
      ...prevState,
      hotel_images: prevState.hotel_images.filter((space, i) => i !== index),
    }));
  };

  const handlePolicyRuleChange = (event, index) => {
    const newPolicyRules = [...villaData.policy_rules];
    newPolicyRules[index] = event.target.value;
    setVillaData((prevState) => ({
      ...prevState,
      policy_rules: newPolicyRules,
    }));
  };

  const handleHomeRuleChange = (event, index) => {
    const newHomeRules = [...villaData.home_rules_and_truths];
    newHomeRules[index] = event.target.value;
    setVillaData((prevState) => ({
      ...prevState,
      home_rules_and_truths: newHomeRules,
    }));
  };

  const addPolicyRule = () => {
    setVillaData((prevState) => ({
      ...prevState,
      policy_rules: [...prevState.policy_rules, ''],
    }));
  };

  const addHomeRule = () => {
    setVillaData((prevState) => ({
      ...prevState,
      home_rules_and_truths: [...prevState.home_rules_and_truths, ''],
    }));
  };

  const deletePolicyRule = (index) => {
    const newPolicyRules = [...villaData.policy_rules];
    newPolicyRules.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      policy_rules: newPolicyRules,
    }));
  };

  const deleteHomeRule = (index) => {
    const newHomeRules = [...villaData.home_rules_and_truths];
    newHomeRules.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      home_rules_and_truths: newHomeRules,
    }));
  };

  const handleFAQChange = (event, index) => {
    const { name, value } = event.target;
    const newFaqs = [...villaData.FAQ];
    newFaqs[index][name] = value;
    setVillaData((prevState) => ({
      ...prevState,
      FAQ: newFaqs,
    }));
  };

  const addFAQ = () => {
    setVillaData((prevState) => ({
      ...prevState,
      FAQ: [...prevState.FAQ, { question: '', answer: '' }],
    }));
  };

  const deleteFAQ = (index) => {
    const newFaqs = [...villaData.FAQ];
    newFaqs.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      FAQ: newFaqs,
    }));
  };
  
  
  const updateMeal = (index, key, value) => {
    const updatedMeals = [...villaData.meals];
    updatedMeals[index] = {
      ...updatedMeals[index],
      [key]: value,
    };
    setVillaData((prevState) => ({
      ...prevState,
      meals: updatedMeals,
    }));
  };

  // Function to add a new meal
  const addMeal = () => {
    setVillaData((prevState) => ({
      ...prevState,
      meals: [
        ...prevState.meals,
        {
          image_data: '',
          description: '',
        },
      ],
    }));
  };

  // Function to remove a meal
  const removeMeal = (index) => {
    const updatedMeals = [...villaData.meals];
    updatedMeals.splice(index, 1);
    setVillaData((prevState) => ({
      ...prevState,
      meals: updatedMeals,
    }));
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Villa data:', villaData);

    const total_no_of_guests = [villaData.minGuests, villaData.maxGuests];
    const transformedData = {
      name: villaData.name,
      total_no_of_guests: [villaData.minGuests, villaData.maxGuests],
      total_no_of_rooms: villaData.total_no_of_rooms,
      type_of_accommodation: 'villa',
      location: villaData.location,
      about: villaData.about,
      amenities: villaData.amenities,
      policy_rules: villaData.policy_rules,
      facilities: villaData.facilities,
      FAQ: villaData.FAQ,
      home_rules_and_truths: villaData.home_rules_and_truths,
      offers: villaData.offers,
      meals: villaData.meals.map((meal) => ({
     
      description: meal.description,
        image_data: meal.image_data,
      })),
      hotel_images: villaData.hotel_images.filter((image) => image !== null).map((image) => ({
        image_url: image.image_url,
        image_description: image.image_description,
        image_data: image.image_data
      })),
      front_images: villaData.front_images.filter((image) => image !== null).map((image) => ({
        image_url: image.image_url,
        image_data: image.image_data,
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
      <div className="">
        {/* AddPhoto component for uploading hotel images */}
        <AddPhoto images={villaData.front_images} setImages={handleImageChange} />
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
                type="number"
                className="form-control"
                id="minGuests"
                name="minGuests"
                placeholder="Minimum Guests"
                value={villaData.minGuests}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
  <input
    type="text"
    className="form-control"
    id="total_no_of_rooms"
    name="total_no_of_rooms"
    placeholder="Add available villas and rooms"
    value={villaData.total_no_of_rooms} // corrected the typo here
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

      {/* Amenities Component */}
      <div className="row">
        <div className="col-md-6 offset-md-6">
          <Amenities amenities={villaData.amenities} handleAmenityChange={handleAmenityChange} />
        </div>
      </div>

      {/* OfferForm Component */}
      <OfferForm offers={villaData.offers} updateOffer={updateOffer} addOffer={addOffer} />

      <div className='aboutus'>
        <h3 className='policyrule'>About Your Villa</h3>
        <div className="col-md-6">
          <div className="form-group">
            <textarea
              id="about"
              name="about"
              placeholder="Write About the Property"
              value={villaData.about}
              onChange={(event) => setVillaData({ ...villaData, about: event.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Facility Component */}
      <div className="row">
        <div className="col-md-6 offset-md-6">
          <Facility facilities={villaData.facilities} handleFacilityChange={handleFacilityChange} />
        </div>
      </div>

      {/* Spaces Component */}
      <Spaces
        hotelImages={villaData.hotel_images}
        updateSpace={updateSpace}
        addSpace={addSpace}
        removeSpace={removeSpace}
     
      />

      {/* MealInput Component */}
      <MealInput
        meals={villaData.meals}
        updateMeal={updateMeal}
        addMeal={addMeal}
        removeMeal={removeMeal}
      />

      {/* LocationDisplay Component */}
      <LocationDisplay location={villaData.location} latitude={villaData.latitude} longitude={villaData.longitude} />

      {/* PolicyRulesForm Component */}
      <PolicyRulesForm
        policyRules={villaData.policy_rules}
        homeRules={villaData.home_rules_and_truths}
        handlePolicyRuleChange={handlePolicyRuleChange}
        handleHomeRuleChange={handleHomeRuleChange}
        addPolicyRule={addPolicyRule}
        addHomeRule={addHomeRule}
        deletePolicyRule={deletePolicyRule}
        deleteHomeRule={deleteHomeRule}
      />

      {/* Faq Component */}
      <div className="faq-section">
        {villaData.FAQ.map((faq, index) => (
          <Faq
            key={index}
            faq={faq}
            index={index}
            onChange={handleFAQChange}
            onDelete={() => deleteFAQ(index)}
         
          />
        ))}
        <button
          type="button"
          className="btn btn-primary btn-add-faq"
          onClick={addFAQ}
        >
          Add FAQ
        </button>
      </div>

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
