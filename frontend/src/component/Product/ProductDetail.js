import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActon";
import MetaData from "../layout/MetaData";
import "./ProductDetail.css";
import { Rating as ReviewRating } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard.js";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
import { MdDelete } from "react-icons/md";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const paramId = useParams().id;

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(paramId, quantity));
    alert("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = {
      rating: rating,
      comment: comment,
      productId: paramId,
    };

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(paramId));
  }, [dispatch, paramId, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <div className="mainContainer">
            <div className="leftContainer">
              <Carousel fade>
                {product.images &&
                  product.images.map((item, i) => (
                    <Carousel.Item>
                      <img
                        className="CarouselImage"
                        src={item.url}
                        alt={`${i} item`}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="rightContainer">
              <div className="heading">
                <h3>{product.name}</h3>
                <h6>{`#${product._id}`}</h6>
              </div>
              <div className="price">
                <h1>₹ {product.price} </h1>
              </div>
              <div className="rating">
                <ReviewRating
                  {...options}
                  size="large"
                  className="ratingComponent"
                />
                <span className="productCardSpan">
                  ({product.numofreviews} Reviews)
                </span>
              </div>
              <div className="cartSection">
                <div className="quantity">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <div className="addCartBtn">
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="stockStatus">
                <p>
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {" "}
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}{" "}
                  </b>
                </p>
              </div>
              <div className="description">
                <b> Description : </b>
                <p> {product.description} </p>
              </div>
              <div className="submitRevBtn">
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
            className="submitDialogBox"
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <ReviewRating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                className="ratingSection"
                color="green"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <div key={review._id} className="reviewcontainer">
                    <ReviewCard review={review} productId={product._id} />
                  </div>
                ))}
            </div>
          ) : (
            <div className="noReviews">
              {" "}
              <p> No Reviews Yet </p>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
