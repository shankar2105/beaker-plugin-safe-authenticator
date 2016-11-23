class ClientManager {
  constructor() {
    this.networkStatusChangeListener = null;
    this.handleId = null;
  }

  set clientHandle(handle) {
    this.handleId = handle;
  }

  get clientHandle() {
    return this.handleId;
  }

  registerNetworkListener(cb) {
    this.networkStatusChangeListener = cb;
  }

  /*
  * Create unregistered client
  * */
  createUnregisteredClient() {
    if (this.networkStatusChangeListener) {
      // TODO register network listener callback
    }
    // TODO create unregistered client
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
