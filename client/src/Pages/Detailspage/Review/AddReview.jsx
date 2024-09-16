import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { setReviews } from '../../../Utils/Redux/Features/reviewSlice';

function AddReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const turfId = id;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isFormVisible, setFormVisible] = useState(false);

  const notify = (msg, status) => {
    status === 'success' ? toast.success(msg) : toast.error(msg);
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/api/turf/getreview/${id}`);
      dispatch(setReviews(response.data)); 
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/addReview', {
        rating,
        description: review,
        turfId,
      });
      await fetchReviews();
      setReview('');
      setRating(0);
      setFormVisible(false);
      notify(response.data.msg, response.data.ts || 'error');
    } catch (error) {
      const msg = error.response?.data?.msg || 'An unexpected error occurred';
      const ts = error.response?.data?.ts || 'error';
      notify(msg, ts);
    }
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  const useAuth = () => {
    if (isAuthenticated) {
      setFormVisible(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='mt-4'>
      {!isFormVisible ? (
        <button className='text-accent font-bold border border-accent p-2 rounded-lg' onClick={useAuth}>
          Write a review
        </button>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='text-accent font-bold p-1'>Rating</label>
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
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                placeholder='Write your review'
                className='w-screen outline-none border border-accent p-2 rounded-lg'
              />
            </div>
            <div className='flex'>
              <button
                className='bg-accent w-screen text-secondary p-2 rounded-lg mt-4 font-bold'
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className='flex'>
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className='bg-accent w-screen text-red-500 p-2 rounded-lg mt-4 font-bold'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddReview;
