import React from "react";
import UserInfo from "./modal-elements/UserInfo";
import { FaUserLarge } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const UserManagementModal = ({ showModal, setShowModal, selectedUser }) => {
  if (!showModal || !selectedUser) return null;

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
        <div className="flex items-center p-4">
          <div className="text-[#00AC4F] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
            <FaCircleExclamation className="text-lg" />
          </div>
          <h3 className="text-lg font-semibold font-montserrat text-gray-800 pl-4">
            Set Status of this User
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
          Configure the status of this user
        </p>

        <div className="p-4 space-y-4">
          {/* Customer Name */}
          <div className="bg-gray-100 flex items-center p-4 rounded-lg">
            <FaUserLarge className="text-2xl text-gray-600 mr-3" />
            <span className="text-gray-800 ml-2 font-medium font-montserrat text-md uppercase">
              {selectedUser.First_Name} {selectedUser.Last_Name}
            </span>
          </div>

          {/* Email */}
          <div className="bg-gray-100 flex items-center p-4 rounded-lg">
            <MdEmail className="text-2xl text-gray-600 mr-3" />
            <span className="text-gray-800 ml-2 font-medium font-montserrat text-md uppercase">
              {selectedUser.Email}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-left px-4 mb-4 font-medium font-montserrat">
          Is this a verified account?
        </p>
        <div className="flex px-4 mb-4">
          <div className="w-1/2 flex space-x-4">
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 rounded-lg">
              <label className="mr-2 font-montserrat">
                <input
                  type="radio"
                  name="verified"
                  value="yes"
                  className="mr-1"
                />
                Yes
              </label>
            </div>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 rounded-lg">
              <label className="font-montserrat">
                <input
                  type="radio"
                  name="verified"
                  value="no"
                  className="mr-1"
                />
                No
              </label>
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

export default UserManagementModal;
