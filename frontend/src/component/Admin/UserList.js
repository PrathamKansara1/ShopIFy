import React, { Fragment, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const UserList = () => {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);
  const history = useHistory();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);
  return (
    <Fragment>
      <MetaData title="USERS -ShopIFyAdmin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productsListPage">
          <div className="productsListsHeading">
            <h1>ShopIFy Users</h1>
          </div>
          <div className="productsListsContainer">
            <table className="productsListTable">
              <thead>
                <tr>
                  <th className="tableHeading">
                    <p>UserId</p>
                  </th>
                  <th className="tableHeading">
                    <p>Email</p>
                  </th>
                  <th className="tableHeading">
                    <p>Name</p>
                  </th>
                  <th className="tableHeading">
                    <p>Role</p>
                  </th>
                  <th className="tableHeading">
                    <p>Actions</p>
                  </th>
                </tr>
              </thead>
              {users &&
                users.map((user) => (
                  <tbody key={user._id}>
                    <tr>
                      <td align="center">
                        <p>{user._id}</p>
                      </td>
                      <td align="center">
                        <p>{user.email}</p>
                      </td>
                      <td align="center">
                        <p>{user.name}</p>
                      </td>
                      <td align="center">
                      <p
                          className={
                            user.role === "admin"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {user.role}
                        </p>
                      </td>
                      <td align="center">
                        <p>
                          <Link
                            to={`/admin/user/${user._id}`}
                            className="editProductBtn"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="deleteProductBtn"
                            onClick={() => deleteUserHandler(user._id)}
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

export default UserList;
