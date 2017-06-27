import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import CONSTANTS from '../../constants';

export default class Spinner extends Component {
  static propTypes = {
    status: PropTypes.number.isRequired
  };

  render() {
    let message = null;
    switch (this.props.status) {
      case CONSTANTS.NETWORK_STATUS.CONNECTED: {
        message = "Connected";
      }
      case CONSTANTS.NETWORK_STATUS.DISCONNECTED: {
        message = "Connecting";
      }
    }
    return (
      <div className="nw-status">
        <span
          className={classNames(
            'nw-status-i',
            {
              connecting: this.props.status === CONSTANTS.NETWORK_STATUS.DISCONNECTED,
              connected: this.props.status === CONSTANTS.NETWORK_STATUS.CONNECTED
            }
          )}
        >{' '}</span>
        <span className="nw-status-tooltip">{message}</span>
      </div>
    );
  }
}
