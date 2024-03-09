import "./FavoritesList.css";
import Container from "react-bootstrap/esm/Container";
import StaticBathroom from "../StaticBathroom/StaticBathroom";

function FavoritesList() {
  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <div className="favorites-bg">
          <div className="header-wrapper">
            <Container>
              <div className="profile-header">
                  <hr/>
                  <div className="field-header">MY FAVORITES</div>
                  <hr/>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="favorites-wrap">
        <div className="favorites">
          <StaticBathroom/>
          <StaticBathroom/>
          <StaticBathroom/>
          <StaticBathroom/>
          <StaticBathroom/>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;
