// Updated SearchSortContainer.jsx
import React, { useState, useEffect } from 'react';
import AddPetModal from './AddPetModal';
import { FaPaw, FaPlus } from 'react-icons/fa';

const SearchSortContainer = ({ 
  search, 
  setSearch, 
  sortKey, 
  handleSortChange, 
  setCurrentPage, 
  filteredData, 
  pageHeaderName,
  isAddVisible,
  addLabel,
  petDetails,
  setPetDetails,
  onSavePet,
  isExpandable = false,
  defaultExpanded = true
}) => {
  // Local state for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for expandable section
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // Track search term for debouncing
  const [searchTerm, setSearchTerm] = useState(search);
  
  // Function to handle opening the modal
  const handleOpenModal = () => {
    console.log("Opening modal"); // Add this log
    // Reset pet details when opening modal for new pet
    if (setPetDetails) {
      setPetDetails({ id: '', type: '', name: '' });
    }
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    console.log("Closing modal"); // Add this log
    setIsModalOpen(false);
  };

  // Function to handle saving pet details
  const handleSavePet = (details) => {
    console.log("Saving pet:", details); // Add this log
    if (onSavePet) {
      onSavePet(details);
    } else {
      console.log('Saved pet:', details);
    }
    setIsModalOpen(false);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearch, setCurrentPage]);

  // Debug log to check modal state
  console.log("Modal open state:", isModalOpen);

  return (
    <div className="max-w-full px-4 py-4 bg-white rounded-lg shadow mb-4">
      {/* Header with total count */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pt-2 pb-6">
        <div className="flex items-baseline">
          <h1 className="text-3xl font-bold text-gray-800">{pageHeaderName}</h1>
          <span className="ml-3 text-gray-500 text-lg">({filteredData.length})</span>
        </div>
        
        {isExpandable && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>
      
      {/* Collapsible content section */}
      {(!isExpandable || isExpanded) && (
        <div className="flex items-center justify-between font-montserrat font-medium text-sm">
          <div className="flex items-center space-x-4 flex-grow">
            {/* Search */}
            <div className="relative w-4/12">
              <input
                type="text"
                placeholder="Search anything"
                className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-unleash-blue focus:border-unleash-blue"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <div className="absolute left-3 top-1.5 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSearch('');
                  }}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sort - Now the entire section is rounded */}
            <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 px-3 py-2">
              <label htmlFor="sort" className="text-gray-600 mr-2 whitespace-nowrap">Sort by:</label>
              <select
                id="sort"
                className="px-2 bg-transparent border-none focus:outline-none focus:ring-0"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortKey}
              >
                <option value="Date_Purchased">Newest</option>
                <option value="Date_Return">Return Date</option>
                <option value="Shop_Name">Shop Name</option>
                <option value="Status">Status</option>
                <option value="Quantity">Quantity</option>
                <option value="Pet_Category">Category</option>
                <option value="Pet_Breed">Breed</option>
              </select>
            </div>

            {/* Advanced filters (optional) */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full border border-gray-300 px-3 py-2">
              <button className="text-gray-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>
{/*           
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                readOnly
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-unleash-blue"></div>
            </label>
          </div> */}
            
          {/* Add Button */}
          {isAddVisible && (
            <button
              type="button"
              onClick={handleOpenModal}
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-unleash-blue hover:bg-unleash-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unleash-blue flex items-center gap-2"
            >
              <FaPlus size={12} />
              {addLabel}
            </button>
          )}
        </div>
      )}

      {/* Modal with local state control */}
      {isModalOpen && (
        <AddPetModal
          showModal={isModalOpen}
          setShowModal={setIsModalOpen}
          petDetails={petDetails}
          setPetDetails={setPetDetails}
          onSave={handleSavePet}
        />
      )}
    </div>
  );
};

export default SearchSortContainer;