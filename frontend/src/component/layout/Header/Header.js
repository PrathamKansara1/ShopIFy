import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import {
  FaShoppingCart,
  FaShoppingBag,
  FaUserAlt,
  FaSearch,
} from "react-icons/fa"
import { useSelector } from "react-redux";
import logoimg from '../../../Images/ShopIFyLogo.png'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="Nav">
      <div className="left flexBox">
        <div className="logoContainer">
          <img src={logoimg} alt="" />
        </div>
        <li>
          <Link to="/">Home</Link>
          <span>|</span>
        </li>
        <li>
          <Link to="/Products">Products</Link>
          <span>|</span>
        </li>
        <li id="About">
          <Link to="/about">About</Link>
          <span>|</span>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </div>
      <div className="center flexBox">
        <li>
          <Link to="/cart" className="cartbtn flex">
            Cart ({cartItems.length})<FaShoppingCart className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/login" className="flex">
            Profile <FaUserAlt className="icon" />
          </Link>
        </li>
      </div>
      <div className="right flexBox">
        <li>
          <Link to="/search" className="flex">
            Search <FaSearch className="icon" />
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Header;
