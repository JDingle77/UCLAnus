import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarComponent from "../Components/NavBarComponent/NavBarComponent";
import MapComponent from "../Components/MapComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../Components/SearchResults/SearchResults";
import "./Homepage.css";

let client_id = "51e5efa586842061de57";
let scopes = "read:user read:org repo";

function Homepage() {
  let [userID, setUserID] = useState(undefined);

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
    });
    let response = await request.json();
    console.log("Setting UserID: " + response);
    setUserID(response.userid);
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
  return (
    <span>
      <NavBarComponent />
      <a
        id="github-sign-in"
        href={`https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}`}
      >
        <span>Sign in with GitHub</span>{" "}
      </a>

      <span>{userID !== undefined ? <b> {userID}</b> : <></>} </span>
      <div
        style={{
          display: "flex",
          height: 850,
        }}
      >
        <SearchResults className="search-results" />
        <MapComponent />
      </div>
    </span>
  );
}

export default Homepage;
