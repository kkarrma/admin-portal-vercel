import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import {
  BsCartFill,
  BsCartPlusFill,
  BsCartDashFill,
  BsCartCheckFill,
  BsCartXFill,
} from "react-icons/bs";
import { FaCircleExclamation } from "react-icons/fa6";

const StatusModal = ({
  selectedItem,
  setSelectedItem,
  setShowModal,
  updateStatus,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  // Map status to corresponding cart icon
  const cartIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <BsCartFill className="text-2xl text-gray-600 mr-3" />;
      case "approved":
        return <BsCartCheckFill className="text-2xl text-gray-600 mr-3" />;
      case "confirmed":
        return <BsCartPlusFill className="text-2xl text-gray-600 mr-3" />;
      case "reviewing":
        return <BsCartDashFill className="text-2xl text-gray-600 mr-3" />;
      case "completed":
      case "cancelled":
        return <BsCartXFill className="text-2xl text-gray-600 mr-3" />;
      default:
        return <BsCartFill className="text-2xl text-gray-600 mr-3" />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg w-full max-w-md z-10 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="text-[#00AC4F] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
            <FaCircleExclamation className="text-lg" />
          </div>
          <h3 className="text-lg font-semibold font-montserrat text-gray-800 pl-4">
            Set Status Order for
          </h3>

          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 text-left px-4 mb-4 font-medium font-montserrat">
          Do you want to approve this return order?
        </p>

        <div className="p-4 space-y-4">
          {/* Customer Name */}
          <div className="bg-gray-100 flex items-center p-4">
            <FaUserLarge className="text-2xl text-gray-600 mr-3" />
            <span className="text-gray-800 ml-2 font-medium font-montserrat text-md">
              {selectedItem.Customer_Name}
            </span>
          </div>

          {/* Purchase Date */}
          <div className="bg-gray-100 p-4 flex items-center">
            <IoCalendarClear className="text-2xl text-gray-600 mr-3" />
            <span className="text-gray-800 ml-2 font-medium font-montserrat text-md">
              {formatDate(selectedItem.Date_Purchased)}
            </span>
          </div>

          {/* Status Selection */}
          <div className="bg-gray-100 p-4 flex items-center relative">
            {cartIcon(selectedItem.Status)}

            {/* Custom Dropdown Button */}
            <div className="relative flex-grow">
              <button
                className="w-full flex items-center justify-between bg-transparent text-gray-800 font-medium font-montserrat outline-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="flex items-center">
                  {/* {cartIcon(selectedItem.Status)} */}
                  <span className="ml-2">{selectedItem.Status}</span>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-600 transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Options */}
              {showDropdown && (
                <div className="absolute top-full w-full bg-white shadow-md z-20 rounded-md mt-1 max-h-48 overflow-y-auto">
                  {["Pending", "Completed", "Approved", "Cancelled"].map(
                    (status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setSelectedItem({ ...selectedItem, Status: status });
                          setShowDropdown(false);
                        }}
                        className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          selectedItem.Status === status
                            ? "bg-gray-200"
                            : "bg-white"
                        }`}
                      >
                        {cartIcon(status.toLowerCase())}
                        <span className="ml-2">{status}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => updateStatus(selectedItem)}
            className="px-4 py-2 text-white bg-[#00AC4F] rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
