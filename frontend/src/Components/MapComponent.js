import "./MapComponent.css";
import React from 'react';
import Container from "react-bootstrap/Container";
import {APIProvider, Map, Marker, Overlay, useMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
let { mapsApiKey, mapsSignature } = require("./mapsapikey.json");

const libraries = ['places']
// defaults

function MapComponent({ bathrooms, userCoords }) {
  let center = {
    lat: 34.069021,
    lng: -118.443083
  };

  if (userCoords != null) {
    center = {
      lat: userCoords.latitude,
      lng: userCoords.longitude
    };
  }

  const customIcon = {
    path: "M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z",
    fillColor: "blue",
    fillOpacity: 0.75,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
  };

  const HoverMarker = ({ bathroom, index }) => {
    const [markerRef, marker] = useMarkerRef();
    const [isHovered, setIsHovered] = useState(false);

    return (
		<a href={"review_page?_id=" + bathroom.bathroom_id}>
      <React.Fragment>
        <Marker 
          ref={markerRef}
          position={{lat: bathroom.latitude, lng: bathroom.longitude }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={() => window.location.href = `review_page?_id=${bathroom.bathroom_id}`}
        />
        { isHovered && (
          <InfoWindow anchor={marker}>
            <b>{bathroom.building + " " + bathroom.floor}</b>          
          </InfoWindow>
        )
        }
      </React.Fragment>
      </a>
    );
  };
  
  return (
    <div id="map" style={{ width: "70%" }}>
      <APIProvider apiKey={mapsApiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
        >
      { bathrooms.map((bathroom, index) => {

        return ( 
          <HoverMarker bathroom={bathroom} index={index} />
        )
      }
      )}
      {userCoords != null && (
        <Marker position={center} icon={customIcon}/>
      )
      }
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapComponent;
