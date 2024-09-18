import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="text-gray-700 mt-4">Your payment was not completed</p>
      <button 
        onClick={goHome} 
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
        Go Home
      </button>
    </div>
  );
};

export default CancelPage;
