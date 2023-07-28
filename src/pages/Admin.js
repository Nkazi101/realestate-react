import React, { useState } from 'react'
import '../css/positions.css'
import '../css/signInsignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../css/admin.css'

function Admin(props) {

  const [properties, setProperties] = useState([]);
  const navigator = useNavigate()

  const addPropertiesSubmitHandler = () => {
    navigator('/AddProperty');
  }

  const findPropertiesSubmitHandler = () => {
    axios.get(`http://localhost:8080/user/${props.user.id}/properties`)
      .then((response) => {
        console.log("response data", response.data)
        setProperties(response.data);
      }
      )
      .catch((e) => {
        console.log(e);
      })
  };

  const handlePropertyClick = (property) => {
    navigator('/EditProperty', { state: { property } });
  };

  const showProperties = () => {
    return properties.map((property) => {
      const propertyPhoto = property.propertyPhotos && property.propertyPhotos.length > 0 ? property.propertyPhotos[0].photoUrl : '';
      return (
        <div
          className='property-box'
          key={property.id}
          onClick={() => handlePropertyClick(property)}
        >
          Click To View Details
          <img src={propertyPhoto} alt={property.model} />
        </div>
      );
    });
  };

  return (
    <div className='fill'>
      <div className='flex-column admin-sidebar justify-content-center'>
        <h2>Hello Dealer</h2>
        <h1>EDIT PROPERTIES</h1>
        <h2>Find All</h2>
        <button onClick={findPropertiesSubmitHandler}>SEE MY PROPERTIES</button>
        <h1>ADD PROPERTIES</h1>
        <button onClick={addPropertiesSubmitHandler}>ADD NEW PROPERTIES</button>
      </div>
      <div className='flex-column fill'>
        {showProperties()}
      </div>
    </div>
  )
}

export default Admin
