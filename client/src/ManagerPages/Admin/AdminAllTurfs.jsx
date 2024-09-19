import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';
import toast from 'react-hot-toast';

const fetchTurfs = async () => {
  const response = await axiosInstance.get('/api/admin/adminGetAllTurfs');
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
      toast.success('Turf assigned to manager successfully!');
    },
    onError: () => {
      toast.error('Failed to assign turf.');
    },
  });

  const handleAssignClick = (turfId) => {
    const managerId = window.prompt('Enter Manager ID:');
    if (managerId) {
      assignMutation.mutate({ turfId, managerId });
    } else {
      toast.error('Manager ID is required.');
    }
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
            <p className="mb-4">Location: {turf.city}</p>
            <p className="mb-4">Rent: ₹{turf.rent}</p>
            <p className="mb-4">Turf ID: {turf._id}</p>
            <p className="mb-4">Manager Id : {turf.assignedTo}</p>
            <div className="mb-4">
              {turf.slots.map((slot, index) => (
                <p key={index}>
                  Slot {index + 1}: {slot.timeRange}
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
    </div>
  );
}

export default AdminAllTurfs;
