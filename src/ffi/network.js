/* eslint-disable import/prefer-default-export */

export const registerNetworkListener = (cb) => {
  setTimeout(() => cb(true), 1000);
};
