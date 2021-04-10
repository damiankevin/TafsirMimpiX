import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking, NativeModules } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import NativeAdView, {
	CallToActionView,
	IconView,
	HeadlineView,
	TaglineView,
	AdvertiserView,
	AdBadge,
} from "react-native-admob-native-ads";
import ProgressDialog from 'react-native-progress-dialog';
import global from '../global.js';
import NativeAd from '../components/NativeAd.js';
import BannerAd from '../components/BannerAd.js';

export default class Home extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			progressDialogVisible: false
		};
	}
	
	componentDidMount() {
	}
	
	async checkInterstitialAd() {
		readInt("total_home_ads_clicked", 0, (totalHomeAdsClicked) => {
			totalHomeAdsClicked++;
			if ((totalHomeAdsClicked%3) == 0) {
				showInterstitialAd();
			}
			writeInt("total_home_ads_clicked", totalHomeAdsClicked);
		});
	}
	
	tafsirMimpi2A() {
		this.checkInterstitialAd();
		this.props.navigation.navigate('TafsirMimpi2A');
	}
	
	tafsirMimpi3A() {
		this.checkInterstitialAd();
		this.props.navigation.navigate('TafsirMimpi3A');
	}
	
	tafsirMimpi4A() {
		this.checkInterstitialAd();
		this.props.navigation.navigate('TafsirMimpi4A');
	}
	
	tafsirMimpiFull() {
		this.checkInterstitialAd();
		this.props.navigation.navigate('TafsirMimpiFull');
	}
	
	async prediction2d() {
		this.checkInterstitialAd();
		await this.setState({progressDialogVisible: true});
		fetch(API_URL+"/user/get_settings")
			.then(response => response.text())
			.then(async (response) => {
				await this.setState({progressDialogVisible: false});
				let settings = JSON.parse(response);
				Linking.openURL(settings['prediction_2d_link']);
			});
	}
	
	async prediction4d() {
		this.checkInterstitialAd();
		await this.setState({progressDialogVisible: true});
		fetch(API_URL+"/user/get_settings")
			.then(response => response.text())
			.then(async (response) => {
				await this.setState({progressDialogVisible: false});
				let settings = JSON.parse(response);
				NativeModules.AndroidUtil.showListDialog(JSON.stringify([settings['prediction_4d_1_name'], settings['prediction_4d_2_name']]),
					(position) => {
						if (position == 0) {
							Linking.openURL(settings['prediction_4d_1_link']);
						} else if (position == 1) {
							Linking.openURL(settings['prediction_4d_2_link']);
						}
					});
			});
	}
	
	async others() {
		this.checkInterstitialAd();
		this.props.navigation.navigate('TafsirMimpiOthers');
	}
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
				<ScrollView style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', paddingTop: 32, paddingBottom: 32,
					paddingLeft: 24, paddingRight: 24 }}
					contentContainerStyle={{ paddingTop: 48, paddingBottom: 112 }}>
					<TouchableScale style={{ width: '100%', height: 70 }}
						onPress={() => this.tafsirMimpi2A()}>
						<Image source={require('../assets/images/img01.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.tafsirMimpi3A()}>
						<Image source={require('../assets/images/img02.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.tafsirMimpi4A()}>
						<Image source={require('../assets/images/img03.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.tafsirMimpiFull()}>
						<Image source={require('../assets/images/img04.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<NativeAd style={{ marginTop: 32 }} />
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.prediction2d()}>
						<Image source={require('../assets/images/img05.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.prediction4d()}>
						<Image source={require('../assets/images/img06.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
					<NativeAd style={{ marginTop: 32 }} />
					<TouchableScale style={{ width: '100%', height: 70, marginTop: 32 }}
						onPress={() => this.others()}>
						<Image source={require('../assets/images/img07.png')} style={{ width: '100%', height: '100%' }} />
					</TouchableScale>
				</ScrollView>
				<View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<BannerAd />
				</View>
				<View style={{ position: 'absolute', left: 0, top: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/images/manual-banner.gif')} style={{ width: '100%', height: 50 }} />
				</View>
				<ProgressDialog visible={this.state.progressDialogVisible} label={string.loading} loaderColor={mainColor} />
			</View>
		);
	}
}
