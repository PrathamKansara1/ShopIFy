import React, { Fragment, useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import {
  FaLaptop,
  FaList,
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
} from "react-icons/fa";
import profilepng from "../../../Images/Profile.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

const NavOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <FaList />, name: "Orders", func: orders },
    { icon: <FaUser />, name: "Profile", func: account },
    {
      icon: (
        <FaCartArrowDown
          style={{ color: cartItems.length > 0 ? "green" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <FaSignOutAlt />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <FaLaptop />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function cart() {
    history.push("/cart");
  }

  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }
  return (
    <Fragment>
      <Backdrop className="BackDrop" open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profilepng}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default NavOptions;
