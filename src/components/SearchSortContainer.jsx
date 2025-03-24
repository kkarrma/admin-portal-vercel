import React from 'react';

const SearchSortContainer = ({ search, setSearch, sortKey, handleSortChange, setCurrentPage }) => {
  return (
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
  );
};

export default SearchSortContainer;