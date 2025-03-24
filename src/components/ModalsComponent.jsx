import React from 'react';
import sample1 from "../assets/refund/image15.png";
import sample2 from "../assets/refund/image16.png"; 
import sample3 from "../assets/refund/image17.png"; 
import sample4 from "../assets/refund/image18.png";
import product from "../assets/refund/image14.png";

const ModalsComponent = ({ 
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
  
  // Details Modal Content
  const renderDetailsModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl z-10 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Return Details</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-gray-600 text-left pl-2 mb-4">Customer and products details return</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <div className="flex flex-col ml-2">
                    <div className="border-b border-gray-300 justify-items-start py-2">
                      <p className="font-medium text-md">{selectedItem.Customer_Name}</p>
                      <p className="text-sm text-gray-600">{selectedItem.Date_Purchased}</p>
                    </div>
                    <div className="py-2">
                      <p className="text-sm text-left">
                        <span className="font-medium text-gray-500">Phone:</span> (555) 123-4567
                      </p>
                      <p className="text-sm text-left">
                        <span className="font-medium text-gray-500">Address:</span> Brgy. Don Bosco, Parañaque City
                      </p>
                    </div>
                  </div>
                  
                  {/* Product Info - Collapsible */}
                  <div className="bg-[#EEEEEF] p-3 rounded-md">
                    <div 
                      className="flex justify-between items-center cursor-pointer" 
                      onClick={() => setIsProductExpanded(!isProductExpanded)}
                    >
                      <p className="font-medium">Product Info</p>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform ${isProductExpanded ? 'transform rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* First product always visible */}
                    <div className="py-2 my-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
                          <img src={product} alt="Product" className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pedigree Beef</p>
                          <div className="flex justify-between text-xs">
                            <span>Qty: 1</span>
                            <span>₱ 150</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional products shown when expanded */}
                    {isProductExpanded && (
                      <div className="pb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
                            <img src={product} alt="Product" className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Pedigree Beef</p>
                            <div className="flex justify-between text-xs">
                              <span>Qty: 1</span>
                              <span>₱ 150</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-medium mt-2">
                      <span>Total</span>
                      <span>₱ 300</span>
                    </div>
                  </div>
                  
                  {/* Reason for Return - Full width */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-left pl-2">Reason for Return</label>
                    <textarea className="w-full p-3 border border-gray-300 rounded resize-none" rows="2" value="Item Damage" readOnly></textarea>
                  </div>
                </div>
                
                {/* Proof Images - Full width */}
                <div className="mt-3 mb-2">
                  <p className="block text-sm font-medium mb-1 text-left pl-2">Proof of Return Item</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <img src={sample1} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample2} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample3} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                    <img src={sample4} alt="Return proof" className="w-24 h-20 object-cover rounded-md" />
                  </div>
                </div>
              </div>
              
              {/* Stepper - Right Column */}
              <div className="border-gray-200 pl-4 pr-2 py-4 flex items-start">
                <div className="w-full">
                  {statusItems.map((item, index) => (
                    <div className="flex cursor-pointer hover:bg-gray-50 rounded" key={index} onClick={() => console.log(`Status clicked: ${item.status}`)}>
                      <div className="flex flex-col items-center mr-3">
                        {/* Vertical line above circle */}
                        <div 
                          className={`w-px h-4 ${index === 0 ? 'opacity-0' : item.highlight ? 'bg-blue-400' : index === statusItems.length - 2 ? 'bg-orange-500' : 'bg-gray-300'}`} 
                        />
                        
                        {/* Circle */}
                        <div>
                          {item.active ? (
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-4 h-4 border rounded-full border-gray-300 bg-white"></div>
                          )}
                        </div>
                        
                        {/* Vertical line below circle */}
                        <div 
                          className={`w-[1px] h-4 ${index === statusItems.length - 1 ? 'opacity-0' : index === statusItems.length - 2 ? 'bg-orange-500' : index === 2 ? 'bg-blue-400' : 'bg-gray-300'}`} 
                        />
                      </div>
                      
                      <div className="flex flex-col py-1">
                        <p className={`text-sm font-medium ${item.active ? 'text-orange-500' : 'text-gray-600'}`}>
                          {item.status}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Status Modal Content
  const renderStatusModal = () => {
    if (!selectedItem) return null;

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

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom sm:align-middle sm:max-w-lg sm:w-full">
          {modalType === "details" ? renderDetailsModal() : renderStatusModal()}
        </div>
      </div>
    </div>
  );
};

export default ModalsComponent;