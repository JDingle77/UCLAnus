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
import { useGeolocated } from "react-geolocated";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchResults() {
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
      value: 5,
      label: "5 mi",
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

  const [maxDistance, setMaxDistance] = useState(5);
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

  useEffect(() => {
    getBathrooms();
  }, []);
  function dist(lat1, lng1, lat2, lng2) {
    return (Math.abs(lat1 - lat2) + Math.abs(lng1 - lng2)) * 100;
  }
  function isBathroomGood(bathroom) {
    if (bathroom.rating == null || bathroom.rating >= minRating) {
      if (coords && isGeolocationAvailable && isGeolocationEnabled) {
        if (
          dist(
            coords.latitude,
            coords.longitude,
            bathroom.latitude,
            bathroom.longitude
          ) > maxDistance
        ) {
          console.log("I am here: " + coords.latitude + " " + coords.longitude);
          console.log(
            "Bathroom is here: " + bathroom.latitude + " " + bathroom.longitude
          );
          console.log(
            dist(
              coords.latitude,
              coords.longitude,
              bathroom.latitude,
              bathroom.longitude
            )
          );
          return false;
        }
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
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

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
                max={5}
                step={0.001}
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
                console.log("Props: ");
                console.log(bathroom);
                return <SearchResult data={bathroom} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <MapComponent
        bathrooms={bathrooms.filter((bathroom) => isBathroomGood(bathroom))}
        userCoords={coords}
      />
    </div>
  );
}

export default SearchResults;
