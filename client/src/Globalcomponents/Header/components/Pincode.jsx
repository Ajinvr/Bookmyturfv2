import React, { useEffect, useState } from 'react'



function Pincode() {

    const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '686001');
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      localStorage.setItem('pincode', pincode);
    }, [pincode]);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleOk = () => {
      setIsEditing(false);
      localStorage.setItem('pincode', pincode);
    };
  
    const handleChange = (e) => {
      setPincode(e.target.value);
    };



  return (
    <div className='border-t-2 mt-2 border-white h-5'>
        {isEditing ? (
          <>
            <input
              style={{width:"70px"}}
              className='text-inherit bg-inherit border-none outline-none font-bold  text-white '
              value={pincode}
              onChange={handleChange}
              type='text' 
            />
            <button onClick={handleOk} className='ml-2  text-white'>
              OK
            </button>
          </>
        ) : (
          <div className='flex items-center gap-2'>
               <span className='font-bold text-white'>{pincode}</span>
           
               <img onClick={handleEdit} className='h-3' src="https://res.cloudinary.com/dibkjqtbx/image/upload/v1725377603/staticimages/zkkrklx6rl637nm6oek8.svg" alt="" />
           
          </div>
        )}
      </div>
  )
}

export default Pincode