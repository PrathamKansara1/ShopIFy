import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { MdLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myOrderPage">
            <div className="myOrdersHeading">
              <h1>My Orders</h1>
            </div>
            <div className="myOrdersContainer">
              <table className="myOrderTable">
                <thead className="tableHead">
                  <tr>
                    <th className="tableHeading">
                      <p>#Order</p>
                    </th>
                    <th className="tableHeading">
                      <p>Order Date</p>
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
                {orders.map((order) => (
                  <tbody key={order._id}>
                    <tr>
                      <td align="center">
                        <p>{order._id}</p>
                      </td>
                      <td align="center">
                        <p>{String(order.createdAt).substr(0, 10)}</p>
                      </td>
                      <td align="center">
                        <p>{order.totalPrice}</p>
                      </td>
                      <td align="center">
                        <p
                          className={
                            order.orderStatus === "Processing"
                              ? "redColor"
                              : "greenColor"
                          }
                        >
                          {order.orderStatus}
                        </p>
                      </td>
                      <td align="center">
                        <p>
                          <Link to={`/order/${order._id}`}>
                            <MdLaunch />
                          </Link>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
