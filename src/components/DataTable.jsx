import React from 'react';

const DataTable = ({ 
  paginatedData, 
  filteredData, 
  currentPage, 
  setCurrentPage, 
  itemsPerPage, 
  startIndex,
  openDetailsModal, 
  openStatusModal, 
  getStatusClass 
}) => {
  
  const getActionIcon = (item, status) => {
    if (status === "Cancelled" || status === "Denied") {
      return (
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    } else if (status === "Approved" || status === "Completed") {
      return (
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else {
      return (
        <button onClick={(e) => {
          e.stopPropagation();
          openStatusModal(item);
        }} className="p-2 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      );
    }
  };

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
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 lg:table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Profile</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Transaction ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Order ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Shop Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Customer Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Date Purchased</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Date Return</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Quantity</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Status</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Details</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/11">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Transaction_ID || "111234"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Order_ID || "00001"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Shop_Name || "Pedigree"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Customer_Name || "Winter Dela Rosa"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Date_Purchased || "March 25, 2025"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">{item.Date_Return || "March 25, 2025"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900 text-center">{item.Quantity || "14"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(item.Status)}`}>
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
                      <button
                        onClick={() => openStatusModal(item)}
                      >
                        {getActionIcon(item, item.Status)}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-md text-[#B5B7C0] font-poppins font-medium">
          Showing data {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </p>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] bg-[#F5F5F5] ${
              currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700"
            } transition-colors`}
          >
            &lt;
          </button>
          
          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === 'number' ? setCurrentPage(pageNum) : null}
              className={`w-8 h-8 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] text-[#404B52] ${
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
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredData.length / itemsPerPage), prev + 1))}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) || filteredData.length === 0}
            className={`w-8 h-8 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] bg-[#F5F5F5] ${
              currentPage === Math.ceil(filteredData.length / itemsPerPage) || filteredData.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white hover:bg-gray-50 text-gray-700"
            } transition-colors`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;