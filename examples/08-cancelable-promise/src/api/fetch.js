export const fetchWithDelay = (url, delay = 3000) => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve(
        fetch(url, {
          method: "GET"
        }).then(response => response.json())
      );
    }, delay);
  });

  return promise;
};

export const later = (delay = 3000) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });
