import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';
import toast from 'react-hot-toast';

const fetchTurfs = async () => {
  const response = await axiosInstance.get('/api/admin/adminGetAllTurfs');
  console.log(response.data.allTurfs);
  
  return response.data.allTurfs;
};

const deleteTurf = async (turfId) => {
  await axiosInstance.delete(`/api/admin/deleteTurf/${turfId}`);
};

const assignTurfToManager = async ({ turfId, managerId }) => {
  await axiosInstance.post(`/api/admin/assignTurfToManager`, { turfId, managerId });
};

function AdminAllTurfs() {
  const queryClient = useQueryClient();
  const { data: turfs, isLoading, error } = useQuery(['turfs'], fetchTurfs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTurfId, setSelectedTurfId] = useState(null);
  const [managerId, setManagerId] = useState('');

  const deleteMutation = useMutation(deleteTurf, {
    onSuccess: () => {
      queryClient.invalidateQueries(['turfs']);
      toast.success('Turf deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete turf.');
    },
  });

  const assignMutation = useMutation(assignTurfToManager, {
    onSuccess: () => {
      queryClient.invalidateQueries(['turfs']);
      setIsModalOpen(false);
      toast.success('Turf assigned to manager successfully!');
    },
    onError: () => {
      toast.error('Failed to assign turf.');
    },
  });

  const handleAssignClick = (turfId) => {
    setSelectedTurfId(turfId);
    setIsModalOpen(true);
  };

  const handleAssignSubmit = () => {
    assignMutation.mutate({ turfId: selectedTurfId, managerId });
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 min-h-screen text-accent">
      <h1 className="text-3xl font-bold text-accent mb-8">All Turfs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {turfs.map((turf) => (
          <div
            key={turf._id}
            className="border border-accent rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl"
          >
            <img
              src={turf.imgLink}
              alt={turf.name}
              className="rounded-lg mb-4 h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{turf.name}</h3>
            <p className=" mb-4">Location: {turf.city}</p>
            <p className=" mb-4">Rent :  ₹ {turf.rent}</p>
            <p className=" mb-4">Turf id : {turf._id}</p>
            <div className="mb-4">
             {turf.slots.map((slot, index) => (
                  <p key={index}>
                    Slot {index + 1} : {slot.timeRange}
                  </p>
              ))}
             </div>



            <button
              onClick={() => handleAssignClick(turf._id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-2 hover:bg-blue-700 transition duration-200"
            >
              Assign to Manager
            </button>

            <button
              onClick={() => deleteMutation.mutate(turf._id)}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Turf
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Assign Turf to Manager</h2>
            <input
              type="text"
              placeholder="Enter Manager ID"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-6"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAssignSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2"
              >
                Assign
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAllTurfs;
