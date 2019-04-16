import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './app';
import { Spinner } from './common/components/spinner';

render(
  <div>
    <App />
    <Spinner />
  </div>,
  document.getElementById('root'));
