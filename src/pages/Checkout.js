// import '../../css/pages/buy.css';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';

// function Checkout(props) {
  
//   const location = useLocation();
//   const { property } = location.state;
  
//   const navigate = useNavigate();

//   const handlePurchaseClick = (event) => {
//     event.preventDefault();
//     axios
//       .post(`http://localhost:8080/user/buyProperty/${props.user.id}/${property.id}`)
//       .then((response) => {
//         localStorage.setItem("userId", response.data.id)
//         props.setUser(response.data);
//         navigate("/")
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className='buy-content'>
//       <div>CHECKOUT!</div>
//       <div className='checkout-box'>
//         <img src={property.propertyPhotos[0].photoUrl} alt={property.model} />
//             <div>DESCRIPTION: {property.description}</div>
//             <div>CITY: {property.city}</div>
//             <div>STATE: {property.state}</div>
//             <div>YEAR BUILT: {property.yearBuilt}</div>
//             <div>NUMBER OF BEDROOMS: {property.numberOfBedrooms}</div>
//             <div>NUMBER OF BATHROOMS: {property.numberOfBathrooms}</div>
//             <div>PETS: {property.isPetsAllowed}</div>
//             <div>SQUARE FEET: {property.squareFeet}</div>
//             <div>DATE ADDED:{property.dateAdded}</div>
//             <div>PRICE: {property.price}</div>
//         <button onClick={handlePurchaseClick}>PURCHASE</button>
//       </div>
//     </div>


//   )
// }

// export default Checkout;