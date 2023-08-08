// AddButton.js
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';

const AddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  // Check if the current path is '/add'
  const isAddPage = location.pathname === '/add';

  if (isAddPage) {
    return null; // Don't render the button on the '/add' page
  }

  return (
    <button
      onClick={handleAddButtonClick}
      className="fixed bottom-16 right-16 w-20 h-20 bg-[#B1B2FF] text-white rounded-full shadow-lg flex items-center justify-center"
    >
      <PlusIcon className="w-12 h-12 text-white absolute left-4" />
    </button>
  );
};

export default AddButton;
