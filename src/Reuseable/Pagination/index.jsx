import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate an array of page numbers based on total pages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <>
      <nav aria-label="..." style={{ display: "flex", justifyContent: "end" }}>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li
              className={
                pageNumber === currentPage ? "page-item active" : "page-item"
              }
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              <Link className="page-link" to="#">
                {pageNumber}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
