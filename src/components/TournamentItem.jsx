import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import defaultImage from '../assets/img/default.png';
import CustomIcon from './CustomIcon';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	$width: '100%',
	$iconSize: '12rem',
	item: {
		marginBottom: '20rem',
		borderRadius: 5,
		overflow: 'hidden',
	},
	backGround: {
		width: '$width',
		height: '$width * 0.31',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		resizeMode: "cover",
	},
	right: {
		width: '50%',
		height: '100%',
		paddingVertical: '5rem',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	rowText: {
		color: 'white',
		fontSize: '12rem',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: '6rem',
	},
	freeSpaces: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: '12rem',
	},
});

const TournamentItem = ({item}) => {
	const {COUNT_REGISTER_PLAYERS, COUNT_PLAYERS, CLUB_NAME, PRICE, START_DATE, GAME_PICTURE } = item;
	const navigation = useNavigation();
	const navigateToTournamentScreen = () => {
		navigation.navigate('Tournament', {item});
	};
	const price = !!PRICE ? `${PRICE.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} сом` : '';
	return (
		<TouchableOpacity
			style={styles.item}
			activeOpacity={0.7}
			onPress={navigateToTournamentScreen}
		>
			<ImageBackground
				imageStyle={{
					resizeMode: 'cover',
				}}
				source={!!GAME_PICTURE ? {uri: GAME_PICTURE} : defaultImage}
				style={styles.backGround}>
				<View style={styles.right}>
					<View style={styles.row}>
						<Text numberOfLines={1}
							  style={styles.freeSpaces}>
							{COUNT_REGISTER_PLAYERS} / {COUNT_PLAYERS}
						</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'arena'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{CLUB_NAME}</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'cup'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>
							{price}
						</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'players'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{COUNT_PLAYERS}</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'date'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{START_DATE}</Text>
					</View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default TournamentItem;
