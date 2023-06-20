import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ Pages, handlePageClick, activePage, deleteSelected }) => {
  if (!Pages) {
    console.log("wait");
    return;
  }

  const array = [];
  for (let i = 0; i < Pages; i++) {
    array[i] = i;
  }

  return (
    <div className="deletePageination">
      <button onClick={deleteSelected} className="delete-selected">
        Delete Selected
      </button>
      <div className="pagination">
        <button value={0} onClick={(event) => handlePageClick(event)}>
          First
        </button>
        <button value="prev" onClick={(event) => handlePageClick(event)}>
          Prev
        </button>
        {array.map((it) => (
          <button
            key={it}
            value={it}
            onClick={(event) => handlePageClick(event)}
            className={activePage === it ? "active" : ""}
          >
            {it + 1}
          </button>
        ))}
        <button value="next" onClick={(event) => handlePageClick(event)}>
          Next
        </button>
        <button value={4} onClick={(event) => handlePageClick(event)}>
          Last
        </button>
      </div>
    </div>
  );
};
export default Pagination;
