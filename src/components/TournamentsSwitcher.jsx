import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomIcon from './CustomIcon';

const styles = EStyleSheet.create({
	text: {
		fontSize: '12rem',
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		paddingHorizontal: '5rem',
		flex: 1,
		textAlign: 'center',
	},
	switch: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#D51E49',
		borderRadius: 5,
	},
	item: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: '10rem',
		paddingVertical: '5rem',
		justifyContent: 'space-between',
		backgroundColor: 'transparent',
		flexWrap: 'nowrap',
	},
	active: {
		backgroundColor: '#D51E49',
	},
	$iconSize: '20rem',
});

const TournamentsSwitcher = (props) => {
	return (
		<View style={styles.switch}>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => props.changeValue('ONE')}
				style={[styles.item, props.selected === 'ONE' && styles.active]}>
				<CustomIcon
					color={'white'}
					name={'single'}
					size={styles.$iconSize}/>
				<Text numberOfLines={1} style={styles.text}>Одиночные</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => props.changeValue('COMMAND')}
				style={[styles.item, props.selected === 'COMMAND' && styles.active]}>
				<Text numberOfLines={1} style={styles.text}>Командные</Text>
				<CustomIcon
					color={'white'}
					name={'multi'}
					size={styles.$iconSize}/>
			</TouchableOpacity>
		</View>
	);
};

export default TournamentsSwitcher;
