import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarComponent from "../Components/NavBarComponent/NavBarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from "../Components/SearchResults/SearchResults";
import "./Homepage.css";



function Homepage() {

  return (
    <div className="home-page">
      <NavBarComponent />
      <SearchResults className="search-results" />
    </div>
  );
}

export default Homepage;
