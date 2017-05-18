import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { parseAppName, getAppIconClassName } from '../utils';

export default class AppList extends Component {
  static propTypes = {
    fetchingApps: PropTypes.bool.isRequired,
    authorisedApps: PropTypes.arrayOf(PropTypes.shape({
      app_info: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        vendor: PropTypes.string,
      })
    })),
    getAuthorisedApps: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.title = 'Authorised Apps';
    this.getApps = this.getApps.bind(this);
  }

  componentDidMount() {
    this.props.getAuthorisedApps();
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthorised) {
      return this.context.router.push('/login');
    }
  }

  getApps() {
    const { fetchingApps, authorisedApps } = this.props;
    let apps = [];

    if (fetchingApps) {
      return (<span>Fetching apps</span>);
    } else if (authorisedApps.length === 0) {
      return (<span>No Apps Found</span>);
    }
    apps = authorisedApps.map((app, i) => (
      <Link key={i} to={`/app_details?id=${app.app_info.id}&index=${i}`}>
        <div className="app-list-i">
          <div className="app-list-i-b">
            <div className={getAppIconClassName(i)}>{app.app_info.name.slice(0, 2)}</div>
            <div className="app-list-i-name">{parseAppName(app.app_info.name)}</div>
          </div>
        </div>
      </Link>
    ));
    return apps;
  }

  render() {
    return (
      <div className="card-main-b">
        <div className="card-main-h">{ this.title }</div>
        <div className="card-main-cntr">
          <div className="app-list">
            { this.getApps()}
          </div>
        </div>
      </div>
    );
  }
}
