// src/components/modal-elements/StatusModal.jsx
import React from 'react';

const StatusModal = ({ selectedItem, setSelectedItem, setShowModal, updateStatus }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl z-10 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Edit User Details</h3>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm text-black font-poppins font-semibold mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedItem.Customer_Name}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins bg-gray-50"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-black font-poppins font-semibold mb-2">
                Date Purchased
              </label>
              <input
                type="text"
                value={selectedItem.Date_Purchased}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins bg-gray-50"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm text-black font-poppins font-semibold mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedItem.Status}
                  onChange={(e) => {
                    setSelectedItem({
                      ...selectedItem,
                      Status: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#808080] font-poppins appearance-none pr-8"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Denied">Denied</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#808080]">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => updateStatus(selectedItem)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
