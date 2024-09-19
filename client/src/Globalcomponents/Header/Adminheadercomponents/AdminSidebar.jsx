import React, { useState } from 'react'
import NavigateLink from '../ManagerHeaderComponents/NavigateLink';
import handburgericon from '../../../assets/hbicon.svg';
import Theme from '../ManagerHeaderComponents/Theme';
import Login from '../ManagerHeaderComponents/Login';

function AdminSidebar() {

        const [isOpen, setIsOpen] = useState(false);
      
        const toggleSidebar = () => {
          setIsOpen(!isOpen);
        };
      

  return (
    <div className="relative text-white ">
      <button onClick={toggleSidebar} className="w-5">
        <img src={handburgericon} alt="menu" />
      </button>

     { isOpen ? (
            <div onMouseLeave={toggleSidebar} className=' absolute bg-primary p-4 h-screen -right-4 w-screen md:w-80 mt-3'>
            <Theme />
            <hr/>
            <NavigateLink text="All Bookings" path="/admin/allTurfBookings" />
            <hr/>
            <NavigateLink text="All Users" path="/admin/allUsers" />
            <hr/>
            <NavigateLink text="Add Turf" path="/admin/addTurf" />
            <hr />
            <NavigateLink text="All Turfs" path="/admin/allTurf" />
            <hr />
            <NavigateLink text="Add Turf" path="/admin/addTurf" />
            <hr /> 
            <Login />
        </div>
        ) :(<> </>)
     }
      
    
    </div>
  )
}

export default AdminSidebar