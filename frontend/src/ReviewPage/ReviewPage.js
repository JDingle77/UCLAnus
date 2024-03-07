import React from "react";
import "./ReviewPage.css";
import NavBarComponent from "../Components/NavBarComponent/NavBarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import RestroomReviews from "../Components/RestroomReviews/RestroomReviews";

function ReviewPage() {
  return (
    <div className="review-page">
      <NavBarComponent />
      <RestroomReviews />
    </div>
  );
}

export default ReviewPage;
