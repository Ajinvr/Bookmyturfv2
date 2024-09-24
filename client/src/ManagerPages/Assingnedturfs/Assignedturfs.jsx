import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from "../../Globalcomponents/Loader/Loader";
const fetchAssignedTurfs = async () => {
  const response = await axiosInstance.get('/api/manager/getManagerAssignedTurfs');
  return response.data.assignedTurfs; 
};

function AssignedTurfs() {
  const { data, isLoading, isError } = useQuery('assignedTurfs', fetchAssignedTurfs);
  const [response, setResponse] = useState([]);

  React.useEffect(() => {
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

  return (
    <div className='text-accent p-4'>
      {response.length === 0 ? (
        <div className='h-screen flex justify-center items-center text-2xl'>No assigned turfs available.</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {response.map((turf) => (
            <div key={turf._id} className='border border-accent rounded-lg shadow-md p-4'>
              <img src={turf.imgLink} alt={turf.name} className='w-full h-40 object-cover rounded-t-lg' />
              <div className='mt-4'>
                <h2 className='text-xl font-semibold'>{turf.name}</h2>
                <p>Rent: ₹ {turf.rent}</p>
                <p>Size: {turf.size}</p>
                <p>Address: {turf.address}</p>
                <p>Pincode: {turf.pincode}</p>
                <div className='mt-2'>
                  <strong>Slots:</strong>
                  <ul>
                    {turf.slots.map((slot) => (
                      <li key={slot._id}>
                        {slot.timeRange}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignedTurfs;
