// src/components/ProductModal.jsx
import React from 'react';
import CustomerInfo from './modal-elements/CustomerInfo';
import ProductInfo from './modal-elements/ProductInfo';
import ProofImages from './modal-elements/ProofImages';
import StatusStepper from './modal-elements/StatusStepper';
import StatusModal from './StatusModal'; // Import the new StatusModal component
import { FaCircleExclamation } from "react-icons/fa6";

const ProductModal = ({
  showModal,
  setShowModal,
  modalType,
  selectedItem,
  setSelectedItem,
  isProductExpanded,
  setIsProductExpanded,
  updateStatus,
  statusItems
}) => {


  const renderDetailsModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-[95vh] z-10 overflow-hidden">
        <div className="flex items-center p-4 border-gray-200">
          <div className="text-[#6E6F78] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
            <FaCircleExclamation className="text-lg" />
          </div>
          <h3 className="text-lg font-semibold font-montserrat text-gray-800 pl-4">
          Product Details
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
          
          <div className="p-4">
            <p className="text-sm text-gray-600 text-left pl-2 mb-4">Customer and products details return</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <CustomerInfo selectedItem={selectedItem} />
                  <ProductInfo isProductExpanded={isProductExpanded} setIsProductExpanded={setIsProductExpanded} />
                </div>
              </div>
            
              <StatusStepper statusItems={statusItems} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom sm:align-middle sm:max-w-lg sm:w-full">
          {modalType === "details" ? renderDetailsModal() : (
            <StatusModal
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              setShowModal={setShowModal}
              updateStatus={updateStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
