import React, { useState, useEffect } from 'react';
import { useGeolocated } from "react-geolocated";

const LocationProvider = (WrappedComponent) => {
  const WithLocation = (props) => {
    const [userLocation, setUserLocation] = useState(null);

    const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });;

    // const userLocation = {
    //   latitude: coords.latitude,
    //   longitude: coords.longitude,
    // };

    function dist(lat1, lng1, lat2, lng2) {
      return Math.abs(lat1 - lat2)*364000 + Math.abs(lng1 - lng2) * 288000;
    }
    function dist_bathroom(bathroom) {
      if (userLocation) {
        return Math.floor(dist(userLocation.latitude, userLocation.longitude, bathroom.latitude, bathroom.longitude));
      }
      return 0;
    }
    
    useEffect(() => {
      if (coords && isGeolocationAvailable && isGeolocationEnabled) {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } else {
        console.error('Geolocation is not available or not enabled.');
      }
    }, [isGeolocationAvailable, isGeolocationEnabled, coords]);
    
    // Inject the userLocation as a prop to the wrapped component
    return <WrappedComponent {...props} userLocation={userLocation} dist_bathroom={dist_bathroom}/>;
  };
  return WithLocation;
};

export default LocationProvider;

