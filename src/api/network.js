import clientManager from '../ffi/client_manager';

export const manifest = {
  registerNetworkListener: 'async'
};

/**
 * Register SAFE Network connectivity status listener
 * @param cb - callback holds network status as param
 */
export const registerNetworkListener = (cb) => {
  if (typeof cb !== 'function') {
    throw new Error('Network listener callback is not a function');
  }
  clientManager.registerNetworkListener(cb);
};
