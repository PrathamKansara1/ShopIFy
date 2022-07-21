import React, { Fragment } from "react";
import './About.css'
import { MdLaunch } from "react-icons/md";

const About = () => {
  return (
    <Fragment>
      <div className="myOrderPage">
        <div className="myOrdersHeading">
          <h1>My Orders</h1>
        </div>
        <div className="myOrdersContainer">
          <table className="myOrderTable">
            <thead>
              <tr>
                <th className="tableHeading">
                  <p>#Order</p>
                </th>
                <th className="tableHeading">
                  <p>Order Date</p>
                </th>
                <th className="tableHeading">
                  <p>Address</p>
                </th>
                <th className="tableHeading">
                  <p>Order Total</p>
                </th>
                <th className="tableHeading">
                  <p>Order Status</p>
                </th>
                <th className="tableHeading">
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="center">
                        <p>178154685184</p>
                    </td>
                    <td align="center">
                        <p>178154685184</p>
                    </td>
                    <td align="center">
                        <p>178154685184</p>
                    </td>
                    <td align="center">
                        <p>178154685184</p>
                    </td>
                    <td align="center">
                        <p>178154685184</p>
                    </td>
                    <td align="center">
                        <p> <MdLaunch/> </p>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
