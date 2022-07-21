import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Switch>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Redirect to="/login" />;
              }

              if (isAdmin === true && user.role !== "admin") {
                alert("You have No Access to this page")
                return <Redirect to="/login" />;
              }

              return <Component {...props} />;
            }}
          />
        </Switch>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
