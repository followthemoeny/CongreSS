import React from 'react';

import { Link } from 'react-router-dom';

const Official = (props) => {
  const linkTo = { 
    pathname: `/officials/${props.name.replace(/ /g, '-')}`, 
    state: props
  };

  return (
    <div>
      <span><b>name:</b> {props.name}</span>
      <Link to={linkTo}> more info</Link>
    </div>
  );
};

export default Official;