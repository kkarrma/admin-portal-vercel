import { useEffect, useState } from "react";
import sample1 from "../assets/refund/image15.png";
import sample2 from "../assets/refund/image16.png"; 
import sample3 from "../assets/refund/image17.png"; 
import sample4 from "../assets/refund/image18.png";
import product from "../assets/refund/image14.png";

const RefundV2 = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Date_Purchased");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("details"); // "details" or "status"
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const itemsPerPage = 10;
  const [isProductExpanded, setIsProductExpanded] = useState(false);

  useEffect(() => {
    fetch("https://retoolapi.dev/SWvloe/refund-return-order")
      .then((res) => res.json())
      .then((data) => {
        // Store both formatted and raw dates for proper sorting
        const formattedData = data.map(item => {
          // Parse dates properly
          const rawPurchaseDate = new Date(item.Date_Purchased);
          
          // Handle potential null or invalid return dates
          let rawReturnDate = null;
          if (item.Date_Return) {
            rawReturnDate = new Date(item.Date_Return);
            if (isNaN(rawReturnDate.getTime())) {
              rawReturnDate = null;
            }
          }
          
          return {
            ...item,
            // Store raw dates for sorting
            rawPurchaseDate: isNaN(rawPurchaseDate.getTime()) ? new Date(0) : rawPurchaseDate,
            rawReturnDate: rawReturnDate || new Date(0), // Use epoch date for nulls
            // Format dates for display
            Date_Purchased: formatDate(item.Date_Purchased),
            Date_Return: formatDate(item.Date_Return),
            // Store original values for searching
            originalPurchaseDate: item.Date_Purchased,
            originalReturnDate: item.Date_Return
          };
        });
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Get unique status values to populate dropdown
  useEffect(() => {
    if (data.length > 0) {
      const uniqueStatuses = [...new Set(data.map(item => item.Status))];
      setStatusOptions(uniqueStatuses);
    }
  }, [data]);

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
    // Special case for date sorting - use the raw dates
    if (sortKey === "Date_Purchased") {
      // Ensure we have valid dates to compare
      const dateA = a.rawPurchaseDate instanceof Date ? a.rawPurchaseDate : new Date(0);
      const dateB = b.rawPurchaseDate instanceof Date ? b.rawPurchaseDate : new Date(0);
      
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    
    if (sortKey === "Date_Return") {
      // Ensure we have valid dates to compare
      const dateA = a.rawReturnDate instanceof Date ? a.rawReturnDate : new Date(0);
      const dateB = b.rawReturnDate instanceof Date ? b.rawReturnDate : new Date(0);
      
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }
    
    // For other fields
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortChange = (value) => {
    setSortKey(value);
    
    // Set appropriate sort direction based on field
    if (value === "Date_Purchased" || value === "Date_Return") {
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



  // Open details modal
  const openDetailsModal = (item) => {
    setSelectedItem(item);
    setModalType("details");
    setShowModal(true);
  };

  // Open status change modal
  const openStatusModal = (item) => {
    setSelectedItem(item);
    setModalType("status");
    setShowModal(true);
  };

  const statusItems = [
    { status: "Request Denied", time: " ", active: false },
    { status: "Refunded", time: "10:00 am, 21/01/2024", active: false },
    { status: "Item Returned", time: "10:00 am, 21/01/2024", active: false },
    { status: "Pick up by Rider", time: "10:00 am, 21/01/2024", active: false },
    { status: "Returning Process", time: "11:00 am, 23/01/2024", active: false },
    { status: "Approved", time: "10:00 am, 24/01/2024", active: false },
    { status: "Pending", time: "20/01/2024", active: true }
  ]

  // Update status function
  const updateStatus = () => {
    // In a real app, you would send this to your API
    // For now, just update the local state
    const updatedData = data.map(d => 
      d.id === selectedItem.id ? {...d, Status: selectedItem.Status} : d
    );
    setData(updatedData);
    setShowModal(false);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "Pending":
        return "border-[#FE9F23] bg-orange-100 bg-opacity-20 text-[#FE9F23]";
      case "Completed":
      case "Approved":
        return "border-green-500 bg-green-100 bg-opacity-20 text-green-500";
      case "Reviewing":
      case "Confirmed":
        return "border-blue-500 bg-blue-100 bg-opacity-20 text-blue-500";
      case "Cancelled":
        return "border-red-500 bg-red-100 bg-opacity-20 text-red-500";
      case "Denied":
        return "border-purple-600 bg-purple-100 bg-opacity-20 text-purple-600";
      default:
        return "border-gray-500 bg-gray-100 bg-opacity-20 text-gray-500";
    }
  };

  const getActionIcon = (status) => {
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

  // Details Modal Content
  const renderDetailsModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl z-10 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Return Details</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-gray-600 text-left pl-2 mb-4">Customer and products details return</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <div className="flex flex-col ml-2">
                    <div className="border-b border-gray-300 justify-items-start py-2">
                      <p className="font-medium text-md">{selectedItem.Customer_Name}</p>
                      <p className="text-sm text-gray-600">{selectedItem.Date_Purchased}</p>
                    </div>
                    <div className="py-2">
                      <p className="text-sm text-left">
                        <span className="font-medium text-gray-500">Phone:</span> (555) 123-4567
                      </p>
                      <p className="text-sm text-left">
                        <span className="font-medium text-gray-500">Address:</span> Brgy. Don Bosco, Parañaque City
                      </p>
                    </div>
                  </div>
                  
                  {/* Product Info - Collapsible */}
                  <div className="bg-[#EEEEEF] p-3 rounded-md">
                    <div 
                      className="flex justify-between items-center cursor-pointer" 
                      onClick={() => setIsProductExpanded(!isProductExpanded)}
                    >
                      <p className="font-medium">Product Info</p>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform ${isProductExpanded ? 'transform rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* First product always visible */}
                    <div className="py-2 my-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
                          <img src={product} alt="Product" className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pedigree Beef</p>
                          <div className="flex justify-between text-xs">
                            <span>Qty: 1</span>
                            <span>₱ 150</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional products shown when expanded */}
                    {isProductExpanded && (
                      <div className="pb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
                            <img src={product} alt="Product" className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Pedigree Beef</p>
                            <div className="flex justify-between text-xs">
                              <span>Qty: 1</span>
                              <span>₱ 150</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-medium mt-2">
                      <span>Total</span>
                      <span>₱ 300</span>
                    </div>
                  </div>
                  
                  {/* Reason for Return - Full width */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-left pl-2">Reason for Return</label>
                    <textarea className="w-full p-3 border border-gray-300 rounded resize-none" rows="2" value="Item Damage"></textarea>
                  </div>
                </div>
                
                {/* Proof Images - Full width */}
                <div className="mt-3 mb-2">
                  <p className="block text-sm font-medium mb-1 text-left pl-2">Proof of Return Item</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <img src={sample1} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample2} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample3} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample4} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                  </div>
                </div>
              </div>
              
              {/* Stepper - Right Column */}
              <div className="border-gray-200 pl-4 pr-2 py-4 flex items-start">
                <div className="w-full">
                  {statusItems.map((item, index) => (
                    <div className="flex cursor-pointer hover:bg-gray-50 rounded" key={index} onClick={() => console.log(`Status clicked: ${item.status}`)}>
                      <div className="flex flex-col items-center mr-3">
                        {/* Vertical line above circle */}
                        <div 
                          className={`w-px h-4 ${index === 0 ? 'opacity-0' : item.highlight ? 'bg-blue-400' : index === statusItems.length - 2 ? 'bg-orange-500' : 'bg-gray-300'}`} 
                        />
                        
                        {/* Circle */}
                        <div>
                          {item.active ? (
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-4 h-4 border rounded-full border-gray-300 bg-white"></div>
                          )}
                        </div>
                        
                        {/* Vertical line below circle */}
                        <div 
                          className={`w-[1px] h-4 ${index === statusItems.length - 1 ? 'opacity-0' : index === statusItems.length - 2 ? 'bg-orange-500' : index === 2 ? 'bg-blue-400' : 'bg-gray-300'}`} 
                        />
                      </div>
                      
                      <div className="flex flex-col py-1">
                        <p className={`text-sm font-medium ${item.active ? 'text-orange-500' : 'text-gray-600'}`}>
                          {item.status}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // Status Modal Content
  const renderStatusModal = () => {
  if (!selectedItem) return null;

  return (
    
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
  );
};

  return (
<div className="">
<div className="max-h-screen overflow-y-scroll">
  {/* Top Section Container: Header, Search, and Sort */}
  <div className="mx-auto max-w-full px-4 py-4 bg-white rounded-lg shadow mb-4">
    {/* Header */}
    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pt-4 pb-6">
      <h1 className="text-2xl font-bold text-gray-800">Return & Refund Management</h1>
    </div>
    
    {/* Search & Sort - Horizontal layout */}
    <div className="flex items-start">
      <div className="relative w-full md:w-auto md:flex-grow">
        <input
          type="text"
          placeholder="Search anything"
          className="pl-10 pr-4 py-2 w-4/12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex items-center w-3/12">
        <label htmlFor="sort" className="text-gray-600 mr-2">Sort by:</label>
        <select
          id="sort"
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortKey}
        >
          <option value="Date_Purchased">Newest</option>
          <option value="Date_Return">Return Date</option>
          <option value="Shop_Name">Shop Name</option>
          <option value="Status">Status</option>
        </select>
      </div>
    </div>
  </div>

  {/* Data Table Container - Separate from the top section */}
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
                      {getActionIcon(item.Status)}
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
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom sm:align-middle sm:max-w-lg sm:w-full">
                {modalType === "details" ? renderDetailsModal() : renderStatusModal()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RefundV2;