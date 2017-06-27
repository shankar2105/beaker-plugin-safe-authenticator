import React, { Component, PropTypes } from 'react';

export default class CardLoaderFull extends Component {
	static propTypes = {
		msg: PropTypes.string,
	};


	constructor() {
    	super();
	}


	render() {
		return (
				<div className="full-loader">
					<div className="full-loader-b">
						<div className="full-loader-ib">
							<span className="full-loader-i">{''}</span>
							<span className="full-loader-msg">{this.props.msg}</span>
						</div>
					</div>
				</div>
			);
	}
}