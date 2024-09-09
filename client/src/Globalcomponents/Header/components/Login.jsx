import React from 'react';
import NavigateLink from './NavigateLink';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Utils/Redux/Features/authSlice';

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  async function handleClick() {
    try {
      await axiosInstance.post('/api/userLogout');
      
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      userdata.isAuthenticated = false;
      localStorage.setItem('userdata', JSON.stringify(userdata));
      
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className='p-2'>
          <h1 className='cursor-pointer' onClick={handleClick}>Logout</h1>
        </div>
      ) : (
        <NavigateLink text={'Login'} path={'/login'} />
      )}
    </div>
  );
}

export default Login;
