import { useEffect, useState } from "react";

const Refund = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Date_Purchased");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 6;
  
  useEffect(() => {
    fetch("https://retoolapi.dev/SWvloe/refund-return-order")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map(item => {
        
          const rawPurchaseDate = new Date(item.Date_Purchased);
          
          let rawReturnDate = null;
          if (item.Date_Return) {
            rawReturnDate = new Date(item.Date_Return);
            if (isNaN(rawReturnDate.getTime())) {
              rawReturnDate = null;
            }
          }
          
          return {
            ...item,
            
            rawPurchaseDate: isNaN(rawPurchaseDate.getTime()) ? new Date(0) : rawPurchaseDate,
            rawReturnDate: rawReturnDate || new Date(0), 
          
            Date_Purchased: formatDate(item.Date_Purchased),
            Date_Return: formatDate(item.Date_Return),
    
            originalPurchaseDate: item.Date_Purchased,
            originalReturnDate: item.Date_Return
          };
        });
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Handle invalid date
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredData = data.filter((item) => {
    const searchLower = search.toLowerCase().trim();
    return (
      searchLower === "" ||
      [
        item.Shop_Name,
        item.Customer_Name,
        item.Order_ID,
        item.Status,
        // item.Transaction_ID,
      ].some((value) => value?.toLowerCase().includes(searchLower))
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortKey === "Date_Purchased") {
      const dateA = a.rawPurchaseDate instanceof Date ? a.rawPurchaseDate : new Date(0);
      const dateB = b.rawPurchaseDate instanceof Date ? b.rawPurchaseDate : new Date(0);
      
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    
    if (sortKey === "Date_Return") {
      const dateA = a.rawReturnDate instanceof Date ? a.rawReturnDate : new Date(0);
      const dateB = b.rawReturnDate instanceof Date ? b.rawReturnDate : new Date(0);
      
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    

    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortChange = (e) => {
    const newKey = e.target.value;
    setSortKey(newKey);
    
    
    if (newKey === "Date_Purchased" || newKey === "Date_Return") {
      setSortDirection("desc"); // Newest first for dates
    } else {
      setSortDirection("asc"); // Alphabetical for text
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const getPageNumbers = () => {
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

  // Modal Toggle
  const openDetailsModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Update status function (add this)
  const updateStatus = (item) => {e
    const updatedData = data.map(d => 
      d.id === item.id ? {...d, Status: item.Status} : d
    );
    setData(updatedData);
    setShowModal(false);
  };

  return (
    <div className="px-6 py-20 bg-transparent min-h-screen">
      {/* Search & Sort */}
      <div className="flex justify-between mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-6 pl-14 w-full text-xl focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute left-3 top-5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="gray">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          <label htmlFor="sort" className="text-[#7e7e7e] font-poppins">Sort by :</label>
          <select
            id="sort"
            className="px-3 py-7 rounded focus:outline-none transition font-semibold font-poppins"
            onChange={handleSortChange}
            value={sortKey}
          >
            <option value="Date_Purchased">Newest</option>
            <option value="Date_Return">Return</option>
            <option value="Shop_Name">Shop</option>
          </select>
        </div>
      </div>

      <div className="bg-transparent lg:overflow-hidden md:overflow-x-scroll mb-6">
        <div className="md:block hidden">
          <table className="md:table-fixed table-none min-w-full">
            <thead>
              <tr className="bg-transparent border-b border-[#EEEEEE]">
                {["Shop Profile", "Transaction ID", "Order ID", "Shop Name", "Customer Name", "Date Purchased", "Date Return", "Quantity", "Status", "View Details", "Action"].map((head, index) => (
                  <th key={index} className="p-4 text-left text-sm font-medium font-poppins text-[#B5B7C0]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {paginatedData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-gray-50 transition-colors ${index < paginatedData.length - 1 ? "border-b" : ""}`}
                >
                  <td className="p-4 ">
                    <img src={item.Shop_Profile} alt="Shop Logo" className="w-10 h-10 rounded-full object-cover m-4 " />
                  </td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Transaction_ID}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Order_ID}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Shop_Name}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Customer_Name}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Date_Purchased}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Date_Return}</td>
                  <td className="p-4 text-xs text-[#292D32] font-medium font-poppins">{item.Quantity}</td>
                  <td className="p-4">
                  <span className={`px-2 py-1 inline-flex justify-center items-center w-20 h-7 text-xs rounded-md font-poppins font-medium border-2 ${
                    item.Status === "Pending" ? "border-[#FE9F23] bg-orange-100 bg-opacity-20 text-[#FE9F23]" : 
                    item.Status === "Completed" ? "border-green-500 bg-green-100 bg-opacity-20 text-green-500" : 
                    item.Status === "Reviewing" ? "border-blue-500 bg-blue-100 bg-opacity-20 text-blue-500" :
                    item.Status === "Cancelled" ? "border-red-500 bg-red-100 bg-opacity-20 text-red-500" :
                    item.Status === "Denied" ? "border-purple-600 bg-purple-100 bg-opacity-20 text-purple-600" :
                    "border-gray-500 bg-gray-100 bg-opacity-20 text-gray-500" 
                    }`}>
                    {item.Status}
                  </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openDetailsModal(item)}
                      className="bg-[#0034B3] hover:bg-blue-700 border-2 w-24 text-white px-2 py-1.5 rounded-md text-xs font-poppins font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="p-4 ">
                  <button className="bg-green-200 bg-opacity-20 border-[#19E10E] border-2 w-20 hover:bg-green-600 text-[#19E10E] px-1.5 py-1 rounded-md text-xs font-poppins font-medium transition-colors ">
                      Approved
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
{/* Card Layout for Mobile View*/}
<div className="md:hidden flex flex-col gap-4 mt-4">
    {paginatedData.map((item) => (
      <div
        key={item.id}
        className="border border-[#EEEEEE] rounded-lg p-4 shadow-sm bg-white"
      >
        <div className="flex items-center gap-3">
          <img
            src={item.Shop_Profile}
            alt="Shop Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-[#292D32]">
              {item.Shop_Name}
            </p>
            <p className="text-xs text-gray-500">{item.Customer_Name}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1 text-xs text-[#292D32]">
          <p>
            <span className="font-medium">Transaction ID:</span>{" "}
            {item.Transaction_ID}
          </p>
          <p>
            <span className="font-medium">Order ID:</span> {item.Order_ID}
          </p>
          <p>
            <span className="font-medium">Date Purchased:</span>{" "}
            {item.Date_Purchased}
          </p>
          <p>
            <span className="font-medium">Date Return:</span> {item.Date_Return}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {item.Quantity}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 inline-flex justify-center items-center text-xs rounded-md font-medium border-2 ${
                item.Status === "Pending"
                  ? "border-[#FE9F23] bg-orange-100 bg-opacity-20 text-[#FE9F23]"
                  : item.Status === "Completed"
                  ? "border-green-500 bg-green-100 bg-opacity-20 text-green-500"
                  : item.Status === "Reviewing"
                  ? "border-blue-500 bg-blue-100 bg-opacity-20 text-blue-500"
                  : item.Status === "Cancelled"
                  ? "border-red-500 bg-red-100 bg-opacity-20 text-red-500"
                  : item.Status === "Denied"
                  ? "border-purple-600 bg-purple-100 bg-opacity-20 text-purple-600"
                  : "border-gray-500 bg-gray-100 bg-opacity-20 text-gray-500"
              }`}
            >
              {item.Status}
            </span>
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => openDetailsModal(item)}
            className="bg-[#1683FF] hover:bg-blue-600 border-2 w-full text-white px-3 py-2 rounded-md text-xs font-medium transition-colors"
          >
            View Details
          </button>
          <button className="bg-green-200 bg-opacity-20 border-[#19E10E] border-2 w-full hover:bg-green-600 text-[#19E10E] px-3 py-2 rounded-md text-xs font-medium transition-colors">
            Approved
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
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
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`w-8 h-8 flex items-center justify-center mx-1 border rounded-full font-poppins font-medium border-[#EEEEEE] bg-[#F5F5F5] ${
              currentPage === totalPages || totalPages === 0 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white hover:bg-gray-50 text-gray-700"
            } transition-colors`}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl z-10 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Edit User Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm text-black font-poppins font-semibold mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={selectedItem.Customer_Name}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins bg-gray-50"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm text-black font-poppins font-semibold mb-2">
                    Date Purchased
                  </label>
                  <input
                    type="text"
                    value={selectedItem.Date_Purchased}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins bg-gray-50"
                  />
                </div>
                
                {/* Status list */}
                <div className="col-span-1">
                  <label className="block text-sm text-black font-poppins font-semibold mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedItem.Status}
                      onChange={(e) => {
                        setSelectedItem({
                          ...selectedItem,
                          Status: e.target.value
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins appearance-none pr-8"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Denied">Denied</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#808080]">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => updateStatus(selectedItem)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refund;