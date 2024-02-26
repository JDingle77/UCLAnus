import React from "react";
import SearchResult from "./SearchResult/SearchResult";
import "./SearchResults.css";
import { Popup } from "reactjs-popup";
import { Slider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from "react";
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

    const [hasBagHooks, setBagHooks] = useState(false);
    function updateBagHooks(event) {
	console.log("Set to " + event.target.checked);
	setBagHooks(event.target.checked);
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
			    <FormControlLabel control={<Checkbox onChange={check} checked={hasBagHooks} onChange={updateBagHooks}/>} label="Bag Hooks" />
			</div>
		    </div>
		</div>
	    </Popup>
	    <div className="search-results">
		<div>
		    <SearchResult />
		    <SearchResult />
		    <SearchResult />
		</div>
	    </div>
	</div>
  );
}

export default SearchResults;
