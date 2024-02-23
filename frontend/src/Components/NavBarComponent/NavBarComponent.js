import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBarComponent.css";
import PoopEmoji from "../Images/poop.png";

function NavBarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={PoopEmoji} alt="Poop Emoji" width="90" height="90" />
          <div className="text-on-image">
            <h3>UCLAnus</h3>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Nav.Link href="/account">
                <Container>
                  <div className="top-rectangle"></div>
                  <div className="my-account">MY ACCOUNT</div>
                  <div className="bottom-rectangle"></div>
                </Container>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
