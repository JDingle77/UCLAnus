import "./FavoritesList.css";
import Container from "react-bootstrap/esm/Container";
import StaticBathroom from "../StaticBathroom/StaticBathroom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import LocationProvider from "../../Helpers/LocationProvider";

function FavoritesList({userLocation, dist_bathroom}) {

    const [favoritesList, setFavoritesList] = useState([]);

    useEffect( () => {
	getFavorites();
    }, []);

  function getFavorites() {
    let userId = Cookies.get("userId");
    axios
      .get("http://localhost:4000/get-favorite?userId=" + userId)
      .then((response) => {
        setFavoritesList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <div className="favorites-bg">
          <div className="header-wrapper">
            <Container>
              <div className="profile-header">
                  <hr/>
                  <div className="field-header">MY FAVORITES</div>
                  <hr/>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="favorites-wrap">
          <div className="favorites">
	  {favoritesList.map((favorite) => {
	      return <StaticBathroom data={favorite} distance={dist_bathroom(favorite)}/>
	  })}
        </div>
      </div>
    </div>
  );
}

export default LocationProvider(FavoritesList);
