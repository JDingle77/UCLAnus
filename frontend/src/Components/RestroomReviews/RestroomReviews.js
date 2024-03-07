import React, { useState } from "react";
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

function RestroomReviews() {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  const [appearReview, setAppearReview] = useState(false);
  const writeReviewClicked = () => {
    setAppearReview(!appearReview);
  };

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
          <h2 className="subtitle bathroom-name">Semel 3rd</h2>
          <p>
            <img src={PinEmoji} alt="pin" />{" "}
            <Badge bg="primary" style={{ justifyContent: "center" }}>
              Semel Institute
            </Badge>
          </p>
        </div>
        <RestroomRating
          data={{ "data.rating": 4, "data.number_ratings": 10 }}
        />
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
          <Badge bg="dark">Gender Inclusive</Badge>
        </p>
        <p>
          <div style={{ color: "grey", transform: "scale(1.3)" }}>
            {" "}
            <DirectionsWalkIcon />{" "}
          </div>
          <Badge bg="dark"> 50 Feet</Badge>
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
          <Button variant="secondary">
            SUBMIT
          </Button>
        </div>
      )}
      <div className="reviews-wrap">
        <div className="reviews">
          <RestroomReview />
          <RestroomReview />
          <RestroomReview />
          <RestroomReview />
          <RestroomReview />
          <RestroomReview />
          <RestroomReview />
        </div>
      </div>
    </div>
  );
}

export default RestroomReviews;
