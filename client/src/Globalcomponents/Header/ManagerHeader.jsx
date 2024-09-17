import React from 'react'
import ManagerSidebar from './ManagerHeaderComponents/ManagerSidebar'

function ManagerHeader() {
  return (
    <div className='sticky top-0 left-0 bg-primary p-2 w-screen border-b-2 border-white '>
    <div className='flex justify-between'>
      <div className='flex font-extrabold text-white text-2xl'>
       <h1> Dashboard </h1>
      </div>
      <div className='flex gap-5 mr-2 sb items-center'>
        <ManagerSidebar/>
      </div>
    </div>
    
  </div>
  )
}

export default ManagerHeader