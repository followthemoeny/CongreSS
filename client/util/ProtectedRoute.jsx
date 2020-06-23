import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ validate, children, ...rest }) => {
  const render = ({ location }) => {
    const redirect = validate(location);
    if (redirect) {
      const to = { 
        pathname: redirect, 
        state: { 
          from: location 
        }
      };
      return <Redirect to={to} />;
    }
    return children;
  }

  return <Route {...rest} render={render} />;
};

export default ProtectedRoute;