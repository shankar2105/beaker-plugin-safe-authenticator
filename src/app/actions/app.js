import { routeActions } from 'react-router-redux';

export const GET_AUTHORISED_APPS = 'GET_AUTHORISED_APPS';
export const REVOKE_APP = 'REVOKE_APP';
export const SET_APP_LIST = 'SET_APP_LIST';
export const SEARCH_APP = 'SEARCH_APP';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const getAuthorisedApps = () => ({
  type: GET_AUTHORISED_APPS,
  payload: window.safeAuthenticator.getAuthorisedApps()
});

export const revokeApp = (appId) => (
  (dispatch) => (
    dispatch({
      type: REVOKE_APP,
      payload: window.safeAuthenticator.revokeApp(appId)
    }).then(() => dispatch(routeActions.push('/')))
  )
);

export const setAppList = (appList) => ({
  type: SET_APP_LIST,
  apps: appList
});

export const searchApp = (value) => ({
  type: SEARCH_APP,
  value
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH
});
