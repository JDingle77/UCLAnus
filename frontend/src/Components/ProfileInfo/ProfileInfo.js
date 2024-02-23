import "./ProfileInfo.css";
import Container from "react-bootstrap/Container";
import DefaultProfile from "../Images/default-profile.png";
import Button from "react-bootstrap/esm/Button";



function ProfileInfo() {
  return (
    <div className="profile">
        <div className="profile-info">
            <div className="profile-image">
                <img
                    src={DefaultProfile}
                    width="200px"
                    height="200px"
                    alt="profile"
                    className="profile-img"
                />
                <Button variant="link">EDIT</Button>
            </div>
            <div className="profile-field-left">
                <Container>
                    <div className="top-rectangle"></div>
                    <div className="my-profile">PERSONAL INFO</div>
                    <div className="bottom-rectangle"></div>
                </Container>
                <div className="profile-field">
                    <div className="my-profile">NAME</div>
                    <div className="field">GENE BLOCK</div>
                    <Button variant="link">EDIT</Button>
                </div>
            </div>
            <div className="profile-field-right">
                <div className="profile-field">
                    <div className="my-profile">USERNAME</div>
                    <div className="field">@GENEBLOCK</div>
                    <Button variant="link">EDIT</Button>
                </div>
            </div>
        </div>
        <div className="favorites-list">
            <Container>
                <div className="rectangle"/>
            </Container>
        </div>
    </div>
  );
}

export default ProfileInfo;
