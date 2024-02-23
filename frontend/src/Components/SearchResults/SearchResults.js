import React from "react";
import SearchResult from "./SearchResult/SearchResult";
import "./SearchResults.css";

function SearchResults() {
  return (
    <div className="search-results">
      <SearchResult />
      <SearchResult />
      <SearchResult />
    </div>
  );
}

export default SearchResults;
