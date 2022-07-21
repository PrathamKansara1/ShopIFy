import React, { Fragment } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  MdAdd,
  MdClose,
  MdDashboard,
  MdListAlt,
  MdMenu,
  MdPeople,
  MdPostAdd,
} from "react-icons/md";
import { useRef } from "react";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const menubarRef = useRef(null);

  const menubarclickhandler = () => {
    menubarRef.current.classList.add("noneDisplay");
    sidebarRef.current.classList.remove("noneDisplay");
  };

  const closeBtnHandler = () => {
    menubarRef.current.classList.remove("noneDisplay");
    sidebarRef.current.classList.add("noneDisplay");
  }

  return (
    <Fragment>
      <div className="fragment">
        <div ref={menubarRef} className={window.innerWidth < 600 ? "menubar" : "noneDisplay menubar"}>
          <MdMenu onClick={menubarclickhandler} />
        </div>
        <div
          ref={sidebarRef}
          className={
            window.innerWidth < 600 ? "sidebar noneDisplay" : "sidebar"
          }
        >
          {window.innerWidth < 600 ? <MdClose onClick={closeBtnHandler} className="mdclose"/> : []}
          <div className="links">
            <Link to="/admin/dashboard">
              <p>
                <MdDashboard /> Dashboard
              </p>
            </Link>
            <Link to="/admin/products">
              <p>
                <MdPostAdd /> All Products
              </p>
            </Link>
            <Link to="/admin/product">
              <p>
                <MdAdd /> Create Product
              </p>
            </Link>
            <Link to="/admin/orders">
              <p>
                <MdListAlt /> Orders
              </p>
            </Link>
            <Link to="/admin/users">
              <p>
                <MdPeople /> Users
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
