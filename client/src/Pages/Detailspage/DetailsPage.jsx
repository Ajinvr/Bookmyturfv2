import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../Utils/axiosInstance';
import Slots from './Slots/Slots';
import toast, { Toaster } from 'react-hot-toast';
import Review from './Review/Review';
import Loader from '../../Globalcomponents/Loader/Loader';

function DetailsPage() {
  const { id } = useParams();
  let navigate = useNavigate()
  const location = useLocation();

  const selectedSlots = useSelector(state => state.slots.selectedSlots);


  const fetchDetails = async () => {
    const response = await axiosInstance.get(`/api/turf/getTurf/${id}`);
    let rent = response.data.turfs.rent
    localStorage.setItem('rent',rent)
    return response.data.turfs;
  };

  const { data: details, isLoading, isError, error } = useQuery(['turfDetails', id], fetchDetails);

  if (isLoading) return <Loader/>;
  if (isError) return <p>{error.message || 'An error occurred'}</p>;

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one slot to book.');
      return;
    }
   
    navigate(`/details/bookinconfirm/${id}`, { state: { from: location.pathname } });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 md:p-8 lg:p-12 text-accent font-bold">
        <div className="flex-1 md:w-1/2">
          <img src={details?.imgLink} alt="Detail" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="flex-1 md:w-1/2 md:pl-8 lg:pl-12 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-accent">{details?.name}</h1>
          <p className="text-sm md:text-base lg:text-lg mb-4">Kottayam</p>
          <p className="text-sm md:text-base lg:text-lg mb-4">₹{details?.rent}/hour</p>

          <p className="text-xl mb-4">Description</p>
          <p className="text-sm md:text-sm lg:text-sm mb-4">{details?.description}</p>

          <button
            className="w-full px-4 py-2 rounded font-bold bg-accent text-secondary cursor-pointer"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>

      <Slots/>
     <Review/>
    </>
  );
}

export default DetailsPage;
