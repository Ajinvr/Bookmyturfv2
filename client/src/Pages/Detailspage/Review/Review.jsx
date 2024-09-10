import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Utils/axiosInstance';
import AddReview from './AddReview';
import { useParams } from 'react-router-dom';

function Review() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
   
    const fetchReviews = async () => {
       try {
           const response = await axiosInstance.get(`/api/turf/getreview/${id}`);
           setReviews(response.data);
       }catch (error) {
        console.log('Error fetching reviews:', error);
       }
      };
        fetchReviews();
    }, [id]);

  return (
    <div className="p-6">
      <div className="flex-wrap">
        <h1 className="text-3xl text-accent font-bold p-1">Reviews</h1>
        <AddReview />
      </div>
      {reviews.length === 0 ? (
        <p className="mt-6 text-center text-accent text-xl">No reviews yet...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="text-accent rounded-lg shadow-md border-accent border-2 p-4">
              <h2 className="text-xl font-semibold">{review.email}</h2>
              <div className="flex items-center">
                <span className="text-yellow-500 text-lg">{'★'.repeat(review.rating)}</span>
                <span className="ml-2">({review.rating})</span>
              </div>
              <p className="text-sm mt-2">{review.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Review;
