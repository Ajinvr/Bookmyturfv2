import React from 'react'
import { Link } from 'react-router-dom'

function Notdound() {
  return (
    <div className='h-screen flex justify-center items-center font-bold'>
         <div>
              <h1 className='text-5xl text-red-600 font-extrabold uppercase'>404 not found</h1>
              <div className='w-full px-20 mt-2'>
                <Link to='/'>
                   <button className='bg-accent h-10 w-full rounded-lg hover text-secondary'>GO HOME</button>
                </Link>
              </div>
              
         </div> 
    </div>
  )
}

export default Notdound