import React from "react";
import "./RestroomRating.css";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function changedDay(curDay) {
    const today = new Date();
    console.log("Today: " + today.getUTCDay());
    console.log("Day: " + curDay);
  return today.getUTCDay()+1 !== curDay;
}

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
	{!changedDay(props.data.reported) ?
	 <p style={{color: "red"}}>{props.data.number_ratings} Reviews</p>
	 : 	 <p>{props.data.number_ratings} Reviews</p>
	}
    </div>
  );
}

export default RestroomRating;
