[![Build Status](https://github.com/Lemoncode/react-promise-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Lemoncode/react-promise-tracker/actions/workflows/ci.yml)

# react-promise-tracker

Simple promise tracker React Hoc. You can see it in action in this [Live Demo](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/00-example-basic), and find the basic info to get started in this [post](https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls).

For detailed information check out the [documentation](https://lemoncode.github.io/react-promise-tracker/)

# Why do I need this?

Sometimes we need to track blocking promises (e.g. fetch or axios http calls), and control whether to
display a loading spinner indicator not, you have to take care of scenarios like:

- You could need to track several ajax calls being performed in parallel.
- Some of them you want to be tracked some others to be executed silently in background.
- You may want to have several spinners blocking only certain areas of the screen.
- For high speed connection you may want to show the loading spinner after an small delay of time
  to avoid having a flickering effect in your screen.

This library implements:

- A simple function that will allow a promise to be tracked.
- A Hook + HOC component that will allow us wrap a loading spinner (it will be displayed when the number of tracked request are greater than zero, and hidden when not).

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

Then you only need to create a spinner component and make use of the _usePromiseTracker_, this
hook will expose a boolean property that will let us decide whether to show or hide the loading
spinner.

## Basic sample:

```diff
import React, { Component } from 'react';
+ import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinerComponent = (props) => {
+ const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
    {
+      (promiseInProgress === true) ?
        <h3>Hey I'm a spinner loader wannabe !!!</h3>
      :
        null
    }
  </div>
  )
};
```

- To add a cool spinner component you can make use of _react-spinners_:

  - [Demo page](http://www.davidhu.io/react-spinners/)
  - [Github page](https://github.com/davidhu2000/react-spinners)

* Then in your application entry point (main / app / ...) just add this loading spinner to be displayed:

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const AppComponent = (props) => (
  <div>
    <h1>Hello App!</h1>
+   <LoadingSpinnerComponent />
  </div>
);
```

## Sample with areas:

Using react-promise-tracker as is will just display a single spinner in your page, there are cases where you want to display a given spinner only blocking certain area of the screen (e.g.: a product list app with a shopping cart section.
We would like to block the ui (show spinner) while is loading the product, but not the rest of the user interface, and the same thing with the shopping cart pop-up section.

![Shopping cart sample](/resources/00-shopping-cart-sample.png)

The _promiseTracker_ hooks exposes a config parameter, here we can define the area that we want to setup
(by default o area). We could just feed the area in the props of the common spinner we have created

```diff
export const Spinner = (props) => {
+  const { promiseInProgress } = usePromiseTracker({area: props.area});

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
};
```

We could add the `default-area` to show product list spinner (no params means just default area):

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const ProductListComponent = (props) => (
  <div>
    ...
+   <LoadingSpinnerComponent /> // default-area
  </div>
);
```

And we add the `shopping-cart-area` to show shopping cart spinner:

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const ShoppingCartModal = (props) => (
  <div>
+   <LoadingSpinnerComponent area="shopping-cart-area" />
  </div>
);
```

The when we track a given promise we can choose the area that would be impacted.

```diff
+ import { trackPromise} from 'react-promise-tracker';
...
+ trackPromise(
    fetchSelectedProducts();
+ ,'shopping-cart-area');
```

## Sample with delay:

You can add as well a delay to display the spinner, When is this useful? if your users are connected on
high speed connections it would be worth to show the spinner right after 500 Ms (checking that the
ajax request hasn't been completed), this will avoid having undesired screen flickering on high speed
connection scenarios.

```diff
export const Spinner = (props) => {
+  const { promiseInProgress } = usePromiseTracker({delay: 500});
```

# Demos

Full examples:

> NOTE: If you are going to modify the following examples in Codesandbox, you must first do a fork

- *00 Basic Example*: minimum sample to get started.
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/00-example-basic)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/00-example-basic)

- *01 Example Areas*: defining more than one spinner to be displayed in separate screen areas.
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/01-example-areas)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/01-example-areas)

- *02 Example Delay*: displaying the spinner after some miliseconds delay (useful when your users havbe high speed connections).
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/02-example-delay)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/02-example-delay)

- *03 Example Hoc*: using legacy high order component approach (useful if your spinner is a class based component).
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/03-example-hoc)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/03-example-hoc)

- *04 Initial load*: launching ajax request just on application startup before the spinner is being mounted.
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/04-initial-load)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/04-initial-load)

- *05 Typescript*: full sample using typescript (using library embedded typings).
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/05-typescript)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/05-typescript)

- *06 Suspense Like*: sample implementing a suspense-like component (typescript).
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/06-suspense-like)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/06-suspense-like)

- *07 Suspense Custom*: sample implementing a suspense-like component that can be customized by passing a spinner component of your choice (typescript).
  - [Stackblitz](https://stackblitz.com/github/lemoncode/react-promise-tracker/tree/master/examples/07-suspense-custom)
  - [Codesandbox](https://codesandbox.io/s/github/lemoncode/react-promise-tracker/tree/master/examples/07-suspense-custom)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
