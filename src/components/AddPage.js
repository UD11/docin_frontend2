import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPage = () => {
  const [authorName, setAuthorName] = useState('');
  const [institution, setInstitution] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsSaving(true);
    const data = {
      title,
      description,
      author: authorName,
      institution_name: institution,
      link,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/pdfs/', data);
      console.log('PDF added successfully:', response.data);
      setShowSuccessModal(true);
      setTimeout(() => {
        setIsSaving(false);
        setShowSuccessModal(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error adding PDF:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-[#EEF1FF] bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#D2DAFF] p-6 rounded-lg shadow-lg w-4/5 h-4/5">
        <h2 className="text-3xl font-semibold mb-6 font-mono">Add Entry</h2>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 ">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-[#EEF1FF]"
          />
        </div>
         <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-[#EEF1FF]"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-[#EEF1FF]"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
            Institution
          </label>
          <input
            type="text"
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Enter institution"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-[#EEF1FF]"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
            Link
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-[#EEF1FF]"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`${
              isSaving ? 'bg-blue-500' : 'bg-[#B1B2FF] hover:bg-[#EEF1FF] hover:text-[#2A2F4F]'
            } text-white px-6 py-3 rounded-lg mr-2 transition-colors duration-300`}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AlertsSuccess />
          </div>
        </div>
      )}
    </div>
  );
};

const AlertsSuccess = () => {
  return (
    <div className="text-center">
      <svg
        className="hi-solid hi-check-circle w-12 h-12 mx-auto text-emerald-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <h3 className="text-lg font-semibold mb-2">Project was added successfully!</h3>
      <p className="text-gray-600">
        Manage all available projects from your{' '}
        <a
          className="underline text-emerald-600 hover:text-emerald-400"
          href="#"
        >
          personal dashboard
        </a>
        .
      </p>
    </div>
  );
};

export default AddPage;
