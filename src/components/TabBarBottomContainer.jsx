import React from 'react';
import { View, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import CustomIcon from './CustomIcon';
import EStyleSheet from 'react-native-extended-stylesheet';
import Scan from '../assets/img/scan.png';
import Footer from '../assets/img/footer.png';

const cameraBtnSize = Dimensions.get('window').width / 5.294;

const styles = EStyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		borderTopRightRadius: '15rem',
		borderTopLeftRadius: '15rem',
	},
	tab: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	$30: '30rem',
	$40: '40rem',
	cameraBtn: {
		position: 'absolute',
		top: 0,
		left: '50%',
		transform: [
			{translateX: -cameraBtnSize / 2},
			{translateY: -cameraBtnSize / 2},
		],
	},
	cameraImage: {
		width: cameraBtnSize,
		height: cameraBtnSize,
	},
});
const TabBarBottomContainer = ({state, descriptors, navigation}) => {
	const renderItem = (route, index) => {
		const {options} = descriptors[route.key];
		const isFocused = state.index === index;
		const onPress = () => {
			const event = navigation.emit({
				type: 'tabPress',
				target: route.key,
				canPreventDefault: true,
			});
			
			if (!isFocused && !event.defaultPrevented) {
				navigation.navigate(route.name);
			}
		};
		
		const onLongPress = () => {
			navigation.emit({
				type: 'tabLongPress',
				target: route.key,
			});
		};
		
		return (
			<TouchableOpacity
				key={index}
				accessibilityRole="button"
				accessibilityStates={isFocused ? ['selected'] : []}
				accessibilityLabel={options.tabBarAccessibilityLabel}
				testID={options.tabBarTestID}
				onPress={onPress}
				onLongPress={onLongPress}
				style={[
					styles.tab,
					{
						marginRight: index === 1 ? styles.$40 : 0,
						marginLeft: index === 2 ? styles.$40 : 0,
					},
				]}
			>
				<CustomIcon
					color={isFocused ? '#19112C' : '#B0B0B0'}
					name={route.name}
					size={styles.$30}/>
			</TouchableOpacity>
		);
	};
	
	return (
		<View style={{backgroundColor: '#19112c'}}>
			<ImageBackground
				imageStyle={{resizeMode: 'contain'}}
				source={Footer}
				style={[styles.tabBar, {
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').width / 6.7,
				}]}
			>
				{state.routes.map(renderItem)}
				<TouchableOpacity
					onPress={() => navigation.navigate('Scanner')}
					style={styles.cameraBtn}
				>
					<Image
						resizeMode={'cover'}
						style={styles.cameraImage}
						source={Scan}/>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default TabBarBottomContainer;
