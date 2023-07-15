import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyBox from '../reusables/PropertyBox';
import '../css/propertylist.css';

function PropertyList(props) {
  const [properties, setProperties] = useState([]);
  const [searchSize, setSearchSize] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8080/properties/unsold")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSearchSizeChange = (event) => {
    setSearchSize(event.target.value);
  };

  const handleSearchSizeSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8080/findPropertiesBySize/${searchSize}`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderProperties = () => {
    return properties.map((property) => {
      return (
        <div key={property.id}>
          <PropertyBox property={property} />
        </div>
      );
    });
  };

  return (
    <div className='property-list'>
      <form onSubmit={handleSearchSizeSubmit}>
        <input
          type='number'
          value={searchSize}
          onChange={handleSearchSizeChange}
          placeholder='Search by size'
        />
        <button type='submit'>Search</button>
      </form>
      {renderProperties()}
    </div>
  );
}

export default PropertyList;
