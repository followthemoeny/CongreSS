import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Session from '../Session.js';
import Election from '../components/Election.jsx';

const Elections = (props) => {
  const [ elections, setElections ] = useState(null);

  useEffect(() => {
    Session.getElections()
    .then((data) => setElections(data))
    .catch((err) => setElections(undefined));
  }, []);

  if (elections === null) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (!elections.length) {
    return (
      <h1>No upcoming elections near {Session.getAddress()}</h1>
    );
  }

  if (elections === undefined) {
    return (
      <h1>An error occurred.</h1>
    );
  }

  const children = elections.map((props) =>
    <Election {...props}/>
  );

  return (
    <div>
      <h1>Elections around {Session.getAddress()}:</h1>
      {children}
    </div>
  );
};

export default withRouter(Elections);