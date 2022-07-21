import React, { Fragment, useEffect } from "react";
import data from "../Data/Data.json";
import ProductCard from "./ProductCard";
import Slider from "./Slider";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productActon";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  
  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ShopIFy" />
          <Slider start={data.banner.start} />
          <h2 className="homeHeading">Featured Product</h2>
          <div className="featuredProduct container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <h2 className="homeHeading">Latest Product</h2>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
