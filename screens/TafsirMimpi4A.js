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
import global from '../global.js';
import NativeAd from '../components/NativeAd.js';
import BannerAd from '../components/BannerAd.js';

export default class TafsirMimpi2A extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedNumber: 0,
			selectedType: 'kata',
			images: [],
			numbers: [],
			keyword: '',
			progressVisible: false
		};
	}
	
	async componentDidMount() {
	}
	
	async chooseType() {
		NativeModules.AndroidUtil.showListDialog(JSON.stringify([string.text9, string.text2]), async (position) => {
			if (position == 0) {
				await this.setState({selectedType: 'kata'});
			} else if (position == 1) {
				await this.setState({selectedType: 'angka'});
			}
		});
	}
	
	async search() {
		readInt("total_tafsir_2a_ads_clicked", 0, (total) => {
			total++;
			if (total == 1 || (total%5) == 0) {
				showInterstitialAd();
			}
			writeInt("total_tafsir_2a_ads_clicked", total);
		});
		let keyword = this.state.keyword.trim().toLowerCase();
		if (keyword == "") {
			show(string.text10);
			return;
		}
		if (this.state.selectedType == 'angka' && keyword.length != 4) {
			show(string.text14);
			return;
		}
		await this.setState({progressVisible: true});
		let fd = new FormData();
		fd.append("keyword", keyword);
		fd.append("type", this.state.selectedType);
		fetch(API_URL+"/user/get_numbers_4a", {
			method: 'POST',
			body: fd
		})
		.then(response => response.text())
		.then(async (response) => {
			log(response);
			await this.setState({progressVisible: false});
			let images = JSON.parse(response);
			await this.setState({images});
		});
	}
	
	PredictionImage = ({index, item}) => {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginRight: 8 }}>
									<View style={{ width: '50%', height: 70, backgroundColor: '#FFFFFF', borderRadius: 4, padding: 8,
										justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
										<Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>{"\""+item['keyword']+"\""}</Text>
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
	
	render() {
		return (
			<View style={{ width: '100%', height: '100%', flex: 1 }}>
				<Image source={require('../assets/images/bg.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
				<View style={{ position: 'absolute', left: 0, top: 48, width: '100%', height: '100%', paddingTop: 32, paddingBottom: 32 }}>
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ width: '50%', justifyContent: 'center' }}>
							<Text style={{ color: '#FFFFFF', fontSize: 15, marginLeft: 12 }}>{string.text1}</Text>
						</View>
						<TouchableScale style={{ width: '50%', justifyContent: 'center' }}
							onPress={() => this.chooseType()}>
							<LinearGradient colors={['#fce3c9', '#fefbf9']} style={{ marginLeft: 8, marginRight: 12, height: 45, flexDirection: 'row',
								alignItems: 'center', justifyContent: 'space-between', borderRadius: 6 }} useAngle={true} angle={90}>
								<Text style={{ color: '#000000', fontSize: 15, marginLeft: 8 }}>
									{this.state.selectedType=='kata'?string.text9:string.text2}
								</Text>
								<Image source={require('../assets/images/triangle.png')} style={{ width: 15, height: 15, marginRight: 8 }}
									resizeMode="contain" />
							</LinearGradient>
						</TouchableScale>
					</View>
					<View style={{ marginLeft: 8, marginRight: 8, position: 'relative', marginTop: 32, height: 55 }}>
						<TextInput style={{ height: '100%', backgroundColor: '#FFFFFF', borderRadius: 8, fontSize: 15, paddingLeft: 12, paddingRight: 12,
							color: '#000000' }}
							value={this.state.keyword}
							onChangeText={async (value) => await this.setState({keyword: value})}
							maxLength={this.state.selectedType=='angka'?4:100}
							placeholder={string.find}
							placeholderTextColor="#888888" />
						<TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, width: 55, height: '100%', borderTopRightRadius: 8,
							borderBottomRightRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fce4cb' }}
							onPress={() => this.search()}>
							<Image source={require('../assets/images/search.png')} style={{ width: 18, height: 18 }} resizeMode="contain" />
						</TouchableOpacity>
					</View>
					<FlatList
						style={{ width: '100%', marginBottom: 16 }}
						contentContainerStyle={{ paddingTop: 16, paddingBottom: 64 }}
						data={this.state.images}
						renderItem={({index, item}) => {
							if (index > 0 && (index%4) == 0) {
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
