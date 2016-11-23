/* eslint-disable func-names */
import FfiApi from './FfiApi';
import CONST from './constants';

class ClientManager extends FfiApi {
  constructor() {
    super();
    this.networkState = CONST.NETWORK_STATES.DISCONNECTED;
    this.networkStateChangeListener = function () {};
    this.handleId = null;
  }

  set clientHandle(handle) {
    this.handleId = handle;
  }

  get clientHandle() {
    return this.handleId;
  }

  setNetworkListener(cb) {
    this.networkStateChangeListener = cb;
    this.networkStateChangeListener(this.networkState);
  }

  /*
  * Create unregistered client
  * */
  createUnregisteredClient() {
    this.networkState = CONST.NETWORK_STATES.CONNECTING;

    // const onStateChange = ffi.Callback(Void, [int32], (state) => {
    //   if (this.networkStateChangeListener) {
    //     this.networkStateChangeListener(state);
    //   }
    // });

    // TODO create unregistered client

    this.networkState = CONST.NETWORK_STATES.CONNECTED;
    this.networkStateChangeListener(this.networkState); // TODO remove it
  }

  /*
  * Drop client handle
  * */
  dropHandle() {
    // TODO drop client handle
    this.handleId = null;
  }
}

const clientManager = new ClientManager();
export default clientManager;
