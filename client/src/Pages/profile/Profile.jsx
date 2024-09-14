import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosInstance';
import pp from "../../assets/image.png";
import Orders from './Orders';
import Loader from '../../Globalcomponents/Loader/Loader'

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('api/profile');
        setProfile(response.data);
       
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div className='text-accent'>
      <h1 className='text-accent text-3xl p-5 font-bold'>Profile</h1>
      
      <div className='flex flex-col items-center'>
        <img
          className='h-24 w-24 rounded-full border border-gray-300'
          src={pp}
          alt="Profile Logo"
        />
        <h2 className='text-2xl mt-2'>{profile.user.email}</h2>
       
      </div>

      <h2 className='text-accent text-2xl p-5 font-bold'>Your Bookings</h2>

      <Orders />
    </div>
  );
}

export default Profile;
