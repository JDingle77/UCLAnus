import React from "react";
import "./RestroomReview.css";
import Card from "react-bootstrap/Card";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function RestroomReview() {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  return (
    <Card>
      <Card.Body>
        <div className="name-rating">
          <div className="top-bar"></div>
          <Card.Title>@JDINGLE</Card.Title>
          <div className="bottom-bar"></div>
          <Rating
            emptySymbol={emptyStar}
            fullSymbol={filledStar}
            fractions={2}
            readonly
            initialRating={4}
          />
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    // <div className="restroom-review">
    //   <div className="info">
    //     <div>Username</div>
    //     <div>Rating</div>
    //   </div>
    //   <div>Review</div>
    // </div>
  );
}

export default RestroomReview;