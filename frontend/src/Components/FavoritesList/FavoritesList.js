import "./FavoritesList.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";

function FavoritesList() {
  const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
  const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
  return (
    <div className="favorites-list">
      <div className="favorites-bg">
        <div className="header-wrapper">
          <Container>
            <div className="profile-header">
                <hr/>
                <div className="field-header">MY REVIEWS</div>
                <hr/>
            </div>
          </Container>
          <Container>
            <div className="nav-buttons">
                <Button variant="secondary">{leftArrow}</Button>
                <Button variant="secondary">{rightArrow}</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;
