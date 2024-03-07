import "./RestroomReviews.css";
import RestroomRating from "../RestroomRating/RestroomRating";
import Rating from "react-rating";
import PinEmoji from "../Images/pin.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import WcIcon from "@mui/icons-material/Wc";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RestroomReview from "./RestroomReview/RestroomReview.js";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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

function RestroomReviews() {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  const [appearReview, setAppearReview] = useState(false);
  const writeReviewClicked = () => {
    setAppearReview(!appearReview);
  };

  const [bathroom, setBathroom] = useState({
    building: "",
    floor: "",
    address: "",
    rating: null,
    number_ratings: 0,
    genders: ["Male"],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  function getInformation() {
    let bathroom_id = searchParams.get("_id");
    axios
      .get("http://localhost:4000/get-bathroom")
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].bathroom_id == bathroom_id) {
            setBathroom(response.data[i]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:4000/get-review?bathroomId=" + bathroom_id)
      .then((response) => {
        console.log("Setting Responses");
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getInformation();
  }, []);

  return (
    <div className="restroom-reviews">
      <div className="images">
        <img src="https://placehold.co/180" alt="bathroom" />
        <img src="https://placehold.co/180" alt="bathroom" />
        <img src="https://placehold.co/180" alt="bathroom" />
        <img src="https://placehold.co/180" alt="bathroom" />
      </div>
      <div className="description">
        <div className="address" style={{ justifyContent: "center" }}>
          <h2 className="subtitle bathroom-name">
            {bathroom.building + " " + bathroom.floor}
          </h2>
          <p>
            <img src={PinEmoji} alt="pin" />{" "}
            <Badge bg="primary" style={{ justifyContent: "center" }}>
              {bathroom.address}
            </Badge>
          </p>
        </div>
        <RestroomRating data={bathroom} />
      </div>
      <div className="description-border"></div>
      <div className="actions">
        <Button variant="secondary" onClick={writeReviewClicked}>
          <StarBorderIcon /> WRITE A REVIEW
        </Button>
        <Button variant="secondary">
          <CampaignOutlinedIcon /> REPORT
        </Button>
      </div>
      <div className="general">
        <p>
          <div style={{ color: "grey", transform: "scale(1.3)" }}>
            {" "}
            <WcIcon />{" "}
          </div>
          <Badge bg="dark">{get_gender_string(bathroom.genders)}</Badge>
        </p>
        <p>
          <div style={{ color: "grey", transform: "scale(1.3)" }}>
            {" "}
            <DirectionsWalkIcon />{" "}
          </div>
          <Badge bg="dark"> {searchParams.get("_dist")} Feet </Badge>
        </p>
      </div>
      {appearReview && (
        <div className="write-review">
          <Rating
            emptySymbol={emptyStar}
            fullSymbol={filledStar}
            fractions={2}
            onClick={(value) => console.log(value)}
          />
          <div className="field-header">SELECT YOUR RATING</div>
          <Form className="text-box">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control className="review-box" as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <Button variant="secondary">SUBMIT</Button>
        </div>
      )}
      <div className="reviews-wrap">
        <div className="reviews">
          {reviews.map((review) => {
            return <RestroomReview data={review} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default RestroomReviews;
