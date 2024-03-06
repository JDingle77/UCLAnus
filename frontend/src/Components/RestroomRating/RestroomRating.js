import React from "react";
import "./RestroomRating.css";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function RestroomRating(props) {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  return (
    <div className="rating">
      <Rating
        emptySymbol={emptyStar}
        fullSymbol={filledStar}
        fractions={2}
        readonly
          initialRating={props.data.rating ? props.data.rating : 0}
      />
	<p>{props.data.number_ratings} Reviews</p>
    </div>
  );
}

export default RestroomRating;
