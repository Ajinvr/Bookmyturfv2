import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';
import toast from 'react-hot-toast';

const fetchUsers = async () => {
  const response = await axiosInstance.get('/api/admin/adminGetAllUsers');
  return response.data.allUsers;
};

const deleteUser = async (userId) => {
  await axiosInstance.delete(`/api/admin/adminDeleteUser/${userId}`);
};

function AdminAllUsers() {
  const queryClient = useQueryClient();
  const { data: users, isLoading, error } = useQuery(['users'], fetchUsers);
  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User removed successfully!');
    },
    onError: () => {
      toast.error('Failed to remove user.');
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 text-accent">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="flex flex-wrap">
        {users.map((user,index) => (
          <div
            key={user._id}
            className="gap-2 md:justify-evenly border border-accent rounded-lg shadow-md p-4 flex flex-wrap w-screen m-2 items-center"
          >
             <h3 className="text-lg font-semibold mb-2">{index+1} ) </h3>
            <h3 className="text-lg font-semibold mb-2"><strong>Userid: </strong>{user._id}</h3>
            <h3 className="text-lg font-semibold mb-4"><strong>email : </strong>{user.email}</h3>
            <button
              onClick={() => mutation.mutate(user._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAllUsers;
