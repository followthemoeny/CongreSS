import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Session from '../Session.js';

const Portal = (props) => {
  const [ searching, setSearching ] = useState(null);

  const search = (ev) => {
    ev.preventDefault()

    const address = ev.target.elements.address.value;

    setSearching(true);
    Session.initialize(address)
      .then((data) => {
        setSearching(false);
        props.history.push('/officials');
      })
      .catch((err) => {
        setSearching("Sorry, that address doesn't seem to be valid.")
      });
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