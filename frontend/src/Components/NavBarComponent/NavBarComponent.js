import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBarComponent.css";
import PoopEmoji from "../Images/poop.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

let client_id = "51e5efa586842061de57";
let scopes = "read:user read:org repo";

function NavBarComponent() {
  async function getUserID() {
    let request = await fetch("http://localhost:4000/get-userid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }).catch((error) => {
      console.error(error);
      return;
    });
    let response = await request.json().catch((error) => {
      console.error(error);
      return;
    });
    console.log(response);
    if (response) {
      setUserID(response.userid);
    }
  }
  async function login(code) {
    let request = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        authcode: code,
      }),
    }).catch((error) => {
      console.error(error);
    });
    let response = await request.json();
    //	console.log("Success!");
    //	console.log(response.logged);
    getUserID();
    if (!response.logged) {
      window.location.reload(true);
    }
  }
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);
    let code = urlParams.get("code");
    if (url.includes("?code=")) {
      searchParams.delete("code");
      setSearchParams(searchParams);
      console.log("url code: " + code);
      login(code);
    }
    getUserID();
  });
  let [userID, setUserID] = useState("temp");
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
                  {userID !== "Temp" ? (
                    <a className="my-account a-tag">MY ACCOUNT</a>
                  ) : (
                    <a
                      id="github-sign-in"
                      className="a-tag"
                      href={`https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}`}
                    >
                      SIGN IN
                    </a>
                  )}

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
