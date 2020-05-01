import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import defaultImage from '../assets/img/default.png';
import CustomIcon from './CustomIcon';
import { useNavigation } from '@react-navigation/native';

const images = {
	fifa: require('../assets/img/fifa.png'),
	ufc: require('../assets/img/ufc.png'),
	pes: require('../assets/img/pes.png'),
	cs: require('../assets/img/cs.png'),
	dota: require('../assets/img/dota.png'),
	warface: require('../assets/img/warface.png'),
};

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
	const {type, players, maxPlayers, address, price, date} = item;
	const navigation = useNavigation();
	const navigateToTournamentScreen = () => {
		navigation.navigate('Tournament', {item});
	};
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
				source={type && images[type] ? images[type] : defaultImage}
				style={styles.backGround}>
				<View style={styles.right}>
					<View style={styles.row}>
						<Text numberOfLines={1}
							  style={styles.freeSpaces}>
							{players} / {maxPlayers}
						</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'arena'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{address}</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'cup'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1}
							  style={styles.rowText}>{price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} сом</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'players'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{maxPlayers}</Text>
					</View>
					<View style={styles.row}>
						<CustomIcon
							style={styles.icon}
							color={'white'}
							name={'date'}
							size={styles.$iconSize}/>
						<Text numberOfLines={1} style={styles.rowText}>{date}</Text>
					</View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default TournamentItem;
