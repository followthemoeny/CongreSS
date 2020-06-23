import React from 'react';

const Election = (props) => {
  return (
    <div>
      <div><b>date:</b> {props.date}</div>
      <div><b>address:</b> {props.address}</div>
    </div>
  );
};

export default Election;