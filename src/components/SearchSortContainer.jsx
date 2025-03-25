import React from 'react';

const SearchSortContainer = ({ search, setSearch, sortKey, handleSortChange, setCurrentPage, filteredData}) => {
  return (
    <div className="mx-auto max-w-full px-4 py-4 bg-white rounded-lg shadow mb-4">
      {/* Header with total count */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pt-4 pb-6">
        <div className="flex items-baseline">
          <h1 className="text-3xl font-bold text-gray-800">Return & Refund Management</h1>
          <span className="ml-3 text-gray-500 text-lg">({filteredData.length})</span>
        </div>
      </div>
      
      {/* Search, Sort & Switch - Better aligned horizontal layout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-grow">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search anything"
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          
          {/* Sort - Now the entire section is rounded */}
          <div className="flex items-center bg-gray-50 rounded-full border border-gray-300 px-3 py-1">
            <label htmlFor="sort" className="text-gray-600 mr-2 whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              className="py-1 px-2 bg-transparent border-none focus:outline-none focus:ring-0"
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
        
        <div className="flex items-center">
          {/* <span className="mr-3 text-sm font-medium text-gray-700">Show Archived</span> */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              className="sr-only peer" 
              checked
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchSortContainer;