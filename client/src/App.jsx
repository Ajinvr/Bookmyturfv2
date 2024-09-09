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
                <Header/>
                      <Toaster position="top-right" reverseOrder={false}/>  
                            <Routes>
                                  <Route path="/" element={<Home/>} />
                                  <Route path="/details/:id" element={<DetailsPage/>} />
                                  
                                  <Route path="/login" element={<Login/>} />
                                  <Route path="/signup" element={<Signup/>} />

                                  <Route path="/profile" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  
                                  <Route path="/admin/allUsers" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/admin/allMangers" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/admin/allOrders" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/admin/allTurf" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/admin/addTurf" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                          
                                  <Route path="/manager" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/manager/Allorders" element= {<Protectedroute> <Profile/> </Protectedroute>} />
                                  <Route path="/manager/AddTurf" element= {<Protectedroute> <Profile/> </Protectedroute>} />

                                  <Route path="/*" element={<div className='h-screen flex justify-center items-center'>
                                                                 <h1 className='text-5xl text-red-800 font-extrabold uppercase'>404 not found</h1>
                                                            </div>
                                                          }/>

                            </Routes>
                <Footer/>
        </Router>
  )
}

export default App