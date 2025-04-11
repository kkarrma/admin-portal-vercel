import React, { useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaCircleCheck, FaCircleXmark, FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const DataTable = ({
  columns,
  filteredData,
  paginatedData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  getStatusClass,
  loading = false,
  selectedRows = [],
  setSelectedRows = () => {},
  allowSelection = false,
  onRowClick = null,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  
  const [hoverRowId, setHoverRowId] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if table body is scrollable
  useEffect(() => {
    const tableBody = document.querySelector('.table-body-container');
    if (tableBody) {
      setIsScrollable(tableBody.scrollHeight > tableBody.clientHeight);
    }
  }, [paginatedData]);

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

  // Get sort icon based on current sort state
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <FaSort className="ml-1 text-gray-400 text-xs" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="ml-1 text-blue-600 text-xs" /> 
      : <FaSortDown className="ml-1 text-blue-600 text-xs" />;
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

  // Toggle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Select/deselect all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedData.map(item => item.id));
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
              className="h-8 w-8 rounded-full object-cover border border-gray-200"
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
      case "button":
        return (
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                column.onClick(item);
              }}
              className="bg-unleash-blue hover:bg-blue-600 border text-white px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
              data-tooltip-id="action-tooltip"
              data-tooltip-content={column.buttonText || "Action"}
            >
              {column.buttonIcon && column.buttonIcon}
              {column.buttonText || "Action"}
            </button>
          </div>
        );
      case "action":
        return (
          <div className="flex items-center justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                column.onClick(item);
              }}
              data-tooltip-id="action-tooltip"
              data-tooltip-content="View Details"
            >
              {actionIcon(item.Status)}
            </button>
          </div>
        );
      case "delete":
        return (
          <div className="flex items-center justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                column.onClick(item);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
              data-tooltip-id="action-tooltip"
              data-tooltip-content="Delete Item"
            >
              <RiDeleteBin6Fill className="text-lg" />
            </button>
          </div>
        );
      case "view":
        return (
          <div className="flex items-center justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                column.onClick(item);
              }}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              data-tooltip-id="action-tooltip"
              data-tooltip-content="View Details"
            >
              <FaEye className="text-lg" />
            </button>
          </div>
        );
      default:
        return item[column.key] || "-";
    }
  };

  return (
    <div className="mx-auto max-w-full">
      {/* Data Table */}
      <div className="bg-[#F9F9F9] rounded-xl shadow-md overflow-x-auto relative">
        {/* Table Header */}
        <div className="">
          <table className="w-full divide-y divide-gray-200 lg:table-fixed">
            <thead className="bg-gray-50">
              <tr>
                {allowSelection && (
                  <th scope="col" className="px-2 py-3 text-center w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-unleash-blue rounded focus:ring-unleash-blue"
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-4 py-3 text-center text-xs font-medium text-[#6D6D71] ${column.width || 'w-1/11'} ${column.key ? 'cursor-pointer' : ''}`}
                    onClick={() => column.key && handleSort(column.key)}
                  >
                    <div className="inline-flex items-center justify-center">
                      {column.label}
                      {column.key && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Inner Container for Table Body */}
        <div className="bg-white rounded-b-xl mx-3 max-h-[53dvh] overflow-y-auto table-body-container">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-unleash-blue"></div>
            </div>
          ) : sortedData.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">No data found</p>
              <p className="text-sm">Try changing your search or filters</p>
            </div>
          ) : (
            <table className="w-full divide-y divide-gray-200 table-fixed">
              <tbody className="divide-y divide-gray-100">
                {sortedData.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${selectedRows.includes(item.id) ? 'bg-blue-50' : ''} ${hoverRowId === item.id ? 'bg-gray-50' : ''}`}
                    onClick={() => onRowClick && onRowClick(item)}
                    onMouseEnter={() => setHoverRowId(item.id)}
                    onMouseLeave={() => setHoverRowId(null)}
                  >
                    {allowSelection && (
                      <td className="px-2 py-3 whitespace-nowrap w-10" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRowSelection(item.id)}
                            className="form-checkbox h-4 w-4 text-unleash-blue rounded focus:ring-unleash-blue"
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td key={index} className={`px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900 ${column.align ? `text-${column.align}` : ''}`}>
                        {renderCellContent(item, column)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Scroll indicator */}
        {isScrollable && (
          <div className="absolute bottom-16 right-4 bg-gray-800 text-white rounded-full p-1 opacity-50 text-xs">
            Scroll for more
          </div>
        )}

        {/* Pagination and Row Range Info */}
        <div className="flex justify-between items-center mb-6 mt-6 mx-9">
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
              {[7, 10, 15, 20, 50].map((size) => (
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
                className={`w-7 h-7 flex items-center justify-center mx-1 border rounded-full text-xs font-poppins font-medium border-[#EEEEEE] text-[#404B52] ${
                  currentPage === pageNum
                    ? "bg-unleash-blue text-white border-[#5932EA] border-2"
                    : "bg-[#F5F5F5] text-gray-700"
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
      
      {/* Tooltips */}
      <Tooltip id="action-tooltip" />
    </div>
  );
};

export default DataTable;