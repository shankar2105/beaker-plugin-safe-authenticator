import {
  GET_AUTHORISED_APPS,
  REVOKE_APP,
  SET_APP_LIST,
  SEARCH_APP,
  CLEAR_SEARCH
} from '../actions/app';
import { parseAppName } from '../utils';

const initialState = {
  authorisedApps: [],
  fetchingApps: false,
  searchResult: [],
  error: null,
  loading: false
};
const app = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_AUTHORISED_APPS}_PENDING`: {
      return { ...state, fetchingApps: true };
    }
    case `${GET_AUTHORISED_APPS}_FULFILLED`: {
      return {
        ...state,
        fetchingApps: false,
        authorisedApps: action.payload
      };
    }
    case `${GET_AUTHORISED_APPS}_REJECTED`: {
      return { ...state, fetchingApps: false, error: action.payload.message };
    }
    case `${REVOKE_APP}_PENDING`: {
      return { ...state, loading: true };
    }
    case `${REVOKE_APP}_FULFILLED`: {
      return { ...state, loading: false };
    }
    case `${REVOKE_APP}_REJECTED`: {
      return { ...state, loading: false, error: action.payload.message };
    }
    case SET_APP_LIST: {
      return { ...state, authorisedApps: action.apps };
    }
    case SEARCH_APP: {
      return {
        ...state,
        searchResult: state.authorisedApps.filter((apps) => (
            parseAppName(apps.app_info.name).toLowerCase()
              .indexOf(action.value.toLowerCase()) === 0
          )
        )
      };
    }
    case CLEAR_SEARCH: {
      return { ...state, searchResult: [] };
    }
    default: {
      return state;
    }
  }
};

export default app;
