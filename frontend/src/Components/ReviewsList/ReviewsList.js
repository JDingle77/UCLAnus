import "./ReviewsList.css";
import Container from "react-bootstrap/esm/Container";
import StaticReview from "../StaticReview/StaticReview";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from "axios";

function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    async function getReviews() {
	let userId = Cookies.get("userId");
	axios
	    .get("http://localhost:4000/get-review?userId=" + userId)
	    .then((response) => {
		setReviews(response.data);
	    })
	    .catch((error) => {
		console.error(error);
	    });

    }
    const useMountEffect = (fun) => useEffect(fun, [])

    function mount() {
	getReviews();
    }
    useMountEffect(mount);
  return (
    <div className="reviews-list">
      <div className="reviews-header">
        <div className="reviews-bg">
          <div className="header-wrapper">
            <Container>
              <div className="profile-header">
                <hr/>
                <div className="field-header">MY REVIEWS</div>
                <hr/>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="reviews-wrap">
          <div className="reviews">
	  {reviews.map((review) => {
	      return <StaticReview data={review}/>
	  })}
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
