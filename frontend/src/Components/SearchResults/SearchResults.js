import React from "react";
import SearchResult from "./SearchResult/SearchResult";
import "./SearchResults.css";
import MapComponent from "../MapComponent";
import { Popup } from "reactjs-popup";
import { Button, Slider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocationProvider from "../../Helpers/LocationProvider";
import Cookies from 'js-cookie';
function SearchResults({ userLocation, dist_bathroom }) {
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 5,
      label: "5",
    },
  ];
  const marks2 = [
    {
      value: 0,
      label: "0 mi",
    },
    {
      value: 1000000,
      label: "10000 ft",
    },
  ];

  function check() {
    console.log("What");
  }
  const [searchQuery, setSearchQuery] = useState('');
  const updateSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  }; 
  
  const [minRating, setMinRating] = useState(1);
  function updateMinRating(event) {
    setMinRating(event.target.value);
  }

  const [maxDistance, setMaxDistance] = useState(10000);
  function updateMaxDistance(event) {
    setMaxDistance(event.target.value);
  }

  const [isMale, setIsMale] = useState(true);
  function updateMale(event) {
    console.log("Set to " + event.target.checked);
    setIsMale(event.target.checked);
  }

  const [isFemale, setIsFemale] = useState(true);
  function updateFemale(event) {
    console.log("Set to " + event.target.checked);
    setIsFemale(event.target.checked);
  }

  const [isGenderNeutral, setIsGenderNeutral] = useState(true);
  function updateGenderNeutral(event) {
    console.log("Set to " + event.target.checked);
    setIsGenderNeutral(event.target.checked);
  }

  const [bathrooms, setBathrooms] = useState([]);
  function getBathrooms() {
    axios
      .get("http://localhost:4000/get-bathroom")
      .then((response) => {
        setBathrooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

    const [favoritesList, setFavoritesList] = useState([]);

    function getFavorites() {
	let userId = Cookies.get("userId");
	axios
	    .get("http://localhost:4000/get-favorite?userId=" + userId)
	    .then((response) => {
		setFavoritesList(response.data);
		console.log("Show Favorites: ");
		console.log(response.data);
	    })
	    .catch((error) => {
		console.error(error);
	    });
    }

    
  useEffect(() => {
      getBathrooms();
      getFavorites();
  }, []);
  function isBathroomGood(bathroom) {
    if (bathroom.rating == null || bathroom.rating >= minRating) {
      if (dist_bathroom(bathroom) > maxDistance) {
	      return false;
      }
      
      // search query
      if (!bathroom.building.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (isMale && bathroom.genders.indexOf("male") > -1) {
        return true;
      }
      if (isFemale && bathroom.genders.indexOf("female") > -1) {
        return true;
      }
      if (isGenderNeutral && bathroom.genders.indexOf("all gender") > -1) {
        return true;
      }
    }
    return false;
  }
    function containsBathroomId(id, bathroom_list) {
	console.log(bathroom_list);
	for (let i = 0; i < bathroom_list.length; i++) {
	    if (bathroom_list[i].bathroom_id === id) {
		console.log("Returning true");
		return true;
	    }
	}
	return false;
    }
  return (
    <div className="content">
      <div className="left-column">
      <div className="info-bar"> 
      <TextField id="outlined-basic" label="Search Bathrooms" variant="outlined" style={{flex: 2}} onChange={updateSearchQuery}/>
        <Popup
          contentStyle={{
            display: "flex",
            marginRight: "0px",
            paddingRight: "0px",
            float: "right",
            height: "100%",
          }}
          trigger={
            <Button
              style={{
                margin: "5px",
                color: "#000000",
                borderColor: "#000000",
                width: "100px",
              }}
              variant="outlined"
              size="small"
              startIcon={<FilterListIcon />}
            >
              {" "}
              Filters{" "}
            </Button>
          }
          className={"popup-content"}
          modal
        >
          <div
            style={{
              position: "fixed",
              bottom: "0",
              right: "0",
              height: "100%",
              width: "300px",
              background: "#dedbd3",
            }}
          >
            <div style={{ margin: "20px" }}>
              <div> Filters </div>
              <hr style={{ color: "black" }} />
              <div style={{ textAlign: "center" }}> Minimum Rating </div>
              <Slider
                min={1}
                max={5}
                step={0.1}
                valueLabelDisplay="auto"
                marks={marks}
                defaultValue={minRating}
                onChange={updateMinRating}
              />
              <hr style={{ color: "black" }} />
              <div style={{ textAlign: "center" }}> Maximum Distance </div>
              <Slider
                min={0}
                max={10000}
                step={100}
                valueLabelDisplay="off"
                marks={marks2}
                defaultValue={maxDistance}
                onChange={updateMaxDistance}
              />
              <hr style={{ color: "black" }} />
              <div>
                <div style={{ textAlign: "center" }}> Gender </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isMale} onChange={updateMale} />
                    }
                    label="Male"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isFemale} onChange={updateFemale} />
                    }
                    label="Female"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isGenderNeutral}
                        onChange={updateGenderNeutral}
                      />
                    }
                    label="Gender Neutral"
                  />
                </div>
              </div>
            </div>
          </div>
        </Popup>
    </div>
        <div className="search-results">
          <div>
            {bathrooms.map((bathroom) => {
              if (isBathroomGood(bathroom)) {
                  return <SearchResult data={bathroom} distance={dist_bathroom(bathroom)} favorite={containsBathroomId(bathroom.bathroom_id, favoritesList)}/>;
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <MapComponent
        bathrooms={bathrooms.filter((bathroom) => isBathroomGood(bathroom))}
        userCoords={userLocation}
      />
    </div>
  );
}

export default LocationProvider(SearchResults);
