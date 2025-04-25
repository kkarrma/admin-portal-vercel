import { useState, useEffect } from "react";
import SearchSortContainer from "../components/SearchSortContainer";
import DataTable from "../components/DataTable";
import { ClassNames } from "@emotion/react";
import UserManagementModal from "../components/UserManagementModal";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageHeaderName, setPageHeaderName] = useState("User Management");
  const [searchTerm, setSearch] = useState("");

  const [sortKey, setSortKey] = useState("Email");
  const [sortDirection, setSortDirection] = useState("asc");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("details");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProductExpanded, setIsProductExpanded] = useState(false);

  const openUserManagementModal = (user) => {
    setSelectedUser(user);
    setModalType("action");
    setShowModal(true);
  };
  
  const tableColumns = [
    { label: "Email", key: "Email", type: "text" },
    { label: "Username", key: "Username", type: "text" },
    { label: "First Name", key: "First_Name", type: "text" },
    { label: "Last Name", key: "Last_Name", type: "text" },
    { label: "Number of Pets", key: "Number_Of_Pets", type: "number" },
    {
      label: "Verification Status",
      key: "Verification_Status",
      type: "status-2",
    },
    { label: "Number of Followers", key: "Followers", type: "number" },
    { label: "Number of Following", key: "Following", type: "number" },
    { label: "Number of Referrals", key: "Referrals", type: "number" },
    {
      label: "Actions",
      key: "action",
      type: "action",
      onClick: openUserManagementModal,
    },
  ];

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const response = await fetch("https://retoolapi.dev/x17cdl/data");
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

  const getStatusClass = (status) => {
    if (status === true) {
      return "bg-green-50 bg-opacity-10 text-green-400"; // Verified
    } else if (status === false) {
      return "bg-yellow-50 bg-opacity-10 text-yellow-400"; // Pending
    } else {
      return "bg-blue-50 bg-opacity-10 text-blue-400"; // Unknown/undefined
    }
  };

  // Handle sort change
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sort change
  };

  const lowerSearch = searchTerm.toLowerCase();

  const filteredData = data.filter((item) => {
    return (
      (item.Email && item.Email.toLowerCase().includes(lowerSearch)) ||
      (item.Username && item.Username.toLowerCase().includes(lowerSearch)) ||
      (item.First_Name &&
        item.First_Name.toLowerCase().includes(lowerSearch)) ||
      (item.Last_Name && item.Last_Name.toLowerCase().includes(lowerSearch))
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!a[sortKey] || !b[sortKey]) {
      if (!a[sortKey]) return 1;
      if (!b[sortKey]) return -1;
      return 0;
    }

    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (
      sortKey === "Number_Of_Pets" ||
      sortKey === "Followers" ||
      sortKey === "Following" ||
      sortKey === "Referrals"
    ) {
      return sortDirection === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }

    const stringA = String(valueA).toLowerCase();
    const stringB = String(valueB).toLowerCase();

    return sortDirection === "asc"
      ? stringA.localeCompare(stringB)
      : stringB.localeCompare(stringA);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-webpage-bg">
      <SearchSortContainer
        search={searchTerm}
        setSearch={setSearch}
        sortKey={sortKey}
        handleSortChange={handleSortChange}
        setCurrentPage={setCurrentPage}
        filteredData={filteredData}
        pageHeaderName={pageHeaderName}
      />

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

      {!loading && !error && (
        <DataTable
          columns={tableColumns}
          paginatedData={paginatedData}
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          startIndex={startIndex}
          getStatusClass={getStatusClass}
          handleSortChange={handleSortChange}
          sortKey={sortKey}
          sortDirection={sortDirection}
          isUserManagement={true}
        />
      )}

      <UserManagementModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedUser={selectedUser}
      />

      {/*<UserDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isProductExpanded={isProductExpanded}
        setIsProductExpanded={setIsProductExpanded}
        updateStatus={updateStatus}
        statusItems={statusItems}
      />*/}
    </div>
  );
};

export default UserManagement;
