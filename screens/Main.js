import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ProgressDialog from 'react-native-progress-dialog';
import global from '../global.js';

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			progressDialogVisible: false
		};
	}
		
	async componentDidMount() {
		await this.setState({progressDialogVisible: true});
		fetch(API_URL+"/user/get_admob_ids")
			.then(response => response.text())
			.then(async (response) => {
				let obj = JSON.parse(response);
				log(response);
				BANNER_AD_ID = obj['banner_ad_id'];
				INTERSTITIAL_AD_ID = obj['interstitial_ad_id'];
				NATIVE_AD_ID = obj['native_ad_id'];
				await this.setState({progressDialogVisible: false});
				this.props.navigation.replace('Home');
			});
	}
	
	render() {
		return (
			<View>
				<ProgressDialog visible={this.state.progressDialogVisible} label={string.loading} loaderColor={mainColor} />
			</View>
		);
	}
}
