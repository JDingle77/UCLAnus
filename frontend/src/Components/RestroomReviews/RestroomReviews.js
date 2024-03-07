import React from "react";
import "./RestroomReviews.css";
import RestroomRating from "../RestroomRating/RestroomRating";
import PinEmoji from "../Images/pin.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import WcIcon from "@mui/icons-material/Wc";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RestroomReview from "./RestroomReview/RestroomReview.js";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

function RestroomReviews() {
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
        <Button variant="secondary">
          <StarBorderIcon /> Write A Review
        </Button>
        <Button variant="secondary">
          <CampaignOutlinedIcon /> Report
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
