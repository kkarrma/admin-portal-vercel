import { useEffect, useState } from "react";
import default_user_icon from "../assets/default_user_icon.png";
import DataTable from "../components/DataTable";
import SearchSortContainer from "../components/SearchSortContainer";
//icon imports
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { TbCurrencyPeso } from "react-icons/tb";
import { BsFillBoxFill, BsFillBoxSeamFill } from "react-icons/bs";
import { BsCartFill, BsCartXFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";



export default function Dashboard() {
  const [username, setUsername] = useState("Super Admin");
  const [role, setRole] = useState("Admin");
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Join_Date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shopDetails, setShopDetails] = useState({ id: '', name: '', location: '' });

  // Define table columns configuration
  const tableColumns = [
    { label: "Shop Profile", key: "Shop_Profile", type: "image", minWidth: "80px", width: "80px" },
    { label: "Location", key: "Location", type: "text", minWidth: "150px" },
    { label: "Phone Number", key: "Phone_Number", type: "text", minWidth: "150px" },
    { label: "Email", key: "Email", type: "text", minWidth: "180px" },
    { label: "Owner", key: "Owner", type: "text", minWidth: "120px" },
    { label: "Total Products", key: "Total_Products", type: "number", minWidth: "120px" },
    { label: "Join Date", key: "Join_Date", type: "date", minWidth: "150px" },
    { label: "Status", key: "Status", type: "status", minWidth: "100px" },
    { 
      label: "Action", 
      key: null, 
      type: "action", 
      onClick: openStatusModal, 
      minWidth: "80px", 
      width: "80px" 
    },
  ];

  // Sample metrics data - in a real app, this would come from an API
  const metrics = [
    { title: "Total Shop Registered", value: 100, change: 20, icon: "shop", color: "blue" },
    { title: "Total Revenue", value: 250000, change: 20, icon: "currency", color: "orange" },
    { title: "Total Sales", value: 50000, change: 20, icon: "currency", color: "green" },
    { title: "Complete Orders", value: 200, change: -15, icon: "complete_orders", color: "blue" },
    { title: "Sold Out Products", value: 890, change: 20, icon: "products", color: "purple" },
    { title: "Pending Orders", value: 56, change: 20, icon: "pending_orders", color: "green" },
    { title: "To-Progress Shipment", value: 24, change: 10, icon: "shipment", color: "yellow" },
    { title: "Pending Return/Refund", value: 100, change: 20, icon: "currency", color: "green" },
    { title: "Cancel Order", value: 100, change: 20, icon: "cancel_order", color: "red" },
  ];

  // Format currency values
  const formatCurrency = (value) => {
    return value.toLocaleString();
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("https://retoolapi.dev/6PooPs/shop_data");
        
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

  // Update the datetime periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  function openStatusModal(item) {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  // Handle sort change
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!search.trim()) return true;
    
    const searchTerm = search.toLowerCase();
    return (
      (item.Location && item.Location.toLowerCase().includes(searchTerm)) ||
      (item.Phone_Number && item.Phone_Number.toLowerCase().includes(searchTerm)) ||
      (item.Email && item.Email.toLowerCase().includes(searchTerm)) ||
      (item.Owner && item.Owner.toLowerCase().includes(searchTerm)) ||
      (item.Status && item.Status.toLowerCase().includes(searchTerm))
    );
  });

  // Paginate sorted data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-500";
      case "Inactive":
        return "bg-red-50 text-red-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };
  
  // Handle saving new shop
  const handleSaveShop = (details) => {
    const newShop = {
      id: details.id || data.length + 1,
      Shop_Profile: default_user_icon,
      Location: details.location || "New Location",
      Phone_Number: details.phone || "(+63) 991-123-4567",
      Email: details.email || "newshop@example.com",
      Owner: details.owner || "New Owner",
      Total_Products: "0",
      Join_Date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      Status: "Active"
    };
    
    if (details.id) {
      // Update existing shop
      setData(data.map(shop => shop.id === details.id ? { ...shop, ...newShop } : shop));
    } else {
      // Add new shop
      setData([...data, newShop]);
    }
  };

  // Render metric card based on type
  const renderMetricCard = (metric) => {
    let iconElement;
    
    switch (metric.icon) {
        case 'shop':
          iconElement = (
              <HiMiniBuildingStorefront className="h-5 w-5 m-1 text-unleash-blue" />
          );
          break;
        case 'currency':
          iconElement = (
              <TbCurrencyPeso className="h-5 w-5 m-1 text-orange-500" />
          );
          break;
        case 'complete_orders':
          iconElement = (
              <BsFillBoxFill className="h-5 w-5 m-1 text-unleash-blue" />
          );
          break;
        case 'products':
          iconElement = (
              <BsFillBoxSeamFill className="h-5 w-5 m-1 text-purple-500" />
          );
          break;
        case 'pending_orders':
          iconElement = (
              <BsCartFill className="h-5 w-5 m-1 text-green-600" />
          );
          break;
        case 'shipment':
          iconElement = (
              <FaTruck className="h-5 w-5 m-1 text-yellow-500" />
          );
          break;
        case 'cancel_order':
          iconElement = (
              <BsCartXFill className="h-5 w-5 m-1 text-red-500" />
          );
          break;
        default:
          iconElement = (
              <BsFillBoxFill className="h-5 w-5 m-1 text-gray-500" />
          );
      }

    let valueDisplay = metric.value;
    if (metric.title.includes("Revenue") || metric.title.includes("Sales")) {
      valueDisplay = `₱ ${formatCurrency(metric.value)}`;
    }

    return (
      <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
        <div className="font-montserrat">
          <h3 className="text-xs text-gray-500 font-medium">{metric.title}</h3>
          <p className="text-2xl font-semibold mt-1">{valueDisplay}</p>
          <div className={`flex items-center text-xs mt-1 ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={metric.change >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
              />
            </svg>
            <span className="ml-1 font-medium text-gray">{Math.abs(metric.change)}% this month</span>
          </div>
        </div>
        <div className="bg-gray-200 p-3 rounded-full">
            {iconElement}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Metrics Grid - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {metrics.slice(0, 3).map((metric, index) => (
          <div key={index}>
            {renderMetricCard(metric)}
          </div>
        ))}
      </div>

      {/* Metrics Grid - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {metrics.slice(3, 6).map((metric, index) => (
          <div key={index + 3}>
            {renderMetricCard(metric)}
          </div>
        ))}
      </div>

      {/* Metrics Grid - Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {metrics.slice(6, 9).map((metric, index) => (
          <div key={index + 6}>
            {renderMetricCard(metric)}
          </div>
        ))}
      </div>

      {/* Shop List Section with SearchSortContainer */}
        <SearchSortContainer
          search={search}
          setSearch={setSearch}
          sortKey={sortKey}
          handleSortChange={handleSortChange}
          setCurrentPage={setCurrentPage}
          filteredData={filteredData}
          pageHeaderName="Shop List"
          isAddVisible={true}
          addLabel="Add New Shop"
          petDetails={shopDetails}
          setPetDetails={setShopDetails}
          onSavePet={handleSaveShop}
        />

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 mx-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Enhanced Data Table */}
        {!loading && (
          <div className="pb-4">
            <DataTable
              columns={tableColumns}
              filteredData={filteredData}
              paginatedData={paginatedData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              getStatusClass={getStatusClass}
            />
          </div>
        )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Delete this Store?</h3>
              </div>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              If you delete this store all the data will be deleted. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle delete logic here
                  setData(data.filter(item => item.id !== selectedItem.id));
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getCurrentDateTime() {
  const now = new Date();

  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${month} ${year} | ${hours}:${minutes} ${ampm}`;
}