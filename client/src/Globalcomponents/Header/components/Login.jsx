import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NavigateLink from './NavigateLink';
import { useNavigate } from 'react-router-dom';

function Login() {

  let navigate = useNavigate()
 
  const [isauth, setisauth] = useState(false)
  useEffect(() => {
  let userdata = JSON.parse(localStorage.getItem('userdata'));
  if (userdata?.isAuthenticated === true) {
  setisauth(true)
  }else{
    false
  }
  },[])
 
    

  function handleClick() {
      Cookies.remove('token'); 
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      userdata.isAuthenticated = false
      localStorage.setItem('userdata', JSON.stringify(userdata));
      setisauth(false)
      navigate('/')
  }

  return (
    <div>
      {isauth? (
         <div className='p-2' >
        
           <h1 onClick={handleClick}>Logout</h1>
        
       </div>
      ) : (
        <NavigateLink text={'Login'} path={'/login'} />
      )}
    </div>
  );
}

export default Login;
