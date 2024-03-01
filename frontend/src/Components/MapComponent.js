import "./MapComponent.css";
import React from 'react';
import Container from "react-bootstrap/Container";
import {APIProvider, Map, Marker, Overlay, useMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
let { mapsApiKey, mapsSignature } = require("./mapsapikey.json");

const libraries = ['places']
// defaults

function MapComponent({ bathrooms }) {
  const center = {
    lat: 34.069021,
    lng: -118.443083
  };
  
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const handleMarkerMouseEnter = (index) => {
    setHoveredMarker(index);
  };

  const handleMarkerMouseLeave = () => {
    setHoveredMarker(null);
  };

  const HoverMarker = ({ bathroom, index }) => {
    const [markerRef, marker] = useMarkerRef();
    const [isHovered, setIsHovered] = useState(false);

    return (
      <React.Fragment>
        <Marker 
          ref={markerRef}
          position={{lat: bathroom.latitude, lng: bathroom.longitude }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        />
        { isHovered && (
          <InfoWindow anchor={marker}>
            <b>{bathroom.building}</b>          
          </InfoWindow>
        )
        }
      </React.Fragment>
    );
  };
  
  return (
    <div id="map" style={{ width: "100%" }}>
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
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapComponent;
