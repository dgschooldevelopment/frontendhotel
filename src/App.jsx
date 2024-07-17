import React from 'react';
import ImageUploader from './component/AddPhoto'; // Ensure the correct import path
import './App.css';
import './css/HotelForm.css'
import './css/AddPhoto.css'
import './css/OfferForm.css'
import HotelForm from './component/HotelForm';
import { BiBorderRadius } from 'react-icons/bi';
import OfferForm from './component/OfferForm';
function App() {
    return (
        <div className="App">
            <div className='navbar'>
                <div className='left-content'>
                    <img src="src/assets/image 14.png" alt="Logo" className="logo" />
                </div>
               {/* <div className='middle-content'>
                    <button className="nav-button">Casa Simoes z..  |  Select Date |  2 Guests</button>
                    
                </div>*/}
                <div className='right-content'>
                <button className="nav-button" style={{ borderRadius: '3px',backgroundColor:'white',border:'1px solid black' }}>Need Help ?</button>
                </div>
            </div>
            
         
            <HotelForm></HotelForm>
        </div>
    );
}

export default App;
