
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader'
import Seachicon from '../../assets/searchicon.svg'


const fetchAllTurfs = async () => {
  const response = await axiosInstance.get('/api/admin/adminGetAllBookings');
  return response.data.allOrders; 
};

function AdminAllOrders() {

const { data, isLoading, isError } = useQuery('fetchAllTurfs', fetchAllTurfs);
const [response, setResponse] = useState([])

useEffect(() => {
  if (data) {
    setResponse(data);
  }
}, [data]);

if (isLoading) {
  return <Loader/>;
}

if (isError) {
  return <div>Error fetching data.</div>;
}



  async function cancelBooking(e) {
    
    const parentElement = e.target.parentElement;
      const id = parentElement?.id; 
      
      try {
        const response = await axiosInstance.post(`/api/manager/cancelBooking/${id}`);
        let latestdata = await fetchAllTurfs()
        setResponse(latestdata)
        toast.success('Booking Cancelled Successful');
      } catch (error) {
        toast.error('Cancelling Booking failed');
      }
  
    }
  
  return (
    <div className='text-accent'>
     
     <div className='h-12 bg-primary mb-5 flex justify-start items-center'>

        <div className='flex items-center bg-white px-2 rounded-lg max-w-52 h-8 ml-2'>
             <input
               type="text"
               placeholder="Search"
               className='outline-none border-0 p-1 text-black rounded w-40'
             />
             <img  className='h-5 cursor-pointer' src={Seachicon} alt="Search" />
        </div>
     
    </div>

      {response.length === 0 ? (
        <div>No turf bookings available.</div>
      ) : (
        <div className='px-5'>
          {response.slice().reverse().map((booking, index) => (
            <div id={booking._id} key={booking._id} className='border border-accent rounded-lg shadow-md p-4 flex flex-wrap gap-4 mb-4'>
              <h2 className='text-xl font-semibold'>{index + 1} ) </h2>
              <h2 className='text-xl font-semibold'>Booking ID: {booking._id}</h2>
              <p><strong>User ID:</strong> {booking.userId}</p>
              <p><strong>Turf ID:</strong> {booking.turfId}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookingdate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status || 'Not Available'}</p>
              <br />
              <p><strong></strong> Booked Slots : </p>
              <div className='flex flex-wrap'>
                {booking.timeRange && booking.timeRange.length > 0 ? (
                  booking.timeRange.map((time, index) => (
                    <p key={index}>{time} ,</p>
                  ))
                ) : (
                  <p>No slots available</p>
                )}
              </div>
              
              <br />
              {booking.status == 'cancelled' ?(
                <p className='border p-2 bg-red-800 w-full text-center text-white cursor-pointer rounded-lg'>
                Cancelled
                </p>
              ):(
                <p onClick={cancelBooking} className='border p-2 bg-red-700 w-full text-center rounded-lg text-white cursor-pointer'>
                Cancel Booking
              </p>
              )

              }
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminAllOrders







