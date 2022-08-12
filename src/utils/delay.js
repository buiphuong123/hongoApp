/**
 * use to waiting
 * @param {*} ms number miliseconds you want to wait
 */
 export const delay = ms => {
    return new Promise((rs, rj) => {
      setTimeout(() => {
        rs();
      }, ms);
    });
  };
  