// ParentComponent.jsx
import React, { useState, useEffect } from 'react';
import AddPetModal from './AddPetModal';

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://retoolapi.dev/rUAMFx/data';

  // Fetch existing pets when component mounts
  useEffect(() => {
    fetchPets();
  }, []);

  // Function to fetch pets from API
  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to save a new pet to API
  const handleSavePet = async (pet) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: pet.type,
          name: pet.name
        }),
      });

      if (response.ok) {
        // After successful save, refresh the pet list
        fetchPets();
      } else {
        console.error("Failed to save pet to API");
      }
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Pets</h1>
      
      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add New Pet
      </button>
      
      {/* Display the list of pets */}
      <div className="mt-6">
        {loading ? (
          <p>Loading pets...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pets.length > 0 ? (
              pets.map(pet => (
                <div key={pet.id} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold">{pet.name}</h3>
                  <p className="text-gray-600 capitalize">{pet.type}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No pets added yet. Add your first pet!</p>
            )}
          </div>
        )}
      </div>
      
      <AddPetModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={handleSavePet}
      />
    </div>
  );
};

export default ParentComponent;