import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteProduct, getAdminProduct } from "../../actions/productActon";
import { clearErrors } from "../../actions/orderAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const history = useHistory();

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, history, isDeleted]);
  return (
    <Fragment>
      <MetaData title="PRODUCTS -ShopIFyAdmin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productsListPage">
          <div className="productsListsHeading">
            <h1>ShopIFy Products</h1>
          </div>
          <div className="productsListsContainer">
            <table className="productsListTable">
              <thead>
                <tr>
                  <th className="tableHeading">
                    <p>ProductID</p>
                  </th>
                  <th className="tableHeading">
                    <p>Name</p>
                  </th>
                  <th className="tableHeading">
                    <p>Stock</p>
                  </th>
                  <th className="tableHeading">
                    <p>Price</p>
                  </th>
                  <th className="tableHeading">
                    <p>Action</p>
                  </th>
                </tr>
              </thead>
              {products.map((product) => (
                <tbody key={product._id}>
                  <tr>
                    <td align="center">
                      <p>{product._id}</p>
                    </td>
                    <td align="center">
                      <p>{product.name}</p>
                    </td>
                    <td align="center">
                      <p>{product.stock}</p>
                    </td>
                    <td align="center">
                      <p>{product.price}</p>
                    </td>
                    <td align="center">
                      <p>
                        <Link
                          to={`/admin/product/${product._id}`}
                          className="editProductBtn"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          className="deleteProductBtn"
                          onClick={() => deleteProductHandler(product._id)}
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

export default ProductList;
