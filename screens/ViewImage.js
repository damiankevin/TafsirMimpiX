import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class ViewImage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			imgURI: this.props.route.params['uri']
		};
	}
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: '#000000' }}>
				<Image source={this.state.imgURI} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
			</View>
		);
	}
}
