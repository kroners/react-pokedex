import React from "react";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close.svg";

export function SearchBar({ value, onChange }) {
  const handleClear = () => onChange("");

  return (
    <div className="search-bar-wrapper">
      <img src={searchIcon} alt="" className="search-icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <img src={closeIcon} alt="" className="search-clear-icon" />
        </button>
      )}
    </div>
  );
}
