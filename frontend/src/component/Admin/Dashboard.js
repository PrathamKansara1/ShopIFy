import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { getAdminProduct } from "../../actions/productActon.js";
Chart.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { orders } = useSelector((state) => state.allOrders);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state)=> state.allUsers)

  const dispatch = useDispatch();

  let outOfStock = 0;

  products &&
  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
        borderColor: "green",
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#3bff48", "#005706"],
        hoverBackgroundColor: ["#32d13d", "#023b06"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard -ShopIFyAdmin" />
      <Sidebar />

      <div className="dashboardContainer">
        <div className="summary">
          <div className="totalProducts Card">
            <div className="heading">Total Products</div>
            <div className="dataAdmin">{products && products.length}</div>
          </div>
          <div className="totalUsers Card">
            <div className="heading">Total Users</div>
            <div className="dataAdmin">{users && users.length}</div>
          </div>
          <div className="totalOrders Card">
            <div className="heading">Total Orders</div>
            <div className="dataAdmin">{orders && orders.length}</div>
          </div>
          <div className="totalAmount Card">
            <div className="heading">Earned Amount</div>
            <div className="dataAdmin">₹{totalAmount}</div>
          </div>
        </div>
        <div className="statistics">
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
