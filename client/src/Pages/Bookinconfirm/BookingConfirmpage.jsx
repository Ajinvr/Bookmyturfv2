import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { setSelectedSlots } from '../../Utils/Redux/Features/slotSlice';
import Loader from '../../Globalcomponents/Loader/Loader'
import axiosInstance from '../../Utils/axiosInstance';
import { loadStripe } from '@stripe/stripe-js';

function BookingConfirmpage() {

  const [isprocessing, setisprocessing] = useState(false)

  let { id } = useParams()
 
  const selectedDate = localStorage.getItem('selectedDate');
  const selectedSlots = useSelector((state) => state.slots.selectedSlots); 
  const dispatch = useDispatch();

  const rent = localStorage.getItem('rent');
  const navigate = useNavigate();
  
  const location = useLocation();
  const previousRoute = location.state?.from;

  const totalAmount = rent * selectedSlots.length;

  const amount = totalAmount*100

  useEffect(() => {
    if (selectedSlots.length === 0) {
      navigate(previousRoute);
    }
  }, [selectedSlots, navigate, location]);

  function handleEdit() {
    dispatch(setSelectedSlots([]));
    navigate(previousRoute);
  }


const stripePromise = loadStripe(import.meta.env.VITE_stripe_publish_key);

async function handleConfirm() {
  try {
    const requestBody = {
      selectedDate,
      selectedSlots,
    };

    let response = await axiosInstance.post('/api/order/checkAvailability', requestBody);
    
    if (response.data.available) {
      const body = {
        id, selectedDate, selectedSlots,amount
      };

      response = await axiosInstance.post('/api/order/create-checkout-session', body);
      
      const { sessionId } = response.data;

      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
console.log(result);

      if (result.error) {
        console.log(result.error.message);
      }
    }

  } catch (error) {
    console.error('Error during payment processing:', error);
  }
}


if (isprocessing) {
  return <Loader/>
}

  return (
    <div className='px-3 py-1 mt-5 md:px-14 md:py-5 text-accent min-h-screen'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl '>Are you sure you want to book on</h1>
        <button onClick={handleEdit} className='bg-accent text-secondary h-8 w-16 rounded-lg font-bold'>Edit</button>
      </div>
      
      <h1 className='font-bold text-xl mt-2'>date: {selectedDate} at time slots</h1>

      <div className='flex flex-wrap mt-6'>
        {selectedSlots.map((slot, index) => (
          <div
            key={index}
            className='mr-2 w-32 rounded-2xl p-2 flex justify-center text-center mb-2 cursor-pointer bg-accent text-secondary font-bold'>
            {slot.timeRange}
          </div>
        ))} 
      </div>

      <h2 className='font-bold text-xl mt-4'>Total Amount: ₹{totalAmount}</h2>

      <button onClick={handleConfirm} className='bg-accent text-secondary py-2 px-4 rounded-lg font-bold text-xl w-full mt-6'>Confirm booking</button>
      <button onClick={handleEdit} className='bg-accent text-red-600 py-2 px-4 rounded-lg font-bold text-xl w-full mt-6'>Cancel</button>
    </div>
  );
}

export default BookingConfirmpage;  