import React from "react";
import {MdCheckCircle, MdCheckCircleOutline} from "react-icons/md";
import "./orderSuccess.css";
import { Typography } from "@mui/material"; 
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MdCheckCircleOutline />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
