import React, { Component } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Linking } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import ProgressDialog from 'react-native-progress-dialog';
import Share from 'react-native-share';
import messaging from '@react-native-firebase/messaging';
import global from '../global.js';

export default class Settings extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			notificationEnabled: true,
			progressDialogVisible: false
		};
	}
	
	componentDidMount() {
		readBoolean("subscribe", true, async (subscribe) => {
			await this.setState({notificationEnabled: subscribe});
		});
	}
	
	async openAbout() {
		await this.props.navigation.navigate('About');
	}
	
	async share() {
		await this.setState({progressDialogVisible: true});
		fetch(API_URL+"/user/get_share_text")
			.then(response => response.text())
			.then(async (shareText) => {
				await this.setState({progressDialogVisible: false});
				Share.open({
					title: string.share,
					message: shareText
				})
				.then(response => {
					log(response);
				});
			});
	}
	
	async giveRating() {
		Linking.openURL("https://play.google.com/store/apps/details?id="+PACKAGE_NAME);
	}
	
	async switchNotification() {
		writeBoolean("subscribe", this.state.notificationEnabled);
		if (this.state.notificationEnabled) {
			messaging()
				.subscribeToTopic('tafsir')
				.then(() => console.log('Subscribed to topic!'));
		} else {
			messaging()
				.unsubscribeFromTopic('tafsir')
			  	.then(() => console.log('Unsubscribed fom the topic!'));
		}
	}
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
					resizeMode="cover" />
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/images/manual-banner.gif')} style={{ width: '100%', height: 50 }} />
				</View>
				<TouchableOpacity style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
					onPress={async () => {
						await this.setState({notificationEnabled: !this.state.notificationEnabled});
						this.switchNotification();
					}}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
						<Image source={require('../assets/images/notification.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
						<Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 'bold', marginLeft: 16 }}>{string.notification}</Text>
					</View>
					<Switch
        				trackColor={{ false: "#767577", true: "#FFFFFF" }}
        				thumbColor={this.state.notificationEnabled ? "#f5dd4b" : "#f4f3f4"}
        				ios_backgroundColor="#3e3e3e"
        				onValueChange={async (enabled) => {
        					await this.setState({notificationEnabled: enabled});
        					this.switchNotification();
        				}}
        				value={this.state.notificationEnabled}
        				style={{ marginRight: 16 }} />
				</TouchableOpacity>
				<TouchableScale style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center' }}
					onPress={() => this.share()}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
						<Image source={require('../assets/images/share.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
						<Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 'bold', marginLeft: 16 }}>{string.share}</Text>
					</View>
				</TouchableScale>
				<TouchableScale style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center' }}
					onPress={() => this.giveRating()}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24 }}>
						<Image source={require('../assets/images/star.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
						<Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 'bold', marginLeft: 16 }}>{string.text8}</Text>
					</View>
				</TouchableScale>
				<ProgressDialog visible={this.state.progressDialogVisible} label={string.loading} loaderColor={mainColor} />
			</View>
		);
	}
}
