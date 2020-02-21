/**
 * Version of @istarkov's cancellable Promise wrapper.
 *
 * @see https://github.com/facebook/react/issues/5465#issuecomment-157888325
 */
export const makeCancelable = (promise, onCancel) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(value => (hasCanceled ? onCancel && onCancel() : resolve(value)))
      .catch(error => (hasCanceled ? onCancel && onCancel() : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
};
