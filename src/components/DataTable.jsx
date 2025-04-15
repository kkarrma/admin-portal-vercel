import React, { useState, useRef, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import "./index.scss";

const DataTable = ({
  columns,
  filteredData,
  paginatedData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  getStatusClass,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  
  // Refs for synchronized scrolling
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  // Set up synchronized scrolling between header and body
  useEffect(() => {
    const handleBodyScroll = () => {
      if (headerRef.current && bodyRef.current) {
        headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
      }
    };

    const bodyElement = bodyRef.current;
    if (bodyElement) {
      bodyElement.addEventListener('scroll', handleBodyScroll);
      return () => {
        bodyElement.removeEventListener('scroll', handleBodyScroll);
      };
    }
  }, []);

  // Format date to Month DD, YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  // Sort data based on selected header
  const sortedData = [...paginatedData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get pagination numbers dynamically
  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageNumbers = [];

    pageNumbers.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const actionIcon = (status) => {
    if (status === "Approved") {
      return <FaCircleCheck className="text-green-600 text-xl" />;
    } else if (status === "Cancelled") {
      return <FaCircleXmark className="text-red-500 text-xl" />;
    } else {
      return <BiSolidEdit className="text-gray-500 text-xl" />;
    }
  };

  // Render cell content based on column type
  const renderCellContent = (item, column) => {
    switch (column.type) {
      case "image":
        return (
          <div className="flex items-center justify-center">
            <img
              src={item[column.key] || "https://via.placeholder.com/40"}
              alt={item.Shop_Name || "Shop"}
              className="h-8 w-8 rounded-full"
            />
          </div>
        );
      case "date":
        return formatDate(item[column.key]);
      case "number":
        return (
          <div className="text-center">
            {item[column.key] || "0"}
          </div>
        );
      case "status":
        return (
          <div className="flex items-center justify-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                item[column.key]
              )}`}
            >
              {item[column.key] || "Pending"}
            </span>
          </div>
        );
      case "status-2":
        return (
          <div className="flex items-center justify-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                item[column.key]
              )}`}
            >
              {item[column.key] === true
                ? "Yes"
                : item[column.key] === false
                ? "No"
                : "Pending"}
            </span>
          </div>
        );
      case "button":
        return (
          <div className="flex items-center justify-center">
            <button
              onClick={() => column.onClick(item)}
              className="bg-unleash-blue-light hover:bg-blue-600 border text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >
              {column.buttonText || "Action"}
            </button>
          </div>
        );
      case "action":
        return (
          <div className="flex items-center justify-center">
            <button onClick={() => column.onClick(item)}>
              {actionIcon(item.Status)}
            </button>
          </div>
        );
      default:
        return item[column.key] || "-";
    }
  };

  // Generate table columns with consistent widths
  const columnWidths = columns.map((col, index) => {
    return `minmax(${col.minWidth || '100px'}, ${col.width || '1fr'})`;
  }).join(' ');

  return (
    <div className="mx-auto max-w-full">
      {/* Data Table */}
      <div className="bg-[#F9F9F9] rounded-xl shadow-md">
        {/* Header Table with horizontal scroll */}
        <div 
          ref={headerRef} 
          className="overflow-x-hidden overflow-y-hidden"
        >
          <table className="min-w-full divide-y divide-gray-200" style={{tableLayout: "fixed"}}>
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-4 py-6 text-center text-xs font-medium text-[#6D6D71] cursor-pointer whitespace-nowrap"
                    style={{minWidth: column.minWidth || '100px'}}
                    onClick={() => column.key && handleSort(column.key)}
                  >
                    <div className="inline-flex items-center">
                      {column.label}
                      {column.key && (
                        <RiExpandUpDownLine className="ml-1 text-[#6D6D71] text-xs align-middle" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Body Table with synchronized scroll */}
        <div 
          ref={bodyRef}
          className="bg-white overflow-x-auto overflow-y-auto max-h-[52dvh]"
        >
          <table className="min-w-full divide-y divide-gray-200" style={{tableLayout: "fixed"}}>
            <tbody className="divide-y divide-gray-100">
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {columns.map((column, index) => (
                    <td 
                      key={index} 
                      className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900"
                      style={{minWidth: column.minWidth || '100px'}}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Row Range Info */}
        <div className="flex justify-between items-center mb-6 mt-6 mx-9 pb-4">
          <div className="text-xs text-[#6D6D71] font-poppins font-medium flex items-center">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setCurrentPage(1);
                setItemsPerPage(Number(e.target.value));
              }}
              className="mx-2 px-1 py-1 bg-[#E4EBF3] text-[#222A50] rounded-full focus:outline-none focus:ring-2 focus:ring-unleash-blue"
            >
              {[7, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>out of {filteredData.length}</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] bg-[#F5F5F5] ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700"
              }`}
            >
              &lt;
            </button>

            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNum === "number" ? setCurrentPage(pageNum) : null
                }
                className={`w-7 h-7 flex items-center justify-center mx-1 ${
                  typeof pageNum !== "number"
                    ? "border-none bg-transparent"
                    : `border rounded-full text-xs font-poppins font-medium border-[#EEEEEE] text-[#404B52] ${
                        currentPage === pageNum
                          ? "bg-unleash-blue-light text-white border-[#5932EA] border-2"
                          : "bg-[#F5F5F5] text-gray-700"
                      }`
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(Math.ceil(filteredData.length / itemsPerPage), prev + 1)
                )
              }
              disabled={
                currentPage === Math.ceil(filteredData.length / itemsPerPage) ||
                filteredData.length === 0
              }
              className={`w-7 h-7 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] bg-[#F5F5F5] ${
                currentPage === Math.ceil(filteredData.length / itemsPerPage) ||
                filteredData.length === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;