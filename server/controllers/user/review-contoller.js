import { review } from '../../db/models/reviewsModel.js';

// get reviews based on turfId ===========
export const getReviews = async (req, res) => {
  const { id } = req.params

  const turfId = id
  
  if (!turfId) return res.status(400).json({ msg: "Turf ID is required", ts: "error" });

  try {
    const reviews = await review.find({ turfId });

    if (!reviews) {
      return res.status(404).json({ msg: "No reviews found", ts: "error" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};


// add review ==========
export const addReview = async (req, res) => {
  const { rating, description, turfId } = req.body;

  const {id,email} = req.user;

  try {
    await review.create({ email,turfId, userid:id, rating, description});
    return res.status(201).json({ msg: "Review added successfully", ts: "success" });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};



// delete review ===========
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  
  if (!reviewId) return res.status(400).json({ msg: "Review ID is required", ts: "error" });
    
  try {
    const reviewToDelete =  await review.findByIdAndDelete(reviewId);
    
    if (!reviewToDelete) {
      return res.status(404).json({ msg: "Review not found", ts: "error" });
    }

    return res.status(200).json({ msg: "Review successfully deleted", ts: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", ts: "error" });
  }
};
