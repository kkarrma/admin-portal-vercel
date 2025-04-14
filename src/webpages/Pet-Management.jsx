import { useEffect, useState } from "react";
import SearchSortContainer from "../components/SearchSortContainer";
import DataTable from "../components/DataTable";
import AddPetModal from "../components/AddPetModal";
import EditPetModal from "../components/EditPetModal";

const PetManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("Date_Purchased");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [petDetails, setPetDetails] = useState({ id: '', type: '', name: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProductExpanded, setIsProductExpanded] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageHeaderName, setPageHeaderName] = useState("Pet Management");
  const [isAddVisible, setIsAddVisible] = useState(true);
  const [addLabel, setAddLabel] = useState("Add New Breed");
  
  // Fetch data from the API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://retoolapi.dev/rUAMFx/data");
      
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

  // Handle opening edit modal
  function openEditModal(item) {
    if (!item) {
      console.error("Attempted to open edit modal with undefined item");
      return;
    }
    
    // Ensure we have values for all fields, using empty strings as fallbacks
    setPetDetails({
      id: item.id || '',
      type: item.Pet_Category || '',
      name: item.Pet_Breed || ''
    });
    setSelectedItem(item);
    setShowEditModal(true);
  }

  // Handle opening add modal
  function openAddModal() {
    // Make sure we reset the pet details with valid defaults
    setPetDetails({ id: '', type: '', name: '' });
    setShowAddModal(true);
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

  // Handle save pet
  const handleSavePet = async (details) => {
    try {
      // Ensure details has all required properties
      if (!details) {
        throw new Error("Pet details are undefined");
      }
      
      const safeDetails = {
        id: details.id || '',
        type: details.type || '',
        name: details.name || ''
      };
      
      // If it's an existing pet, update it
      if (safeDetails.id) {
        const response = await fetch(`https://retoolapi.dev/rUAMFx/data/${safeDetails.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedItem,
            Pet_Category: safeDetails.type,
            Pet_Breed: safeDetails.name
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Update local state
        setData(data.map(item => 
          item.id === safeDetails.id ? {...item, Pet_Category: safeDetails.type, Pet_Breed: safeDetails.name} : item
        ));
      } 
      // If it's a new pet, add it
      else {
        const response = await fetch('https://retoolapi.dev/rUAMFx/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Pet_Category: safeDetails.type,
            Pet_Breed: safeDetails.name,
            Date_Purchased: new Date().toISOString()
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Update local state by refetching data to get the server-generated ID
        fetchData();
      }
      
    } catch (err) {
      setError(`Failed to save pet: ${err.message}`);
      console.error("Error saving pet:", err);
    }
  };

  // Handle delete pet - fixed to handle both item objects and direct IDs
  const handleDeletePet = async (itemOrId) => {
    // Extract the ID - handles both when an object is passed or just an ID
    const id = itemOrId && typeof itemOrId === 'object' ? itemOrId.id : itemOrId;
    
    if (!id) {
      console.error("Attempted to delete pet with undefined id", itemOrId);
      setError("Cannot delete: Missing pet ID");
      return;
    }
    
    try {
      // Check if the item exists in our local data first
      const itemExists = data.some(item => item.id === id);
      if (!itemExists) {
        setError(`Cannot delete: Pet with ID ${id} not found in local data`);
        return;
      }
      
      // Log the exact URL we're calling for debugging
      const deleteUrl = `https://retoolapi.dev/rUAMFx/data/${id}`;
      console.log(`Attempting to delete pet at: ${deleteUrl}`);
      
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      
      if (response.status === 404) {
        // If API returns 404, item doesn't exist on server, but we can still update local state
        console.warn(`Pet with ID ${id} not found on server, updating local state only`);
        setData(data.filter(item => item.id !== id));
        setShowEditModal(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Update local state
      setData(data.filter(item => item.id !== id));
      setShowEditModal(false);
      // Show success message
      setError(null); // Clear any existing errors
      
    } catch (err) {
      setError(`Failed to delete pet: ${err.message}`);
      console.error("Error deleting pet:", err);
    }
  };

  // Define table columns configuration AFTER the function definitions
  const tableColumns = [
    { label: "Breed", key: "Pet_Breed", type: "text" },
    { label: "Category", key: "Pet_Category", type: "text" },
    { label: "Details", key: null, type: "button", buttonText: "View", onClick: openEditModal },
    { 
      label: "Actions", 
      key: null, 
      type: "delete", 
      onClick: (item) => handleDeletePet(item.id) // Extract the ID here before passing to handleDeletePet
    },
  ];

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!search.trim()) return true;
    
    const searchTerm = search.toLowerCase();
    return (
      (item.Pet_Breed && item.Pet_Breed.toString().toLowerCase().includes(searchTerm)) ||
      (item.Pet_Category && item.Pet_Category.toString().toLowerCase().includes(searchTerm))
    );
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    // Handle cases where the key might not exist
    if (!a[sortKey] || !b[sortKey]) {
      // If one item is missing the sort key, push it to the end
      if (!a[sortKey]) return 1;
      if (!b[sortKey]) return -1;
      return 0;
    }
    
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    
    // Special handling for date columns
    if (sortKey === "Date_Purchased" || sortKey === "Date_Return") {
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    // Special handling for numeric columns
    if (sortKey === "Quantity") {
      return sortDirection === "asc" 
        ? Number(valueA) - Number(valueB) 
        : Number(valueB) - Number(valueA);
    }
    
    // Default string comparison for other columns
    const stringA = String(valueA).toLowerCase();
    const stringB = String(valueB).toLowerCase();
    
    return sortDirection === "asc" 
      ? stringA.localeCompare(stringB) 
      : stringB.localeCompare(stringA);
  });

  // Paginate sorted data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 bg-opacity-10 text-green-400";
      case "Pending":
        return "bg-amber-50 bg-opacity-10 text-yellow-400";
      case "Cancelled":
        return "bg-red-50 bg-opacity-10 text-red-400";
      default:
        return "bg-blue-50 bg-opacity-10 text-blue-400";
    }
  };

  return (
    <div className="container px-6 bg-webpage-bg">
      {/* Search and Sort Component */}
      <SearchSortContainer
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        handleSortChange={handleSortChange}
        setCurrentPage={setCurrentPage}
        filteredData={filteredData}
        pageHeaderName={pageHeaderName}
        isAddVisible={isAddVisible}
        addLabel={addLabel}
        openAddModal={openAddModal}
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
          columns={tableColumns}
          paginatedData={paginatedData}
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          startIndex={startIndex}
          getStatusClass={getStatusClass}
        />
      )}

      {/* Add Pet Modal */}
      <AddPetModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        petDetails={petDetails}
        setPetDetails={setPetDetails}
        onSave={handleSavePet}
      />

      {/* Edit Pet Modal */}
      <EditPetModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        petDetails={petDetails}
        setPetDetails={setPetDetails}
        onSave={handleSavePet}
        onDelete={() => selectedItem && handleDeletePet(selectedItem.id)}
      />
    </div>
  );
};

export default PetManagement;