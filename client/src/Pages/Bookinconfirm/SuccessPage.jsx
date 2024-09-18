import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';

const SuccessPage = () => {
  const navigate = useNavigate();

useEffect(() => {
 async function cr() {
    try {
    await axiosInstance.get('/api/order/create-order')
    } catch (error) {
      console.log(error);
      
    }
  }
  cr()
}, [])


  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-700 mt-4">Thank you for your Booking</p>
      <button 
        onClick={goHome} 
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
        Go Home
      </button>
    </div>
  );
};

export default SuccessPage;
