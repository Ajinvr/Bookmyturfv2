import React from 'react';
import NavigateLink from './NavigateLink';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Utils/Redux/Features/authSlice';
import { toast } from 'react-hot-toast';

function Login() {

  const notify = (msg, status) => {
    status === 'success' ? toast.success(msg) : toast.error(msg);
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  async function handleClick() {
    try {
    let response = await axiosInstance.post('/api/userLogout');
      
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      userdata.isAuthenticated = false;
      localStorage.setItem('userdata', JSON.stringify(userdata));
      
      dispatch(logout());

      notify(response.data.msg, response.data.ts);

      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.msg || 'An unexpected error occurred';
      const ts = error.response?.data?.ts || 'error';
      notify(msg, ts);
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
