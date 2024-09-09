import React from 'react'
import Carousel from './components/Carousel'

import Card from './components/Card'

function Home() {
  return (
    <div>
        <Carousel/>
          <h1 className='text-3xl font-extrabold ml-3 text-accent'>Near you</h1>
        <Card/>
    </div>
  )
}

export default Home