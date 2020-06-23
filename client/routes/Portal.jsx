import React, { useContext } from 'react';

import { withRouter } from "react-router-dom";

import { SessionContext } from '../contexts/Session.jsx';

const Portal = (props) => {
  const { setSession } = useContext(SessionContext);

  const submitForm = (ev) => {
    ev.preventDefault()
    const form = ev.target;
    setSession({ address: form.elements.address.value });
    props.history.push('/officials');
  };

  return (
    <form onSubmit={submitForm}>
      <input name="address" type="text"></input>
    </form>
  );
};


export default withRouter(Portal);