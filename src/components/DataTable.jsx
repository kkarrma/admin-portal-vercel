import React from 'react';

const DataTable = ({
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  openDetailsModal,
  openStatusModal,
  getStatusClass
}) => {
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

  // Calculate paginatedData based on itemsPerPage and currentPage
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to get pagination numbers dynamically
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

  return (
    <div className="mx-auto max-w-full">
      {/* Data Table */}
      <div className="bg-[#F9F9F9] rounded-xl shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 lg:table-fixed">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Profile",
                  "Transaction ID",
                  "Order ID",
                  "Shop Name",
                  "Customer Name",
                  "Date Purchased",
                  "Date Return",
                  "Quantity",
                  "Status",
                  "Details",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 w-1/11"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Inner Container for Table Body */}
        <div className="bg-white rounded-b-xl mx-4 max-h-[52vh] overflow-y-auto">
          <table className="w-full divide-y divide-gray-200 lg:table-fixed">
            <tbody className="divide-y divide-transparent">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <img
                        src={item.Shop_Profile || "https://via.placeholder.com/40"}
                        alt={item.Shop_Name}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {item.Transaction_ID || "111234"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {item.Order_ID || "00001"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {item.Shop_Name || "Pedigree"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {item.Customer_Name || "Winter Dela Rosa"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {formatDate(item.Date_Purchased)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    {formatDate(item.Date_Return)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900 text-center">
                    {item.Quantity || "14"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(
                          item.Status
                        )}`}
                      >
                        {item.Status || "Pending"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => openDetailsModal(item)}
                        className="bg-[#1683FF] hover:bg-blue-600 border text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <button onClick={() => openStatusModal(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Row Range Info */}
        <div className="flex justify-between items-center mb-6 mt-6 mx-9">
          <div className="text-xs text-[#6D6D71] font-poppins font-medium flex items-center">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setCurrentPage(1); // Reset to first page when changing items per page
                setItemsPerPage(Number(e.target.value));
              }}
              className="mx-2 px-1 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  : "bg-white hover:bg-gray-50 text-gray-700"
              } transition-colors`}
            >
              &lt;
            </button>

            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => (typeof pageNum === "number" ? setCurrentPage(pageNum) : null)}
                className={`w-7 h-7 flex items-center justify-center mx-1 border rounded-full text-xs font-poppins font-medium border-[#EEEEEE] text-[#404B52] ${
                  currentPage === pageNum
                    ? "bg-[#1683FF] text-white border-[#5932EA] border-2"
                    : pageNum === "..."
                    ? "cursor-default border-0"
                    : "bg-[#F5F5F5] hover:bg-gray-50 text-gray-700"
                } transition-colors`}
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
                  : "bg-white hover:bg-gray-50 text-gray-700"
              } transition-colors`}
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
