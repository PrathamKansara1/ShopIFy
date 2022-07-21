import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const history = useHistory();

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);
  return (
    <Fragment>
      <MetaData title="ORDERS -ShopIFyAdmin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productsListPage">
          <div className="productsListsHeading">
            <h1>ShopIFy Orders</h1>
          </div>
          <div className="productsListsContainer">
            <table className="productsListTable">
              <thead>
                <tr>
                  <th className="tableHeading">
                    <p>OrderID</p>
                  </th>
                  <th className="tableHeading">
                    <p>Status</p>
                  </th>
                  <th className="tableHeading">
                    <p>Order Date</p>
                  </th>
                  <th className="tableHeading">
                    <p>Amount</p>
                  </th>
                  <th className="tableHeading">
                    <p>Actions</p>
                  </th>
                </tr>
              </thead>
              {orders &&
                orders.map((order) => (
                  <tbody key={order._id}>
                    <tr>
                      <td align="center">
                        <p>{order._id}</p>
                      </td>
                      <td align="center">
                        <p
                          className={
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus}
                        </p>
                      </td>
                      <td align="center">
                        <p>{String(order.createdAt).substr(0, 10)}</p>
                      </td>
                      <td align="center">
                        <p>₹{order.totalPrice}</p>
                      </td>
                      <td align="center">
                        <p>
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="editProductBtn"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="deleteProductBtn"
                            onClick={() => deleteOrderHandler(order._id)}
                          >
                            <MdDelete />
                          </button>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
