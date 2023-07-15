import React from 'react'
import '../css/propertylist.css'

function PropertyBox(props) {
    return (

                <div className ='property-box'>
                <div className ='property-description'>Description: {props.property.description}</div>
                <div>City: {props.property.city}</div>
                <div>State: {props.property.state}</div>
                <div>Size: {props.property.size}</div>
                <div>Price: {props.property.price}</div>
                <div>Contact Info: {props.property.contactInfo}</div>
                <div className = 'property-photo'>Photos:</div>
            {props.property.propertyPhotos.map((photo) => (
            <img key={photo.id} src={photo.photoUrl} alt="Property Photo" className='property-photo' />
            ))}
          
          
                </div>
          
          
    )
}

export default PropertyBox