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
				<div>
					{this.props.msg}
				</div>
			);
	}
}