import React from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';


const fetchOrders = async () => {
  const response = await axiosInstance.get('/api/profile'); 
  return response.data;
};

function Orders() {
  const { data, isLoading, error } = useQuery('orders', fetchOrders);


  const orders = data?.orderHistory || [];
  const turfs = data?.turfs || [];

  if (isLoading) return <Loader />;
  if (error) return <div className='text-red-500'>Error: {error.message}</div>;


  const turfMap = new Map(turfs.map(turf => [turf._id, turf]));

  if (orders.length === 0) {
    return <div className='text-center text-2xl min-h-10 text-accent p-5'>No Bookings yet...</div>;
  }

  return (
    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {orders.map(order => {
        const turf = turfMap.get(order.turfId); 
        return (
          <div
            key={order._id}
            className='border border-accent rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl'
          >
            <h3 className='text-l font-semibold mb-2'>Order ID: {order._id}</h3>

            {turf ? (
              <>
                <img
                  src={turf.imgLink}
                  alt={turf.name}
                  className='rounded-lg mb-4 h-48 w-full object-cover'
                />
                <p className='mb-4'>Turf: {turf.name}</p>
                <p className='mb-4'>Rent: ₹ {turf.rent}</p>
              </>
            ) : (
              <p className='mb-4'>Turf details not available</p>
            )}
            <p className='mb-4'>Date: {new Date(order.bookingdate).toLocaleDateString()}</p>
            <p className='mb'>Time Ranges</p>
            <p className='mb-4'>{order.timeRange.join(', ')}</p>
            <p className='mb-4'>Amount: ₹ {order.billAmount}</p>
            <p className='mb-4'>Status: {order.status}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
