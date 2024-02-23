import React from "react";
import "./SearchResult.css";
import PinEmoji from "../../Images/pin.png";
import HandDryer from "../../Images/air.png";
import Accessible from "../../Images/accessible.png";
import Backpack from "../../Images/backpack.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import RestroomRating from "../../RestroomRating/RestroomRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SearchResult() {
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
  return (
    <div className="search-result-card">
      <div className="search-result">
        <div className="core-info">
          <img
            src="https://placehold.co/180"
            alt="bathroom"
            className="bathroom-img"
          />
          <div className="address">
            <h2 className="subtitle bathroom-name">Semel 3rd</h2>
            <RestroomRating />
            <p>
              <img src={PinEmoji} alt="pin" />{" "}
              <Badge bg="primary">Semel Institute</Badge>
            </p>
          </div>
        </div>
        <div className="general-info">
          <p>
            <img src={HandDryer} alt="pin" />
            <Badge bg="dark">Hand Dryers</Badge>
          </p>
          <p>
            <img src={Accessible} alt="pin" />
            <Badge bg="dark">Accessible</Badge>
          </p>
          <p>
            <img src={Backpack} alt="pin" />
            <Badge bg="dark">Bag Hooks</Badge>
          </p>
          <div className="more-info">
            <Button variant="secondary">{rightArrow}</Button>
          </div>
        </div>
      </div>
      <div className="bottom-border"></div>
    </div>
  );
}

export default SearchResult;
