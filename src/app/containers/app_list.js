import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppList from '../components/app_list';
import { getAuthorisedApps, revokeApp, searchApp, clearSearch } from '../actions/app';

const mapStateToProps = (state) => (
  {
    isAuthorised: state.auth.isAuthorised,
    fetchingApps: state.app.fetchingApps,
    authorisedApps: state.app.authorisedApps,
    searchResult: state.app.searchResult
  }
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ getAuthorisedApps, revokeApp, searchApp, clearSearch }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
