// modal-elements/PetTypeSelect.jsx
import React from 'react';
import { FaDog, FaCat, FaFish, FaFeatherAlt, FaDragon } from 'react-icons/fa';

const PetTypeSelect = ({ petDetails, setPetDetails }) => {
  const petTypes = [
    { value: "", label: "Select a pet type", icon: null },
    { value: "Dog", label: "Dog", icon: <FaDog /> },
    { value: "Cat", label: "Cat", icon: <FaCat /> },
    { value: "Fish", label: "Fish", icon: <FaFish /> },
    { value: "Bird", label: "Bird", icon: <FaFeatherAlt /> },
    { value: "Exotic", label: "Exotic", icon: <FaDragon /> }
  ];

  const handleChange = (e) => {
    setPetDetails(prev => ({ ...prev, type: e.target.value }));
  };

  return (
    <div className="relative">
      <select
        value={petDetails?.type || ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg bg-white appearance-none pr-8"
      >
        {petTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default PetTypeSelect;