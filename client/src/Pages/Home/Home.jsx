import React, { useEffect } from 'react'
import Carousel from './components/Carousel'
import Card from './components/Card'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSlots } from '../../Utils/Redux/Features/slotSlice';


function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedSlots([]));
  }, [])
  

  return (
    <div>
        <Carousel/>
          <h1 className='text-3xl font-extrabold ml-3 text-accent'>Near you</h1>
        <Card/>
    </div>
  )
}

export default Home