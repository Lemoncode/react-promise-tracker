import React from 'react';
import './table.css';

export const Table = (props) => (
  <div>
    <h2 className="title">{props.title}</h2>
    <table className="table">
      <thead>
        {props.headerRender()}
      </thead>
      <tbody>
        {props.items.map(props.rowRender)}
      </tbody>
    </table>
  </div>
);
