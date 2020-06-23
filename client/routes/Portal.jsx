import React, { useContext, useState } from 'react';
import { withRouter } from "react-router-dom";
import { SessionContext } from '../contexts/Session.js';
import Api from '../util/Api.js';

const Portal = (props) => {
  const { setSession } = useContext(SessionContext);
  const [ searching, setSearching ] = useState(null);

  const search = (ev) => {
    ev.preventDefault()

    const address = ev.target.elements.address.value;

    setSearching(true);

    Api.getOfficals(address)
      .then((data) => {
        setSession({ address: address });
        props.history.push('/officials', data);
        setSearching(false);
      })
      .catch((err) => setSearching("Sorry, that address doesn't seem to be valid"));
  };

  return (
    <form onSubmit={search}>
      <div>{typeof searching === 'string' ? searching : null}</div>
      <input name="address" type="text"></input>
      <button type="submit">{searching === true ? '...' : 'search'}</button>
    </form>
  );
};


export default withRouter(Portal);