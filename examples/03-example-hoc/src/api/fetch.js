export const fetchWithDelay = async (url) => {

 try {
        const response = await new Promise((resolve, reject) => {
          setTimeout(
            () =>
              resolve(
                fetch(url).then((data) => {
                  return data;
                })
              ),
            3000
          );
        });
        const responseJSON = await response.json();
        return responseJSON;
      } catch (err) {
        throw new Error(err);
      }
}
