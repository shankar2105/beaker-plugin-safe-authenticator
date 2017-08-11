import ref from 'ref';
import ArrayType from 'ref-array';
import * as types from './types';

export const parseArray = (type, arrayBuf, len) => {
  if (len === 0) {
    return [];
  }
  const arrPtr = ref.reinterpret(arrayBuf, type.size * len);
  const ArrType = ArrayType(type);
  return ArrType(arrPtr);
};

export const parseAppExchangeInfo = (appExchangeInfo) => ({
  id: appExchangeInfo.id,
  scope: appExchangeInfo.scope,
  name: appExchangeInfo.name,
  vendor: appExchangeInfo.vendor
});

export const parsePermissionArray = (permissionArray, len) => {
  const res = [];
  let i = 0;
  const permissions = parseArray(types.Permission, permissionArray, len);
  for (i = 0; i < permissions.length; i++) {
    res.push(permissions[i].key);
  }
  return res;
};

export const parseContainerPermissions = (containerPermissions) => ({
  cont_name: containerPermissions.cont_name,
  access: parsePermissionArray(containerPermissions.access, containerPermissions.access_len),
  access_len: containerPermissions.access_len,
  access_cap: containerPermissions.access_cap
});

export const parseContainerPermissionsArray = (containerPermissionsArray, len) => {
  const res = [];
  let i = 0;
  const contArr = parseArray(types.ContainerPermissions, containerPermissionsArray, len);
  for (i = 0; i < contArr.length; i++) {
    res.push(parseContainerPermissions(contArr[i]));
  }
  return res;
};

export const parseRegisteredApp = (registeredApp) => (
  {
    app_info: parseAppExchangeInfo(registeredApp.app_info),
    containers: parseContainerPermissionsArray(registeredApp.containers,
      registeredApp.containers_len),
    containers_len: registeredApp.containers_len,
    containers_cap: registeredApp.containers_cap
  }
);

export const parseRegisteredAppArray = (registeredAppArray, len) => {
  const res = [];
  let i = 0;
  const registeredApps = parseArray(types.RegisteredApp, registeredAppArray, len);
  for (i = 0; i < registeredApps.length; i++) {
    res.push(parseRegisteredApp(registeredApps[i]));
  }
  return res;
};

export const parseAuthReq = (authReq) => (
  {
    app: parseAppExchangeInfo(authReq.app),
    app_container: authReq.app_container,
    containers: parseContainerPermissionsArray(authReq.containers, authReq.containers_len),
    containers_len: authReq.containers_len,
    containers_cap: authReq.containers_cap
  }
);

export const parseContainerReq = (containersReq) => (
  {
    app: parseAppExchangeInfo(containersReq.app),
    containers: parseContainerPermissionsArray(containersReq.containers,
      containersReq.containers_len),
    containers_len: containersReq.containers_len,
    containers_cap: containersReq.containers_cap
  }
);

const parseXorName = (str) => {
  const b = new Buffer(str);
  if (b.length !== 32) throw Error('XOR Names _must be_ 32 bytes long.');
  const name = types.XorName(b);
  return new Buffer(name).toString('hex');
};


const parsePermissionSet = (perms) => (
  {
    insert: perms.insert,
    update: perms.update,
    delete: perms.delete,
    manage_permissions: perms.manage_permissions
  }
);

const parseShareMData = (shareMData) => (
  {
    type_tag: shareMData.type_tag,
    name: parseXorName(shareMData.name),
    perms: parsePermissionSet(shareMData.perms)
  }
);

const parseSharedMDataArray = (shareMData, len) => {
  const res = [];
  let i = 0;
  const mdatas = parseArray(types.ShareMData, shareMData, len);
  for (i = 0; i < mdatas.length; i++) {
    res.push(parseShareMData(mdatas[i]));
  }
  return res;
};


export const parseShareMDataReq = (shareMDataReq) => (
  {
    app: parseAppExchangeInfo(shareMDataReq.app),
    mdata: parseSharedMDataArray(shareMDataReq.mdata, shareMDataReq.mdata_len),
    mdata_len: shareMDataReq.mdata_len
  }
);

const parseUserMetaData = (meta) => ({
  name: meta.name,
  description: meta.description
})

export const parseUserMetaDataArray = (metaArr, len) => {
  const res = [];
  let i = 0;
  const metaData = parseArray(types.UserMetadata, metaArr, len);
  for (i = 0; i < metaData.length; i++) {
    res.push(parseUserMetaData(metaData[i]));
  }
  return res;
};
