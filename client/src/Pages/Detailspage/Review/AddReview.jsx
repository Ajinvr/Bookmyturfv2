import React, { useState } from 'react';

function AddReview() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ review, rating });
    setReview('');
    setRating(0);
    setFormVisible(false); 
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className='mt-4'>
      {!isFormVisible ? (
        <button className='text-accent font-bold border border-accent p-2 rounded-lg' onClick={() => setFormVisible(true)}>Write a review</button>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className=''>
            <div>
            <label className='text-accent'>Rating</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: star <= rating ? 'Gold' : '#949494',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className='flex justify-center'>
              <textarea id="review" onChange={(e) => setReview(e.target.value)} rows="4" placeholder='write your review' className='w-screen outline-none border border-accent p-2 rounded-lg'/>
            </div>
            <div className='flex'>
                 <button className='bg-accent w-screen text-secondary p-2 rounded-lg mt-4 font-bold' type="submit">Submit</button>
            </div>
           
          </form>
        </div>
      )}
    </div>
  );
}

export default AddReview;
