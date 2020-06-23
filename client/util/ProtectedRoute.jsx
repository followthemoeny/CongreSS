import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ validate, children, ...rest }) => {
  const render = ({ location }) => {
    const redirect = validate(location);
    if (redirect) {
      const linkTo = { 
        pathname: redirect, 
        state: { 
          from: location 
        }
      };
      return <Redirect to={linkTo} />;
    }
    return children;
  }

  return <Route {...rest} render={render} />;
};

export default ProtectedRoute;