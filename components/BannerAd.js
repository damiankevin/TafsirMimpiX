import React, { Component } from 'react';
import { View } from 'react-native';
import {
	AdMobBanner,
	AdMobInterstitial,
	PublisherBanner,
	AdMobRewarded,
} from 'react-native-admob';
import global from '../global.js';

export default class BannerAd extends Component {
	
	render() {
		return (
			<View>
				<AdMobBanner
  					adSize="banner"
  					adUnitID={BANNER_AD_ID}
  					testDevices={[AdMobBanner.simulatorId]}
  					onAdFailedToLoad={error => console.error(error)} />
			</View>
		);
	}
}
