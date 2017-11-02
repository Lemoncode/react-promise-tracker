# react-promise-tracker

** Work in progress **

Simple promise tracker React Hoc.

# Why do I need this?

Some time we need to track blocing promises (e.g. fetch http calls), and display a loading spinner, and some others not.

This library implements:
  - A simple function that will make a promise to be tracked.
  - An Hoc component that will allow us wrap a loading spinner (it will be displayed when the number of tracked request are greated than zero, hidden when not).
  
# Installation

```cmd
npm install react-promise-tracker --save
```

# Usage

Whenever you want a promise to be tracked, just wrap it:

```diff
+ trackPromise(
    fetchUsers();
+ );
```

Then you only need to create a component that will defined a property called _trackedPromiseInProgress_

And wrap it around the _promiseTrackerHoc_
