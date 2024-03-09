import "./ReviewsList.css";
import Container from "react-bootstrap/esm/Container";
import StaticReview from "../StaticReview/StaticReview";

function ReviewsList() {
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
          <StaticReview/>
          <StaticReview/>
          <StaticReview/>
          <StaticReview/>
          <StaticReview/>
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
