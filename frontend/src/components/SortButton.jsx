import React from "react";

function SortButton({ onClick }) {
  return (
    <button type="button" className="sort-button" onClick={onClick}>
      #
    </button>
  );
}

export default SortButton;
