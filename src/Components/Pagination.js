import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ totalItems, handPageClick }) => {
  if (!totalItems) {
    console.log("wait");
    return;
  }

  const Pages = Math.ceil(totalItems / 10);
  const array = [];
  for (let i = 0; i < Pages; i++) {
    array[i] = i;
  }

  return (
    <div className="pagination">
      {array.map((it) => (
        <li key={it} value={it} onClick={(event) => handPageClick(event)}>
          {it + 1}
        </li>
      ))}
    </div>
  );
};
export default Pagination;
