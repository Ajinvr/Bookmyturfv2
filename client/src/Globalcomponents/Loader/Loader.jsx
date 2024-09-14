import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader