import React from 'react';

const OfferForm = ({ offers, updateOffer, addOffer }) => {
  return (
    <div className='offerForm'>
    <div className="form-group">
      {/* <label className='OffersForm'>Offers:</label>
     {offers.map((offer, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Offer Name"
            value={offer.name}
            onChange={(e) => updateOffer(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Offer Details"
            value={offer.details}
            onChange={(e) => updateOffer(index, 'details', e.target.value)}
          />
        </div>
      ))}*/}
        <div className="buttons-container">
          <div className='firstoffer'>
          Add Any Offers Name.....
      <button type="button" >
        Add Offer
      </button></div> <div className='secondoffer'>
      Add Any Offers Name.....
      <button type="button" >
        Add Offer
      </button></div>
    </div></div>
    <div className='aboutus'>
      <h3>Add About your villas</h3>
      
        <textarea
          className="form-control"
          rows="5" cols='67'
          placeholder="Enter information about your company or service..."
        ></textarea>
      </div>
    </div>
  );
};

export default OfferForm;