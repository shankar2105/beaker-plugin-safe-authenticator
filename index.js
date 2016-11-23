import safeAuthApi from './src/api';
import ffiManager from './src/ffi/ffi_manager';
import clientManager from './src/ffi/client_manager';

// load ffi modules
ffiManager.loadModules();

// load ffi library
ffiManager.loadLibrary()
  // create unregistered client
  .then(clientManager.createUnregisteredClient());

module.exports = {
  configure() {},
  homePages: [{
    label: 'SAFE Network',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [],
  webAPIs: safeAuthApi
};
