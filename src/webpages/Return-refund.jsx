import { useEffect, useState } from "react";
import SearchSortContainer from "../components/SearchSortContainer";
import DataTable from "../components/DataTable";
import ModalsComponent from "../components/ModalsComponent";

const ReturnRefund = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Date_Purchased");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProductExpanded, setIsProductExpanded] = useState(false);
  const itemsPerPage = 7;

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://retoolapi.dev/SWvloe/refund-return-order");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const apiData = await response.json();
        setData(apiData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Status tracking for timeline in details modal
  const statusItems = [
    { status: "Return Requested", time: "Mar 18, 9:41 AM", active: true, highlight: false },
    { status: "Reviewing", time: "Mar 18, 10:30 AM", active: true, highlight: false },
    { status: "Approved", time: "Pending", active: selectedItem?.Status === "Approved", highlight: true },
    { status: "Refund Processed", time: "Pending", active: selectedItem?.Status === "Completed", highlight: false }
  ];

  // Handle sort change
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!search.trim()) return true;
    
    const searchTerm = search.toLowerCase();
    return (
      (item.Transaction_ID && item.Transaction_ID.toString().toLowerCase().includes(searchTerm)) ||
      (item.Order_ID && item.Order_ID.toString().toLowerCase().includes(searchTerm)) ||
      (item.Shop_Name && item.Shop_Name.toLowerCase().includes(searchTerm)) ||
      (item.Customer_Name && item.Customer_Name.toLowerCase().includes(searchTerm)) ||
      (item.Status && item.Status.toLowerCase().includes(searchTerm))
    );
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!a[sortKey] || !b[sortKey]) return 0;
    
    const valueA = a[sortKey].toString().toLowerCase();
    const valueB = b[sortKey].toString().toLowerCase();
    
    // For date columns, convert to comparable values
    if (sortKey === "Date_Purchased" || sortKey === "Date_Return") {
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    // For other columns
    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Modal functions
  const openDetailsModal = (item) => {
    setSelectedItem(item);
    setModalType("details");
    setShowModal(true);
  };

  const openStatusModal = (item) => {
    setSelectedItem(item);
    setModalType("status");
    setShowModal(true);
  };

  // Update status function
  const updateStatus = async (item) => {
    try {
      const response = await fetch(`https://retoolapi.dev/SWvloe/refund-return-order/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: item.Status }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const updatedItem = await response.json();
      
      // Update local state
      setData(data.map(dataItem => 
        dataItem.id === updatedItem.id ? updatedItem : dataItem
      ));
      
      setShowModal(false);
    } catch (err) {
      setError(`Failed to update status: ${err.message}`);
      console.error("Error updating status:", err);
    }
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Denied":
        return "bg-red-100 text-red-800 border-red-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Sort Component */}
      <SearchSortContainer
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        handleSortChange={handleSortChange}
        setCurrentPage={setCurrentPage}
      />

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Data Table Component */}
      {!loading && !error && (
        <DataTable
          paginatedData={paginatedData}
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          openDetailsModal={openDetailsModal}
          openStatusModal={openStatusModal}
          getStatusClass={getStatusClass}
        />
      )}

      {/* Modals Component */}
      <ModalsComponent
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isProductExpanded={isProductExpanded}
        setIsProductExpanded={setIsProductExpanded}
        updateStatus={updateStatus}
        statusItems={statusItems}
      />
    </div>
  );
};

export default ReturnRefund;