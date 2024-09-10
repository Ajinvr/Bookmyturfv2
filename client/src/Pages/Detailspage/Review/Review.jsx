import React from 'react'
import AddReview from './AddReview';

function Review() {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      comment: 'Great experience! The turf was in excellent condition.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      comment: 'Had an amazing time. Highly recommend it!',
      rating: 3,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      comment: 'Good service, but the turf could be improved.',
      rating: 3,
    },
  ];

  return (
    <div className="p-6">
     <div className='flex-wrap'>
     <h1 className="text-3xl text-accent font-bold p-1">
        Reviews
      </h1>
    
      <AddReview/>
    
     </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          
          <div key={review.id} className=" text-accent rounded-lg shadow-md border-accent border-2 p-4">
            <h2 className="text-xl font-semibold">{review.name}</h2>
           
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">{'★'.repeat(review.rating)}</span>
              <span className=" ml-2">({review.rating})</span>
            </div>
            
             <p className="text-sm  mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review
