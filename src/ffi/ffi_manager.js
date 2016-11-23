const DEFAULT_LIB_PATH = '';

class FfiManager {
  constructor() {
    this.mods = [];
  }

  loadModules() {
    this.mods.forEach(() => {
      // TODO register all ffi modules
    });
  }

  loadLibrary(libraryPath = DEFAULT_LIB_PATH) {
    return new Promise((resolve) => {
      resolve();
    });
  }
}

const ffiManager = new FfiManager();
export default ffiManager;
