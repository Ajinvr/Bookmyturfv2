import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import toast from 'react-hot-toast';

const fetchManagers = async () => {
  const response = await axiosInstance.get('/api/admin/adminGetAllManagers');
  return response.data.allManagers;
};

const deleteManager = async (managerId) => {
  try {
    await axiosInstance.delete(`/api/admin/adminDeleteManager/${managerId}`);
    toast.success('Manager Removed successfully!');
  } catch (error) {
    toast.error('Failed to Remove manager.');
    throw error;
  }
};

function AdminAllManagers() {
  const queryClient = useQueryClient();
  const { data: managers, isLoading, error } = useQuery(['managers'], fetchManagers);
  const mutation = useMutation(deleteManager, {
    onSuccess: () => {
      queryClient.invalidateQueries(['managers']);
    },
    onError: () => {
      toast.error('Failed to delete manager.');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='text-accent'>
      <h1 className='text-xl font-bold ml-2'>All Managers</h1>
      <div className='flex flex-wrap'>
        {managers.map((manager,index) => (
          <div key={manager._id} className='border p-2 flex flex-wrap items-center gap-4 rounded m-2 w-screen justify-evenly'>
           <h3><strong>{index+1} ) </strong></h3> 
            <h3><strong>User id : </strong> {manager._id} </h3> 
            <h3><strong>User email : </strong> {manager.email} </h3>
            <h3><strong>Role : </strong> {manager.role} </h3>
            <button onClick={() => mutation.mutate(manager._id)} className='bg-red-700 p-2 rounded'> Remove </button>
  
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAllManagers;
