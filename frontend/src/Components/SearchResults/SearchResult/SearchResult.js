import React from "react";
import "./SearchResult.css";
import PinEmoji from "../../Images/pin.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import RestroomRating from "../../RestroomRating/RestroomRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WcIcon from "@mui/icons-material/Wc";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkFill } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

function SearchResult(props) {
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
  const bookMark = <FontAwesomeIcon icon={faBookmark} />;
  const yellowBookMark = (
    <FontAwesomeIcon style={{ color: "yellow" }} icon={faBookmarkFill} />
  );
  const [favorite, setFavorite] = useState(false);

  function changeFavorite() {
    setFavorite(!favorite);
    let userId = Cookies.get("userId");

    fetch("http://localhost:4000/change-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        bathroomId: props.data.bathroom_id,
      }),
      credentials: "include",
    }).catch((error) => {
      console.error(error);
      return;
    });
  }

  useEffect(() => {
    setFavorite(props.favorite);
    if (props.favorite) {
      console.log("Is this setting correctly?");
    }
  }, [props.favorite]);

  return (
    <div className="search-result-card">
      <div className="search-result">
        <div className="core-info">
          <img
            src={
              props.data.photos.length > 0
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
            <p>
              <img src={PinEmoji} alt="pin" />{" "}
              <Badge bg="primary" style={{ justifyContent: "center" }}>
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
              <Button variant="secondary" onClick={changeFavorite}>
                {favorite ? yellowBookMark : bookMark}
              </Button>
              <a href={"review_page?_id=" + props.data.bathroom_id}>
                <Button variant="secondary">{rightArrow}</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-border"></div>
    </div>
  );
}

export default SearchResult;
