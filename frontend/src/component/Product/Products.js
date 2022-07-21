import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productActon";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@mui/material";
import "./Products.css";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { MdCategory, MdClose, MdMenu } from "react-icons/md";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Electronic",
];

const Products = () => {
  const dispatch = useDispatch();
  const filterContainer = useRef();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    paginationProducts,
  } = useSelector((state) => state.products);
  const keyword = useParams().keyword;

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const CategoryHandler = () => {
    filterContainer.current.classList.add("openCategory");
  };
  const closeBtnHandler = () => {
    filterContainer.current.classList.remove("openCategory");
  };

  let count = paginationProducts;

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />
          <h2 className="productsHeading">Products</h2>
          {window.innerWidth < 600 ? (
            <div className="categoryBtn">
              <p onClick={CategoryHandler}>
                Filter
                <MdCategory />
              </p>
            </div>
          ) : (
            []
          )}

          <div className="productsContainer">
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="filterContainer" ref={filterContainer}>
              {window.innerWidth < 600 ? (
                <MdClose onClick={closeBtnHandler} className="closebtn" />
              ) : (
                []
              )}
              <div className="priceSlider">
                <p className="typography">Price</p>

                <Slider
                  value={price}
                  size="small"
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={250000}
                  isRtl={true}
                />
              </div>

              <ul className="categoryBox">
                <p className="typography">Categories</p>
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    <p>
                      {" "}
                      {category} <FaArrowRight />{" "}
                    </p>
                  </li>
                ))}
              </ul>

              <fieldset>
                <p className="typography" component="legend">
                  Ratings Above
                </p>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
