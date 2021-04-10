import React, { Component } from 'react';
import { View } from 'react-native';
import NativeAdView, {
	CallToActionView,
	IconView,
	HeadlineView,
	TaglineView,
	AdvertiserView,
	AdBadge,
} from "react-native-admob-native-ads";
import global from '../global.js';

export default class NativeAd extends Component {

	componentDidMount() {
		log(this.props.style);
	}
	
	render() {
		return (
			<View style={[{ }, this.props.style]}>
				<View
      					style={{
        					flex: 1,
        					backgroundColor: '#FFFFFF',
        					borderRadius: 8
      					}}>
      					<NativeAdView
        					style={{
          						width: "95%",
          						alignSelf: "center",
          						height: 100,
        					}}
        					adUnitID={NATIVE_AD_ID}>
        					<View
          						style={{
            						height: 100,
            						width: "100%",
          						}}>
          						<AdBadge />
          						<View
            						style={{
              							height: 100,
              							width: "100%",
              							flexDirection: "row",
              							justifyContent: "flex-start",
              							alignItems: "center",
              							paddingHorizontal: 10,
            						}}>
            						<IconView
              							style={{
                							width: 60,
                							height: 60,
              							}} />
            						<View
              							style={{
                							width: "65%",
                							maxWidth: "65%",
                							paddingHorizontal: 6,
              							}}>
              							<HeadlineView
                							style={{
                  							fontWeight: "bold",
                  							fontSize: 13,
                							}} />
              							<TaglineView
                							numberOfLines={1}
                							style={{
                  								fontSize: 11,
                							}} />
              							<AdvertiserView
                							style={{
                  								fontSize: 10,
                  								color: "gray",
                							}} />
            						</View>
            						<CallToActionView
              							style={{
                							height: 45,
                							paddingHorizontal: 12,
                							backgroundColor: "purple",
                							justifyContent: "center",
                							alignItems: "center",
                							borderRadius: 5,
                							elevation: 10,
              							}}
              							textStyle={{ color: "white", fontSize: 14 }} />
          						</View>
        					</View>
      					</NativeAdView>
    				</View>
			</View>
		);
	}
}
