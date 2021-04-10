import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, NativeModules, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main.js';
import Home from './screens/Home.js';
import TafsirMimpi2A from './screens/TafsirMimpi2A.js';
import TafsirMimpi3A from './screens/TafsirMimpi3A.js';
import TafsirMimpi4A from './screens/TafsirMimpi4A.js';
import TafsirMimpiFull from './screens/TafsirMimpiFull.js';
import TafsirMimpiOthers from './screens/TafsirMimpiOthers.js';
import ViewImage from './screens/ViewImage.js';
import Settings from './screens/Settings.js';
import About from './screens/About.js';
import global from './global.js';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {name: string.app_name};
	}
	
	componentDidMount() {
		LogBox.ignoreAllLogs();
		readBoolean("subscribe", true, (subscribe) => {
			if (subscribe) {
				messaging()
		  			.subscribeToTopic('tafsir')
				    .then(() => console.log('Subscribed to topic!'));
			} else {
				messaging()
					.unsubscribeFromTopic('tafsir')
  					.then(() => console.log('Unsubscribed fom the topic!'));
			}
		});
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			log(remoteMessage);
	    	NativeModules.AndroidUtil.showNotification(remoteMessage['notification']['title'], remoteMessage['notification']['body']);
	    });
	}
	
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Main" component={Main} options={({route}) => ({
						headerShown: false,
						headerTitle: '',
						headerLeft: () => (
							<View />
						)
					})} />
					<Stack.Screen name="Home" component={Home} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.app_name.toUpperCase(),
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerLeft: () => (
							<View />
						),
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="TafsirMimpi2A" component={TafsirMimpi2A} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.text3,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="TafsirMimpi3A" component={TafsirMimpi3A} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.text4,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="TafsirMimpi4A" component={TafsirMimpi4A} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.text5,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="TafsirMimpiFull" component={TafsirMimpiFull} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.text6,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="TafsirMimpiOthers" component={TafsirMimpiOthers} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.others,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
								onPress={() => navigation.navigate('Settings')}>
								<Image source={require('./assets/images/settings.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
							</TouchableOpacity>
						) })} />
					<Stack.Screen name="ViewImage" component={ViewImage} options={({ navigation }) => ({ headerShown: false })} />
					<Stack.Screen name="Settings" component={Settings} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.settings,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<View />
						) })} />
					<Stack.Screen name="About" component={About} options={({ navigation }) => ({ headerShown: true,
						headerTitle: string.text7,
						headerStyle: {
							backgroundColor: '#343434'
						},
						headerTitleStyle: {
							textAlign:"center", 
        					flex: 1
        				},
						headerTintColor: '#FFFFFF',
						headerRight: () => (
							<View />
						) })} />
				</Stack.Navigator>
    		</NavigationContainer>
		);
	}
}
