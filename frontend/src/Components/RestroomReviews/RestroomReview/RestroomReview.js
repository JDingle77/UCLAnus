import React from "react";
import "./RestroomReview.css";
import Card from "react-bootstrap/Card";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

function RestroomReview(props) {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;

  const [name, setName] = useState("");
  async function getName() {
    let request = await fetch(
      "http://localhost:4000/get-user?user_id=" + props.data.user_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    ).catch((error) => {
      console.error(error);
      return;
    });
    let response = await request.json().catch((error) => {
      console.error(error);
      return;
    });
    if (response) {
      console.log(response);
      setName(response.name);
    }
  }
    
  useEffect(() => {
      getName()
      	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Card.Body>
        <div className="name-rating">
          <hr />
          <div className="field-header">{name}</div>
          <hr />
          <div className="star-rating">
            <Rating
              emptySymbol={emptyStar}
              fullSymbol={filledStar}
              fractions={2}
              readonly
              initialRating={props.data.rating}
            />
          </div>
        </div>
        <Card.Text>{props.data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RestroomReview;
