import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';
import { Spinner } from './common/spinner';

ReactDOM.render(
  <>
    <App />
    <Spinner/>
  </>,
  document.getElementById('root')
);
