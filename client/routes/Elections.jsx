import React, { useContext } from 'react';

import { SessionContext } from '../contexts/Session.jsx';

const Elections = () => {
  const { session } = useContext(SessionContext);

  return (
    <h1>No upcoming elections around {session.address}.</h1>
  );
};


export default Elections;