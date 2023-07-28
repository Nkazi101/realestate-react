import '../css/propertylist.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function EditProperty(props) {
  const location = useLocation();
  const { property } = location.state;
  const [editProperty, setProperty] = useState(property);
  let [photoNum, setPhotoNum] = useState(0);
  const [photo, setPhoto] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [photoCount, setPhotoCount] = useState(Object.keys(editProperty.propertyPhotos).length - 1);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempProperty = { ...editProperty };
    tempProperty[name] = value;
    setProperty(tempProperty);
  }

  const photoChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempPhoto = { ...newPhoto };
    tempPhoto[name] = value;
    setNewPhoto(tempPhoto);
  }

  const nextPhotoClick = () => {
    if (photoCount !== photoNum) {
      setPhotoNum(photoNum + 1)
    } else {
      setPhotoNum(0)
    }
  }

  const prevPhotoClick = () => {
    if (photoNum === 0) {
      setPhotoNum(photoCount)
    } else {
      setPhotoNum(photoNum - 1)
    }
  }

  const deletePhotoClick = () => {
    setPhoto = editProperty.propertyPhotos[photoNum];
    axios.delete(`http://localhost:8080/property/deletePhoto/${editProperty.id}`, photo)
    setPhotoCount = (photoCount - 1)
    prevPhotoClick();
  }

  const addPhotoClick = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/property/addPhoto/${editProperty.id}`, newPhoto)
    setPhotoCount = (photoCount + 1)
  }

  const handleUpdateClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/property/updateProperty", editProperty)
      .then((response) => {
        setProperty(response.data);
        navigate("/Admin")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="property-edit-box">
      <h1 className='center'>EditProperty</h1>
      <img className='picture-box' src={editProperty.propertyPhotos[photoNum].photoUrl} alt={property.model} />
      <button onClick={deletePhotoClick}>DELETE</button>
      <button onClick={nextPhotoClick}>NEXT</button>
      <button onClick={prevPhotoClick}>PREVIOUS</button>
      <div>
        IMAGE URL:
        <input className='input-container' value={editProperty.propertyPhotos[photoNum].photoUrl} name='description' type='description' onChange={changeHandler} required></input>
      </div>
      <div>
        DESCRIPTION
        <input value={editProperty.description} name='description' type='description' onChange={changeHandler} ></input>
      </div>
      <div>
        CITY
        <input value={editProperty.city} name='city' type='city' onChange={changeHandler} ></input>
      </div>
      <div>
        STATE
        <input value={editProperty.state} name='state' type='state' onChange={changeHandler} ></input>
      </div>
      <div>
        SIZE
        <input value={editProperty.size} name='size' type='size' onChange={changeHandler} ></input>
      </div>
      <div>
        CONTACT INFO
        <input value={editProperty.contactInfo} name='contactInfo' type='contactInfo' onChange={changeHandler} ></input>
      </div>
      <div>
        DATE POSTED
        <input value={editProperty.datePosted} name='datePosted' type='datePosted' onChange={changeHandler} ></input>
      </div>
      <div>
        SOLD
        <input value={editProperty.sold} name='sold' type='sold' onChange={changeHandler} ></input>
      </div>
      <div>
        DATE SOLD
        <input value={editProperty.dateSold} name='dateSold' type='dateSold' onChange={changeHandler} ></input>
      </div>
      <div>
        PRICE
        <input value={editProperty.price} name='price' type='price' onChange={changeHandler} ></input>
      </div>
      <button onClick={handleUpdateClick}>Update</button>
      <div>
        ADD PHOTO URL:
        <input className='input-container' name='photoUrl' type='photoUrl' onChange={photoChangeHandler} ></input>
      </div>
      <button onClick={addPhotoClick}>Add Photo</button>
    </div>
  )
}

export default EditProperty;
