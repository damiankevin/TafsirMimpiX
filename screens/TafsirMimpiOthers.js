import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, NativeModules, Dimensions, FlatList } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import NativeAdView, {
	CallToActionView,
	IconView,
	HeadlineView,
	TaglineView,
	AdvertiserView,
	AdBadge,
} from "react-native-admob-native-ads";
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import global from '../global.js';
import NativeAd from '../components/NativeAd.js';
import BannerAd from '../components/BannerAd.js';

export default class TafsirMimpiOthers extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedNumber: 0,
			selectedType: 'kata',
			images: [],
			keyword: '',
			progressVisible: false
		};
	}
	
	async componentDidMount() {
		this.getImages();
	}
	
	async getImages() {
		await this.setState({images: []});
		fetch(API_URL+"/user/get_other_images")
			.then(response => response.text())
			.then(async (response) => {
				let images = [];
				let nonZodiacImages = [];
				let allImages = JSON.parse(response);
				for (let i=0; i<allImages.length; i++) {
					allImages[i]['height'] = 220;
					allImages[i]['resize_mode'] = 'contain';
					allImages[i]['type'] = 'image';
					allImages[i]['index'] = i;
					allImages[i]['other_image'] = false;
				}
				for (let i=12; i<allImages.length; i++) {
					nonZodiacImages.push(allImages[i]);
				}
				/*nonZodiacImages.push(allImages[allImages.length-4]);
				nonZodiacImages.push(allImages[allImages.length-3]);
				nonZodiacImages.push(allImages[allImages.length-2]);
				nonZodiacImages.push(allImages[allImages.length-1]);*/
				nonZodiacImages[0]['height'] = 100;
				nonZodiacImages[0]['resize_mode'] = 'contain';
				nonZodiacImages[0]['other_image'] = true;
				nonZodiacImages[0]['first_other_image'] = true;
				for (let i=1; i<nonZodiacImages.length; i++) {
					nonZodiacImages[i]['height'] = 220;
					nonZodiacImages[i]['resize_mode'] = 'stretch';
					nonZodiacImages[i]['other_image'] = true;
					nonZodiacImages[i]['first_other_image'] = false;
				}
				for (let i=0; i<nonZodiacImages.length; i++) {
					allImages.splice(allImages.length-1);
				}
				if ((allImages.length%2) != 0) {
					allImages.push('');
				}
				for (let i=0; i<allImages.length; i+=2) {
					images.push([
						allImages[i],
						allImages[i+1]
					]);
				}
				for (let i=0; i<nonZodiacImages.length; i++) {
					images.push([
						nonZodiacImages[i], ''
					]);
				}
				let tmpImages = [];
				let additionalIndex = 0;
				for (let i=0; i<images.length; i++) {
					if (i>0 && ((i+additionalIndex)%4) == 0) {
						tmpImages.push([{'type': 'ad', 'img': ''}, {'type': 'ad', 'img': ''}]);
						//additionalIndex++;
					}
					tmpImages.push(images[i]);
				}
				await this.setState({images: tmpImages});
			});
	}
	
	PredictionImage = ({item, height, resizeMode}) => {
		return (
			<View style={{ width: '100%', flexDirection: 'row' }}>
				<TouchableScale style={{ width: Dimensions.get('window').width/2-12, height: height, marginTop: 8, marginLeft: 8, marginRight: 4 }}
					onPress={() => {
						this.props.navigation.navigate('ViewImage', {
							'uri': {uri: USERDATA_URL+"tafsir/others/"+item[0]['img']}
						});
					}}>
					<FastImage source={{uri: USERDATA_URL+"tafsir/others/"+item[0]['img']}} style={{ width: '100%', height: '100%' }} resizeMode={resizeMode} />
				</TouchableScale>
				<TouchableScale style={{ width: Dimensions.get('window').width/2-12, height: height, marginTop: 8, marginLeft: 4, marginRight: 8 }}
					onPress={() => {
						this.props.navigation.navigate('ViewImage', {
							'uri': {uri: USERDATA_URL+"tafsir/others/"+item[1]['img']}
						});
					}}>
					<FastImage source={{uri: USERDATA_URL+"tafsir/others/"+item[1]['img']}} style={{ width: '100%', height: '100%' }} resizeMode={resizeMode} />
				</TouchableScale>
			</View>
		);
	};
	
	PredictionImageSingle = ({item, height, resizeMode}) => {
		return (
			<View style={{ width: '100%', flexDirection: 'row' }}>
				<TouchableScale style={{ width: Dimensions.get('window').width-12, height: height, marginTop: 8, marginLeft: 4, marginRight: 8 }}
					onPress={() => {
						this.props.navigation.navigate('ViewImage', {
							'uri': {uri: USERDATA_URL+"tafsir/others/"+item[0]['img']}
						});
					}}>
					<FastImage source={{uri: USERDATA_URL+"tafsir/others/"+item[0]['img']}} style={{ width: '100%', height: '100%' }} resizeMode={resizeMode} />
				</TouchableScale>
			</View>
		);
	};
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
				<View style={{ position: 'absolute', left: 0, top: 48, width: '100%', height: '100%', paddingTop: 32, paddingBottom: 32 }}>
					<FlatList
						style={{ width: '100%', marginBottom: 16 }}
						contentContainerStyle={{ paddingTop: 16, paddingBottom: 64 }}
						data={this.state.images}
						renderItem={({item, index}) => {
							log("INDEX: "+index+", height: "+item[0]['height']+", resize mode: "+item[0]['resize_mode']);
							if (item[0]['type'] == 'ad') {
								return (
									<View>
										<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32, marginBottom: 8 }} />
										{/*<this.PredictionImage item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />*/}
									</View>
								);
							} else {
								if (!item[0]['other_image']) {
									return (
										<this.PredictionImage item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
									);
								} else {
									if (item[0]['first_other_image']) {
										return (
											<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
										);
									} else {
										return (
											<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
										);
									}
								}
							}
							/*if (index > 0 && (index%4) == 0) {
								return (
									<View>
										<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }} />
										<this.PredictionImage item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
									</View>
								);
							} else {
								if (index < this.state.images.length-3) {
									return (
										<this.PredictionImage item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
									);
								} else {
									if (index == this.state.images.length-3) {
										return (
											<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
										);
									} else {
										return (
											<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
										);
									}
								}
							}*/
							/*
							if (index < this.state.images.length-3) {
								if (index > 0 && (index%4) == 0) {
									return (
										<View>
											<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }} />
											<this.PredictionImage item={item} />
										</View>
									);
								} else {
									return (
										<this.PredictionImage item={item} />
									);
								}
							} else {
								if (index == this.state.images.length-3) {
									return (
										<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
									);
								} else {
									return (
										<this.PredictionImageSingle item={item} height={item[0]['height']} resizeMode={item[0]['resize_mode']} />
									);
								}
							}
							*/
						}}
						keyExtractor={(item, index) => index.toString()} />
					{ this.state.progressVisible &&
					<View style={{ width: '100%', height: '100%', paddingBottom: 100, justifyContent: 'center', alignItems: 'center' }}>
						<Progress.Circle color='#FFFFFF' thickness={5} borderWidth={3} strokeCap='round' size={50} indeterminate={true} />
					</View>
					}
				</View>
				<View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<BannerAd />
				</View>
				<View style={{ position: 'absolute', left: 0, top: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/images/manual-banner.gif')} style={{ width: '100%', height: 50 }} />
				</View>
			</View>
		);
	}
}
