import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';	
import global from '../global.js';

export default class About extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			about: ''
		};
	}
	
	componentDidMount() {
		fetch(API_URL+"/user/get_about")
			.then(response => response.text())
			.then(async (about) => {
				await this.setState({about});
			});
	}
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
					resizeMode="cover" />
				<Text style={{ color: '#FFFFFF', fontSize: 15, width: '100%', height: '100%', padding: 16 }}>
        			{this.state.about}
        		</Text>
			</View>
		);
	}
}
