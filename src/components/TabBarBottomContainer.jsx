import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopRightRadius: '15rem',
		borderTopLeftRadius: '15rem',
	},
	tab: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	$30: '30rem',
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
				style={styles.tab}
			>
				<CustomIcon
					color={isFocused ? '#19112C' : '#B0B0B0'}
					name={route.name}
					size={styles.$30}/>
			</TouchableOpacity>
		);
	};
	
	return (
		<View style={{backgroundColor: '#19112C'}}>
			<View style={styles.tabBar}>
				{state.routes.map(renderItem)}
			</View>
		</View>
	);
};

export default TabBarBottomContainer;
