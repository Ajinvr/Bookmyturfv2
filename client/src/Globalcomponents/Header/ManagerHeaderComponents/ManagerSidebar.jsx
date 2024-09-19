import React, { useState } from 'react';
import handburgericon from '../../../assets/hbicon.svg';
import Theme from './Theme';
import NavigateLink from './NavigateLink';
import Login from './Login';

const ManagerSidebar = () => {
  
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
            <NavigateLink text="All Bookings" path="/manager/assigneTurfBookings" />
            <hr/>
            <NavigateLink text="All Turfs" path="/manager/assignedTurf" />
            <hr />
            <NavigateLink text="Add Turf" path="/manager/addTurf" />
            <hr /> 
            <Login />
        </div>
        ) :(<> </>)
     }
      
    
    </div>
  );
};

export default ManagerSidebar;
