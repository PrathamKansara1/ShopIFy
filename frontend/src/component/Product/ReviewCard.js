import { Rating } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, deleteReviews } from "../../actions/productActon";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import Profile from "../../Images/Profile.png";

const ReviewCard = ({ review, productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const options = {
    value: parseInt(review.rating),
    readOnly: true,
    precision: 0.5,
    size: window.innerWidth < 600 ? "large" : "small"
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  }

  useEffect(() => {
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      history.push(`/products`);
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, deleteError, history, isDeleted, productId]);

  return (
    <div className="reviewCard">
      <img src={Profile} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
      {user && user.role === "admin" ? (
        <div className="deleteReview" onClick={() => deleteReviewHandler(review._id)}>
          <MdDelete />
        </div>
      ) : (
        []
      )}
    </div>
  );
};

export default ReviewCard;
