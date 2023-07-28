import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/addproperty.css'

function AddProperty(props) {

  const [newproperty, setNewProperty] = useState({
    description: "", city: "", state: "", size: 0,
    price: 0, contactInfo: "", datePosted: "", sold: false, dateSold: ""
  })
  const [propertyPhotos, setPropertyPhotos] = useState([])
  const navigate = useNavigate();

  const addPropertyChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempNewProperty = { ...newproperty };
    tempNewProperty[name] = value;
    setNewProperty(tempNewProperty);
  };

  const addPhoto = (photo) => {
    setPropertyPhotos([...propertyPhotos, photo]);
  };

  const deletePhoto = (photo) => {
    setPropertyPhotos(propertyPhotos.filter(item => item !== photo));
  };

  const navigateToAdmin = () => {
    navigate("/Admin");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddPropertySubmit(event)
      .then((savedProperty) => {
        // Use the id of the saved property to add the photo
        return handleAddPhotos(savedProperty.id);
      })
      .then(navigateToAdmin)
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddPropertySubmit = (event) => {
    event.preventDefault();
    return axios
      .post(`http://localhost:8080/properties/save/${props.user.id}`, newproperty)
      .then((response) => {
        setNewProperty(response.data);
        return response.data; // return the saved property
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleAddPhotos = (propertyId) => {
    propertyPhotos.forEach(photo => {
      axios.post(`http://localhost:8080/properties/addPhoto/${propertyId}`, photo)
      .then((response) => {
        setPropertyPhotos([...propertyPhotos, response.data]);
        return response.data;
      }).catch((e) => {
        console.log(e);
      });
    })
  };

  return (<div className='add-property-content'>
    <div>
      DESCRIPTION
      <input value={newproperty.description} name='description' type='description' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      CITY
      <input value={newproperty.city} name='city' type='city' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      STATE
      <input value={newproperty.state} name='state' type='state' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      SIZE
      <input value={newproperty.size} name='size' type='number' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      PRICE
      <input value={newproperty.price} name='price' type='number' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      CONTACT INFO
      <input value={newproperty.contactInfo} name='contactInfo' type='contactInfo' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      DATE POSTED: ex:2023-12-03
      <input value={newproperty.datePosted} name='datePosted' type='date' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      SOLD?
      <input value={newproperty.sold} name='sold' type='checkbox' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      DATE SOLD: ex:2023-12-03
      <input value={newproperty.dateSold} name='dateSold' type='date' onChange={addPropertyChangeHandler} ></input>
    </div>
    <div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  </div>
  )
}

export default AddProperty;
