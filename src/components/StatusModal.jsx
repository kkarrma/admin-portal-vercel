import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { BsCartFill } from "react-icons/bs";
import { FaCircleExclamation } from "react-icons/fa6";

const StatusModal = ({
  selectedItem,
  setSelectedItem,
  setShowModal,
  updateStatus,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
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
        <div className="flex items-center p-4 border-gray-200">
          <div className="text-[#00AC4F] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
            <FaCircleExclamation className="text-lg" />
          </div>
          <h3 className="text-lg font-semibold font-montserrat text-gray-800 pl-4">
            Set Status Order for
          </h3>
          
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
            <span className="text-gray-800 font-medium font-montserrat text-md">
              {selectedItem.Customer_Name}
            </span>
          </div>

          {/* Purchase Date */}
          <div className="bg-gray-100 p-4 flex items-center">
            <IoCalendarClear className="text-2xl text-gray-600 mr-3" />
            <span className="text-gray-800 font-medium font-montserrat text-md">
              {formatDate(selectedItem.Date_Purchased)}
            </span>
          </div>

          {/* Status Selection */}
          <div className="bg-gray-100 p-4 flex items-center">
            <BsCartFill className="text-2xl text-gray-600 mr-3" />
            <div className="flex-grow relative text-md">
              <select
                value={selectedItem.Status}
                onChange={(e) => {
                  setSelectedItem({
                    ...selectedItem,
                    Status: e.target.value,
                  });
                }}
                className="w-full bg-transparent appearance-none text-gray-800 font-medium font-montserrat outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Approved">Approved</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Denied">Denied</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-600">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
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