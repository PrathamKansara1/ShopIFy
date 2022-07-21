import React, { Fragment, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);


const history = useHistory();

useEffect(() => {
  if(isAuthenticated === false){
    history.push("/login")
  }
}, [history,isAuthenticated])


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={user.name} />
          <div className="ProfileContainer">
            <div className="profilePhoto">
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update" className="editprofile">
                <FaPen className="penicon" /> <p>Edit Profile</p>
              </Link>
            </div>
            <div className="userDetail">
              <div className="leftdetailcontainer">
                <div className="name">
                  <h3>Registered Name</h3>
                  <h4>{user.name}</h4>
                </div>
                <div className="email">
                  <h3>Registered Email</h3>
                  <h4>{user.email}</h4>
                </div>
              </div>
              <div className="centerdetailcontainer">
                <div className="address">
                  <h3>Registered Address</h3>
                  <h4>{user.address}</h4>
                </div>
                <div className="joindate">
                  <h3>You Joined On</h3>
                  <h4>{String(user.createdAt).substr(0, 10)}</h4>
                </div>
              </div>
              <div className="rightdetailcontainer">
                <div className="myorders">
                  <Link to="/orders"><button className="myorderbtn">My Orders</button></Link>
                </div>
                <div className="changepassword">
                  <Link to="/password/update"><button className="changepasswordbtn">Change Password</button></Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
