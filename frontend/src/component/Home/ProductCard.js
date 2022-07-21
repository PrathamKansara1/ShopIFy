import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'



const ProductCard = ({product}) => {
  const options = {
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "black",
    size : window.innerWidth < 600 ? 15 : 25,
    value : product.ratings,
    isHalf : true
  }
  return (
    <Fragment>
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} classNames="ReactStar" /> 
          <span className="productCardSpan">
            ({product.numofreviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </Fragment>
  );
};

export default ProductCard;
