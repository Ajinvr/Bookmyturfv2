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
import Searchpage from './Pages/Seachpage/Searchpage';
import Notdound from './Globalcomponents/notfound/Notdound';
import AddTurf from './ManagerPages/AddTurf/AddTurf';
import EditTurf from './ManagerPages/EditTurf/EditTurf';
import CancelPage from './Pages/Bookinconfirm/CancelPage';
import SuccessPage from './Pages/Bookinconfirm/SuccessPage';
import Assignedturfs from './ManagerPages/Assingnedturfs/Assignedturfs';
import AsignedTurfbookings from './ManagerPages/AsignedTurfbookings/AsignedTurfbookings';
import AdmiHeader from './Globalcomponents/Header/AdmiHeader';
import AdminProtectedRoute from './Utils/AdminProtectedRoute'
import AdminAllManagers from './ManagerPages/Admin/AdminAllManagers';
import AdminAllOrders from './ManagerPages/Admin/AdminAllOrders';
import AdminAllTurfs from './ManagerPages/Admin/AdminAllTurfs';
import AdminAllUsers from './ManagerPages/Admin/AdminAllUsers';

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
                        <Route path="/search/:query" element={ <> <Header/> <Searchpage/> <Footer/> </>} />
                        <Route path="/details/bookinconfirm/:id" element={ <> <Header/> <BookingConfirmpage/> <Footer/> </>} />
                                  
                        <Route path="/login" element={  <> <Header/> <Login/> <Footer/> </>} />
                        <Route path="/signup" element={  <> <Header/> <Signup/> <Footer/> </>} />
                                  
                        <Route path="/profile" element= {  <> <Header/> <Protectedroute> <Profile/> </Protectedroute> <Footer/> </>} />
                                  
                        <Route path="/managerlogin" element={<ManagerLogin/>} />
                        <Route path="/managersignup" element={<ManagerSignup/>} />

                        <Route path="/manager/assignedTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/><Assignedturfs/> </ManagerProtectedroute>  </>} />
                        <Route path="/manager/assigneTurfBookings" element= {<> <ManagerProtectedroute> <ManagerHeader/> <AsignedTurfbookings/>  </ManagerProtectedroute>  </>} />
                        <Route path="/manager/addTurf" element= {<> <ManagerProtectedroute> <ManagerHeader/> <AddTurf/> </ManagerProtectedroute>  </>} />
                                  
                        <Route path="/admin/allUsers" element= {<> 
                                                                <AdminProtectedRoute> 
                                                                  <AdmiHeader/> 
                                                                  <AdminAllUsers/>
                                                                </AdminProtectedRoute>
                                                                </>} 
                        />

                        <Route path="/admin/allMangers" element= {<>
                                                                     <AdminProtectedRoute>
                                                                                     <AdmiHeader/> 
                                                                                     <AdminAllManagers/>
                                                                      </AdminProtectedRoute> 
                                                                  </>}
                        />

                        <Route path="/admin/allTurfBookings" element= {<> 
                                                                       <AdminProtectedRoute> 
                                                                                      <AdmiHeader/>
                                                                                      <AdminAllOrders/>
                                                                        </AdminProtectedRoute>
                                                                        </>
                        } />

                        <Route path="/admin/allTurf" element= {<> 
                                                              <AdminProtectedRoute>
                                                                         <AdmiHeader/>
                                                                         <AdminAllTurfs/>
                                                              </AdminProtectedRoute> 
                                                               </>
                          } />

                        <Route path="/admin/addTurf" element= {<> 
                                                               <AdminProtectedRoute> 
                                                                            <AdmiHeader/>
                                                                                   <AddTurf/>
                                                               </AdminProtectedRoute>
                                                               </>}
                         />

                        <Route path="/admin/editTurf/:id" element= {<>
                                                                    <ManagerProtectedroute>
                                                                                <ManagerHeader/>
                                                                                        <EditTurf/>
                                                                    </ManagerProtectedroute>
                                                                     </>}
                                                                      />
                          
                        <Route path="/cancel" element={<CancelPage/>}/>
                      
                        <Route path="/success" element={<SuccessPage/>}/>
                      
                        <Route path="/*" element={<Notdound/>}/>

                    </Routes>    
        </Router>
  )
}

export default App