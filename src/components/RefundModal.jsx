// src/components/RefundModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerInfo from './modal-elements/CustomerInfo';
import ProductInfo from './modal-elements/ProductInfo';
import ProofImages from './modal-elements/ProofImages';
import StatusStepper from './modal-elements/StatusStepper';
import StatusModal from './StatusModal';
import { FaCircleExclamation } from "react-icons/fa6";

const RefundModal = ({
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
  // Handle closing with animation
  const handleClose = () => {
    setShowModal(false);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.75 }
  };

  const modalVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 350 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } }
  };

  const renderDetailsModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 bg-opacity-50">
        <motion.div 
          className="bg-white rounded-lg shadow-xl w-full max-w-[100dvh] z-10 overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center p-4 border-gray-200">
            <div className="text-[#6E6F78] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
              <FaCircleExclamation className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold font-montserrat text-gray-800 pl-4">
              Return Details
            </h3>
            <button
              onClick={handleClose}
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-left pl-2">Reason for Return</label>
                    <textarea className="w-full p-3 border border-gray-300 rounded resize-none" rows="2" value="Item Damage" readOnly></textarea>
                  </div>
                </div>
                <ProofImages />
              </div>
              
              <div className='my-auto'>
                <StatusStepper statusItems={statusItems} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderStatusModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 bg-opacity-50">
        <motion.div 
          className="bg-white rounded-lg shadow-xl w-full max-w-lg z-10 overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <StatusModal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setShowModal={handleClose}
            updateStatus={updateStatus}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div 
              className="fixed inset-0" 
              aria-hidden="true"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div 
                className="absolute inset-0 bg-gray-500" 
                onClick={handleClose}
              ></div>
            </motion.div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom sm:align-middle sm:w-full">
              {modalType === "details" ? renderDetailsModal() : renderStatusModal()}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RefundModal;