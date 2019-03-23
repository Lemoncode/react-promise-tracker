import React from 'react';
import './loadButton.css';

export const LoadButton = (props) => (
  <button
    className="load-button"
    onClick={props.onLoad}
  >
    {props.title}
  </button>
);