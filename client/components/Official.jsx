import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Official = (props) => {
  console.log('offical data', props);

  const [ showDetails, setShowDetails ] = useState(false);
  
  const linkTo = { 
    pathname: `/officials/${props.name.replace(/ /g, '-')}`, 
    state: props
  };

  const details = showDetails ? (
    <>
      <div><b>address:</b> {props.address[0].line1}</div>
      <div><b>phone:</b> {props.phones[0]}</div>
    </>
  ) : null;

  return (
    <div style={{border: '1px solid'}}>
      <img src={props.photoUrl} width='50px' />
      <div><b>name:</b> {props.name}</div>
      <div><b>party:</b> {props.party}</div>
      <div><b>website:</b><a href={props.urls[0]}>{props.urls[0]}</a></div>
      <div>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'less' : 'more'} detail</button>
        {details}
      </div>
    </div>
  );
};

export default Official;