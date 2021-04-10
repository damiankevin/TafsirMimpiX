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
import { Picker } from '@react-native-picker/picker';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import global from '../global.js';
import NativeAd from '../components/NativeAd.js';
import BannerAd from '../components/BannerAd.js';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
	const paddingToBottom = 20;
	return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export default class TafsirMimpiFull extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedNumber: 0,
			selectedType: 'tafsir2a',
			images2a: [],
			images3a: [],
			images4a: [],
			numbers: [],
			keyword: '',
			progressVisible: true,
			start: 0,
			length: 10
		};
	}
	
	async componentDidMount() {
		this.getData(false);
	}
	
	async getData(next) {
		if (!next) {
			await this.setState({images2a: [], images3a: [], images4a: []});
		}
		//await this.setState({progressVisible: true});
		let fd = new FormData();
		fd.append("start", this.state.start);
		fd.append("length", this.state.length);
		if (this.state.selectedType == 'tafsir2a') {
			fetch(API_URL+"/user/get_all_numbers_2a", {
				method: 'POST',
				body: fd
			})
			.then(response => response.text())
			.then(async (response) => {
				await this.setState({progressVisible: false});
				let images = this.state.images2a;
				let tmpImages = JSON.parse(response);
				for (let i=0; i<tmpImages.length; i++) {
					images.push(tmpImages[i]);
				}
				await this.setState({images2a: images});
			});
		} else if (this.state.selectedType == 'tafsir3a') {
			fetch(API_URL+"/user/get_all_numbers_3a", {
				method: 'POST',
				body: fd
			})
			.then(response => response.text())
			.then(async (response) => {
				log(response);
				await this.setState({progressVisible: false});
				let images = this.state.images3a;
				let tmpImages = JSON.parse(response);
				for (let i=0; i<tmpImages.length; i++) {
					images.push(tmpImages[i]);
				}
				await this.setState({images3a: images});
			});
		} else if (this.state.selectedType == 'tafsir4a') {
			fetch(API_URL+"/user/get_all_numbers_4a", {
				method: 'POST',
				body: fd
			})
			.then(response => response.text())
			.then(async (response) => {
				await this.setState({progressVisible: false});
				let images = this.state.images4a;
				let tmpImages = JSON.parse(response);
				for (let i=0; i<tmpImages.length; i++) {
					images.push(tmpImages[i]);
				}
				await this.setState({images4a: images});
			});
		}
	}
	
	PredictionImage = ({index, item}) => {
		return (
			<TouchableScale style={{ width: Dimensions.get('window').width-16-16, height: 220, marginTop: 16, marginLeft: 16, marginRight: 16 }}
				onPress={() => {
					this.props.navigation.navigate('ViewImage', {
						'uri': {uri: USERDATA_URL+"tafsir/2a/"+item['image']}
					});
				}}>
				<FastImage source={{uri: USERDATA_URL+"tafsir/2a/"+item['image'] }} style={{ width: '100%', height: '100%' }}
					resizeMode="contain" />
			</TouchableScale>
		);
	};
	
	PredictionText3A = ({index, item}) => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginRight: 8 }}>
									<View style={{ width: '50%', height: 70, backgroundColor: '#FFFFFF', borderRadius: 4, padding: 8,
										justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
										<Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
											{"\""+item['keyword']+"\""}
										</Text>
										<View style={{ width: 40, height: 7, backgroundColor: '#e53935', borderRadius: 4, position: 'absolute',
											top: 8, left: 8 }} />
									</View>
									<View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
										<View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 50, height: 50 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 50, height: 50 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 50, height: 42, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(0, 1)}
													</Text>
												</View>
											</View>
										</View>
										<View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 50, height: 50 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 50, height: 50 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 50, height: 42, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(1, 1)}
													</Text>
												</View>
											</View>
										</View>
										<View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 50, height: 50 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 50, height: 50 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 50, height: 42, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(2, 1)}
													</Text>
												</View>
											</View>
										</View>
									</View>
								</View>
		);
	};
	
	PredictionText4A = ({index, item}) => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginRight: 8 }}>
									<View style={{ width: '50%', height: 70, backgroundColor: '#FFFFFF', borderRadius: 4, padding: 8,
										justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
										<Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>
											{"\""+item['keyword']+"\""}
										</Text>
										<View style={{ width: 40, height: 7, backgroundColor: '#e53935', borderRadius: 4, position: 'absolute',
											top: 8, left: 8 }} />
									</View>
									<View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
										<View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 40, height: 40 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 40, height: 40 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 32, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(0, 1)}
													</Text>
												</View>
											</View>
										</View>
										<View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 40, height: 40 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 40, height: 40 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 32, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(1, 1)}
													</Text>
												</View>
											</View>
										</View>
										<View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 40, height: 40 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 40, height: 40 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 32, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(2, 1)}
													</Text>
												</View>
											</View>
										</View>
										<View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ position: 'relative', width: 40, height: 40 }}>
												<Image source={require('../assets/images/img08.png')} style={{ width: 40, height: 40 }}
													resizeMode="contain" />
												<View style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 32, justifyContent: 'center',
													alignItems: 'center' }}>
													<Text style={{ color: '#000000', fontSize: 17, fontWeight: 'bold' }}>
														{item['number'].substr(3, 1)}
													</Text>
												</View>
											</View>
										</View>
									</View>
								</View>
		);
	};
	
	async prev() {
		if (this.state.start >= this.state.length) {
			await this.setState({start: this.state.start-this.state.length});
			this.getData(false);
		} else if (this.state.start > 0) {
			await this.setState({start: 0});
			this.getData(false);
		}
	}
	
	async next() {
		await this.setState({start: this.state.start+this.state.length});
		this.getData(false);
	}
	
	async loadMore() {
		await this.setState({start: this.state.start+this.state.length});
		this.getData(true);
	}
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
				<View style={{ position: 'absolute', left: 0, top: 48, width: '100%', height: '100%', paddingTop: 32, paddingBottom: 32 }}>
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '40%', justifyContent: 'center' }}>
							<Text style={{ color: '#FFFFFF', fontSize: 15, marginLeft: 12 }}>{string.text11}</Text>
						</View>
						<View style={{ width: '60%', justifyContent: 'center' }}>
							<LinearGradient colors={['#fce3c9', '#fefbf9']} style={{ marginLeft: 8, marginRight: 12, height: 45, flexDirection: 'row',
								alignItems: 'center', justifyContent: 'space-between', borderRadius: 6, position: 'relative' }} useAngle={true} angle={90}>
								<Picker
  									selectedValue={this.state.selectedType}
  									style={{height: 50, width: '100%'}}
  									mode='dropdown'
  									onValueChange={async (itemValue, itemIndex) => {
    									await this.setState({selectedType: itemValue, start: 0});
    									this.getData(false);
  									}}>
  									<Picker.Item label={string.text3} value="tafsir2a" />
  									<Picker.Item label={string.text4} value="tafsir3a" />
  									<Picker.Item label={string.text5} value="tafsir4a" />
								</Picker>
								<Image source={require('../assets/images/triangle.png')} style={{ width: 15, height: 15, marginRight: 8,
									position: 'absolute', top: 16, right: 8 }}
									resizeMode="contain" />
							</LinearGradient>
						</View>
					</View>
					{ (this.state.selectedType == 'tafsir2a' && !this.state.progressVisible) &&
					<FlatList
						style={{ width: '100%', marginTop: 16, marginBottom: 16 }}
						contentContainerStyle={{ paddingBottom: 64 }}
						data={this.state.images2a}
						onEndReached={() => this.loadMore()}
						renderItem={({index, item}) => {
							if (index > 0 && (index%8) == 0) {
								return (
									<View>
										<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }} />
										<this.PredictionImage index={index} item={item} />
									</View>
								);
							}
							return (
								<this.PredictionImage index={index} item={item} />
							);
						}}
						keyExtractor={(item, index) => index.toString()} />
					}
					{ (this.state.selectedType == 'tafsir3a' && !this.state.progressVisible) &&
					<FlatList
						style={{ width: '100%', marginBottom: 16 }}
						contentContainerStyle={{ paddingTop: 16, paddingBottom: 64 }}
						data={this.state.images3a}
						onEndReached={() => this.loadMore()}
						renderItem={({index, item}) => {
							log("Number: "+item['number']+", data type: "+typeof(item['number']));
							if (index > 0 && (index%8) == 0) {
								return (
									<View>
										<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32, marginBottom: 8 }} />
										<this.PredictionText3A index={index} item={item} />
									</View>
								);
							}
							return (
								<this.PredictionText3A index={index} item={item} />
							);
						}}
						keyExtractor={(item, index) => index.toString()} />
					}
					{ (this.state.selectedType == 'tafsir4a' && !this.state.progressVisible) &&
					<FlatList
						style={{ width: '100%', marginBottom: 16 }}
						contentContainerStyle={{ paddingTop: 16, paddingBottom: 64 }}
						data={this.state.images4a}
						onEndReached={() => this.loadMore()}
						renderItem={({index, item}) => {
							if (index > 0 && (index%8) == 0) {
								return (
									<View>
										<NativeAd style={{ marginTop: 16, marginLeft: 32, marginRight: 32, marginBottom: 8 }} />
										<this.PredictionText4A index={index} item={item} />
									</View>
								);
							}
							return (
								<this.PredictionText4A index={index} item={item} />
							);
						}}
						keyExtractor={(item, index) => index.toString()} />
					}
					{ this.state.progressVisible &&
					<View style={{ width: '100%', height: '100%', paddingBottom: 100, justifyContent: 'center', alignItems: 'center' }}>
						<Progress.Circle color='#FFFFFF' thickness={5} borderWidth={3} strokeCap='round' size={50} indeterminate={true} />
					</View>
					}
					{/* <NativeAd style={{ marginLeft: 32, marginRight: 32 }} /> */}
				</View>
				<View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
					{/*<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
						<TouchableScale style={{ width: 80, height: 45, backgroundColor: '#FFFF00', borderRadius: 30, justifyContent: 'center',
							alignItems: 'center' }}
							onPress={() => this.prev()}>
							<Text style={{ color: '#663333', fontSize: 17, fontWeight: 'bold' }}>Prev</Text>
						</TouchableScale>
						<TouchableScale style={{ width: 80, height: 45, backgroundColor: '#FFFF00', borderRadius: 30, justifyContent: 'center',
							alignItems: 'center', marginLeft: 8 }}
							onPress={() => this.next()}>
							<Text style={{ color: '#663333', fontSize: 17, fontWeight: 'bold' }}>Next</Text>
						</TouchableScale>
					</View>*/}
					<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
						<BannerAd />
					</View>
				</View>
				<View style={{ position: 'absolute', left: 0, top: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/images/manual-banner.gif')} style={{ width: '100%', height: 50 }} />
				</View>
			</View>
		);
	}
}
