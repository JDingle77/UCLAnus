import React from "react";
import SearchResult from "./SearchResult/SearchResult";
import "./SearchResults.css";
import { Popup } from "reactjs-popup";
import { Slider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState, useEffect} from "react";
import axios from 'axios';

function SearchResults() {
    const marks = [
	{
	    value: 1,
	    label: '1',
	},
	{
	    value: 5,
	    label: '5',
	},
    ];
    const marks2 = [
	{
	    value: 0,
	    label: '0 mi',
	},
	{
	    value: 5,
	    label: '5 mi',
	},
    ];

    function check() {
	console.log("What");
    }
    
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
	axios.get('http://localhost:4000/get-bathroom')
	    .then(response => {
		setBathrooms(response.data);
	    })
	    .catch(error => {
		console.error(error);
	    });
    }

    useEffect(() => {
	getBathrooms();
    }, []);

    function isBathroomGood(bathroom) {
	if (bathroom.rating == null || bathroom.rating >= minRating) {
	    //if something about bathroom distsance
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
    
    return (
	<div>
	    <Popup  contentStyle={{display: 'flex', marginRight: "0px", paddingRight: "0px", float: "right", height: "100%"}} trigger={<button> Trigger </button>}  className={"popup-content"} modal>
		<div style={{position: "fixed", bottom: "0", right:"0", height: "100%", width: "300px", background: "#dedbd3"}}>
		    <div style={{margin: '20px'}}>
			<div> Filters </div>
			<hr style={{color: 'black'}}/>
			<div style={{textAlign: "center"}}> Minimum Rating </div>
			<Slider min={1} max={5} step={0.1} valueLabelDisplay="auto" marks={marks} defaultValue={minRating} onChange={updateMinRating}/>
			<hr style={{color: 'black'}}/>
			<div style={{textAlign: "center"}}> Maximum Distance </div>
			<Slider min={0} max={5} step={0.001} valueLabelDisplay="off" marks={marks2} defaultValue={maxDistance} onChange={updateMaxDistance}/>
			<hr style={{color: 'black'}}/>
			<div>
			    <div style={{textAlign: "center"}}> Gender </div>
			    <div>
				<FormControlLabel control={<Checkbox checked={isMale} onChange={updateMale}/>} label="Male" />
			    </div>
			    <div>
				<FormControlLabel control={<Checkbox checked={isFemale} onChange={updateFemale}/>} label="Female" />
			    </div>
			    <div>
				<FormControlLabel control={<Checkbox checked={isGenderNeutral} onChange={updateGenderNeutral}/>} label="Gender Neutral" />
			    </div>


			</div>
		    </div>
		</div>
	    </Popup>
	    <div className="search-results">
		<div>
		    {
			bathrooms.map(bathroom => {
			    if (isBathroomGood(bathroom)) {
				console.log("Props: ");
				console.log(bathroom);
				return <SearchResult data={bathroom}/>;
			    }
			    return null;
			})
		    }
		</div>
	    </div>
	</div>
  );
}

export default SearchResults;
