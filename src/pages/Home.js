import React, { useState } from 'react';
import axios from 'axios';
import Header from '../reusables/Header';
import '../css/positions.css'
import '../css/home.css'

function Home(props) {
    console.log("USER ID", props.user.id);
    return (
      
      <div className = 'flex-column justify-content-center container background'>
      <div className='flex-column welcome-box'>Welcome To Fake Real Estates
          <p className='flex-row justify-content-center'>The name might be fake but the price is real</p>
      </div>
      </div>
  
    )
  }
  
  export default Home