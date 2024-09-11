import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/profile/Profile';
import Header from './Globalcomponents/Header/Header';
import Footer from './Globalcomponents/Footer/Footer';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import DetailsPage from './Pages/Detailspage/DetailsPage';
import Protectedroute from "./Utils/Protectedroute";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './Utils/Redux/Features/authSlice';
import ManagerLogin from './Pages/Login/ManagerLogin';
import ManagerSignup from './Pages/Signup/ManagerSignup';
import ManagerHeader from './Globalcomponents/Header/ManagerHeader';
import ManagerProtectedroute from './Utils/ManagerProtectedroute';
import BookingConfirmpage from './Pages/Bookinconfirm/BookingConfirmpage';

function App() {


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mydarktheme';
     document.documentElement.setAttribute('data-theme', savedTheme);
  }, [window.reload]);

 
  const dispatch = useDispatch();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata?.isAuthenticated) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  

  return (
        <Router>
            <Toaster position="top-right" reverseOrder={false}/>  
                    <Routes>    
                        <Route path="/" element={<> <Header/> <Home/> <Footer/> </>} />
                        <Route path="/details/:id" element={ <> <Header/> <DetailsPage/> <Footer/> </>} />
                        <Route path="/details/bookinconfirm/:id" element={ <> <Header/> <BookingConfirmpage/> <Footer/> </>} />
                                  
                        <Route path="/login" element={  <> <Header/> <Login/> <Footer/> </>} />
                        <Route path="/signup" element={  <> <Header/> <Signup/> <Footer/> </>} />
                                  
                        <Route path="/profile" element= {  <> <Header/> <Protectedroute> <Profile/> </Protectedroute> <Footer/> </>} />
                                  
                        <Route path="/managerlogin" element={<ManagerLogin/>} />
                        <Route path="/managersignup" element={<ManagerSignup/>} />

                        <Route path="/manager/assignedTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/manager/assigneTurfBookings" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/manager/addTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                                  
                        <Route path="/admin/allUsers" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/admin/allMangers" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/admin/allTurfBookings" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/admin/allTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                        <Route path="/admin/addTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/> </ManagerProtectedroute>  </>} />
                          

                        <Route path="/*" element={<div className='h-screen flex justify-center items-center'>  <h1 className='text-5xl text-red-800 font-extrabold uppercase'>404 not found</h1></div>}/>

                    </Routes>    
        </Router>
  )
}

export default App