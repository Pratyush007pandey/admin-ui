import React from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="Search"
        placeholder="  Search by Name,Email or Role"
        onChange={(event) => handleSearch(event)}
      ></input>
    </div>
  );
};
export default SearchBar;
