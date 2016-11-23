import * as network from './network';

const safeAuthApi = [
  {
    name: 'safeAuthenticator',
    isInternal: true,
    manifest: network.manifest,
    methods: network.registerNetworkListener
  }
];

export default safeAuthApi;
