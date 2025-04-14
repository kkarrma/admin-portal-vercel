// AddPetModal.jsx
import React, { useState, useEffect } from 'react';
import PetTypeSelect from './modal-elements/PetTypeSelect';
import PetNameInput from './modal-elements/PetNameInput';

const AddPetModal = ({ showModal, setShowModal, onSave }) => {
  const [petDetails, setPetDetails] = useState({ type: "", name: "" });
  const [isSaving, setIsSaving] = useState(false);
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!showModal) {
      setPetDetails({ type: "", name: "" });
    }
  }, [showModal]);

  const handleSave = async () => {
    // Validate form before saving
    if (!petDetails.type) {
      alert("Please select a pet type");
      return;
    }
    
    if (!petDetails.name || petDetails.name.trim() === "") {
      alert("Please enter a pet name");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Send data to parent for API saving
      await onSave({
        type: petDetails.type,
        name: petDetails.name
      });
      
      // Close modal after successful save
      setShowModal(false);
      setPetDetails({ type: "", name: "" });
    } catch (error) {
      alert("Error saving pet. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Pet</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Type
            </label>
            <PetTypeSelect petDetails={petDetails} setPetDetails={setPetDetails} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Name
            </label>
            <PetNameInput petDetails={petDetails} setPetDetails={setPetDetails} />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isSaving ? "Saving..." : "Save Pet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPetModal;