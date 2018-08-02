# react-promise-tracker

Simple promise tracker React Hoc (sample application: https://github.com/Lemoncode/react-promise-tracker-sample).

# Why do I need this?

Sometimes we need to track blocking promises (e.g. fetch http calls), to choose between displaying a loading spinner or not.

This library implements:
  - A simple function that will allow a promise to be tracked.
  - An HOC component that will allow us wrap a loading spinner (it will be displayed when the number of tracked request are greater than zero, and hidden when not).
  
# Installation

```cmd
npm install react-promise-tracker --save
```

# Usage

Whenever you want a promise to be tracked, just wrap it like in the code below:

```diff
+ import { trackPromise} from 'react-promise-tracker';
//...

+ trackPromise(
    fetchUsers(); // You function that returns a promise
+ );
```

Then you only need to create a component that will defined a property called _trackedPromiseInProgress_

And wrap it around the _promiseTrackerHoc_

Sample:

```diff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
+ import { promiseTrackerHoc} from 'react-promise-tracker';

const InnerLoadingSpinerComponent = (props) => {
  return (
    <div>      
    {
      (props.trackedPromiseInProgress === true) ?
        <h3>Hey I'm a spinner loader wannabe !!!</h3>
      :
        null       
    }
  </div>  
  )
};

InnerLoadingSpinerComponent.propTypes = {
  trackedPromiseInProgress : PropTypes.bool.isRequired,
};

+ export const LoadingSpinnerComponent = promiseTrackerHoc(InnerLoadingSpinerComponent);
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
