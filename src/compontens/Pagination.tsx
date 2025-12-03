import React from "react";

const Pagination: ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => any = ({ currentPage, totalPages, onPageChange }) => {
  // Guard against invalid totalPages
  if (!totalPages || totalPages <= 0) return null;

  // Ensure currentPage stays within bounds
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Pagination"
      style={{ display: "flex", gap: "8px", marginTop: "20px" }}
    >
      {/* Previous button */}
      <button
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        aria-label="Go to previous page"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          style={{
            fontWeight: safeCurrentPage === page ? "bold" : "normal",
            background: safeCurrentPage === page ? "#ddd" : "transparent",
            cursor: "pointer",
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        disabled={safeCurrentPage === totalPages}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
