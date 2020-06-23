import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ validate, children, ...rest }) => {
  const render = ({ location }) => {
    const redirect = validate(location);
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return children;
  }

  return <Route {...rest} render={render} />;
};

export default ProtectedRoute;