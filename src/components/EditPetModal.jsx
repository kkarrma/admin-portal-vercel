import React, { useEffect } from 'react';
import PetTypeSelect from './modal-elements/PetTypeSelect';
import PetNameInput from './modal-elements/PetNameInput';
import { FaPaw, FaTrash } from 'react-icons/fa';
import { X, Edit } from 'lucide-react';

const EditPetModal = ({
  showModal,
  setShowModal,
  petDetails,
  setPetDetails,
  onSave,
  onDelete
}) => {
  // If showModal is false, don't render anything
  if (!showModal) {
    return null;
  }

  const handleSave = () => {
    if (petDetails.type && petDetails.name) {
      onSave(petDetails);
      setShowModal(false);
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this pet breed?')) {
      onDelete(petDetails.id);
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-900/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Edit className="text-blue-600 text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Pet Breed
            </h3>
          </div>
          <button onClick={() => setShowModal(false)}>
            <X className="text-gray-600" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          <PetTypeSelect petDetails={petDetails} setPetDetails={setPetDetails} />
          <PetNameInput petDetails={petDetails} setPetDetails={setPetDetails} />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between p-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaTrash size={14} />
            Delete
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPetModal;