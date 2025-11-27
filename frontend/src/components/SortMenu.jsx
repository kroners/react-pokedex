import React from "react";

function SortMenu({ sortBy, onChange }) {
  return (
    <div className="sort-menu-card">
      <p className="sort-menu-title">Sort by:</p>
      <label className="sort-option">
        <input
          type="radio"
          name="sort"
          value="number"
          checked={sortBy === "number"}
          onChange={() => onChange("number")}
        />
        <span>Number</span>
      </label>
      <label className="sort-option">
        <input
          type="radio"
          name="sort"
          value="name"
          checked={sortBy === "name"}
          onChange={() => onChange("name")}
        />
        <span>Name</span>
      </label>
    </div>
  );
}

export default SortMenu;
