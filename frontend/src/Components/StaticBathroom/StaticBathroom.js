import React from "react";
import "./StaticBathroom.css";
import PinEmoji from "../Images/pin.png";
import HandDryer from "../Images/air.png";
import Accessible from "../Images/accessible.png";
import Backpack from "../Images/backpack.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WcIcon from "@mui/icons-material/Wc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import RestroomRating from "../RestroomRating/RestroomRating";

function get_gender_string(genders) {
  let str = "";
  if (genders.indexOf("male") > -1) {
    str += "Male, ";
  }
  if (genders.indexOf("female") > -1) {
    str += "Female, ";
  }
  if (genders.indexOf("all gender") > -1) {
    str += "Gender Neutral, ";
  }
  if (str.length - 2 > 11) {
    return "All Options";
  }
  return str.substring(0, str.length - 2);
}

function StaticBathroom(props) {
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  return (
    <div className="search-result-card" style={{borderRight: "solid 1px grey"}}>
      <div className="search-result">
        <div className="core-info">
            <img
	       src= {props.data.photos.length > 0
                ? props.data.photos[0]
                : "https://placehold.co/180"
            }

            alt="bathroom"

            className="bathroom-img"
          />
          <div className="address">
            <h2 className="subtitle bathroom-name">
              {props.data.building + " " + props.data.floor}
            </h2>
            <RestroomRating data={props.data} />
              <p style={{display: "flex", marginTop: "10px"}} >
		  <img style={{display: "inline-block"}} src={PinEmoji} alt="pin" />{" "}
		  <Badge bg="primary" style={{ justifyContent: "center", display: "inline-block" }}>
		      {props.data.address}
		  </Badge>
            </p>
          </div>
        </div>
        <div className="general-info">
          <p>
            <div style={{ color: "grey", transform: "scale(1.3)" }}>
              {" "}
              <WcIcon />{" "}
            </div>
            <Badge bg="dark">{get_gender_string(props.data.genders)}</Badge>
          </p>
          <p>
            <div style={{ color: "grey", transform: "scale(1.3)" }}>
              {" "}
              <DirectionsWalkIcon />{" "}
            </div>
            <Badge bg="dark"> {props.distance} Feet</Badge>
          </p>
          <div className="more-info">
            <div className="button-panel">
              <a href={"review_page?_id=" + props.data.bathroom_id}>
                <Button variant="secondary">{rightArrow}</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaticBathroom;
