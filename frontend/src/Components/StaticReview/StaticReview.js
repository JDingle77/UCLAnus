import React from "react";
import "./StaticReview.css";
import Card from "react-bootstrap/Card";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";

function StaticReview(props) {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
    const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;

    const [name, setName] = useState("");
    const [bathroomName, setBathroomName] = useState("");
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
    async function getBathroomName() {
	let request = await fetch(
	    "http://localhost:4000/get-bathroom?bathroomId=" + props.data.bathroom_id,
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

	    setBathroomName(response.building + " " + response.floor);
	}
    }
    useEffect(() => {
	getName();
	getBathroomName();
    }, [getName, getBathroomName]);

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
          <Card.Text>
	      {props.data.description}
        </Card.Text>
        <div className="review-footer">
            <div className="bathroom-name">{bathroomName}</div>
	    <a href={"review_page?_id="+props.data.bathroom_id}>
		<Button variant="secondary">{rightArrow}</Button>
	    </a>
        </div>
        <div className=""></div>
      </Card.Body>
    </Card>
  );
}

export default StaticReview;
