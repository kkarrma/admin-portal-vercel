// modal-elements/PetNameInput.jsx
import React from 'react';
import { MdPets } from 'react-icons/md';

const PetNameInput = ({ petDetails, setPetDetails }) => {
  const handleChange = (e) => {
    setPetDetails(prev => ({ ...prev, name: e.target.value }));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      <MdPets className="text-blue-600 mr-2" />
      <input
        type="text"
        value={petDetails?.name || ""}
        onChange={handleChange}
        placeholder="Enter pet name"
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default PetNameInput;