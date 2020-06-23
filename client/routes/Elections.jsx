import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import { SessionContext } from '../contexts/Session.js';
import Election from '../components/Election.jsx';

const Elections = (props) => {
  const { session } = useContext(SessionContext);

  const elections = props.location.state.map((props) =>
    <Election {...props}/>
  );

  return (
    <div>
      <h1>Elections around {session.address}:</h1>
      {elections}
    </div>
  );
};


export default withRouter(Elections);