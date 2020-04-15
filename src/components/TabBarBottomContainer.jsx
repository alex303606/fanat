import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';

const TabBarBottomContainer = ({state, descriptors, navigation}) => {
	return (
		<View style={{flexDirection: 'row'}}>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;
				
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
						style={{flex: 1}}
					>
						<CustomIcon
							color={'blue'}
							name={route.name}
							size={30}/>
						<Text style={{color: isFocused ? 'white' : 'red'}}>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TabBarBottomContainer;
