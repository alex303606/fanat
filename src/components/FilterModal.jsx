import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomModal from './CustomModal';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	getGames,
	filterByGameIdCommand,
	filterByGameIdOne,
	setTournamentType,
} from '../store/actions/tournaments';
import ImageWithLoader from './ImageWithLoader';
import TournamentsSwitcher from './TournamentsSwitcher';

const styles = EStyleSheet.create({
	title: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '14rem',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: '10rem',
	},
	headerButton: {
		color: '#D51E49',
		textTransform: 'uppercase',
		fontSize: '14rem',
		fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: '10rem',
		marginBottom: '20rem',
		borderBottomWidth: 1,
		borderColor: 'white',
	},
	contentContainerStyle: {
		flexGrow: 1,
		paddingVertical: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	imageWithLoader: {
		width: '100%',
		height: '40rem',
	},
	game: {
		width: '48%',
		justifyContent: 'center',
		borderRadius: '5rem',
		marginVertical: '10rem',
		padding: '10rem',
	},
});

const FilterModal = (props) => {
	useEffect(() => {
		props.getGames();
	}, []);
	const [selectedGameOne, selectGameOne] = useState(undefined);
	const [selectedGameCommand, selectGameCommand] = useState(undefined);
	
	const acceptFilter = () => {
		props.filterByGameIdOne(selectedGameOne);
		props.filterByGameIdCommand(selectedGameCommand);
		setTimeout(props.changeModalVisibleHandler, 1000);
	};
	
	const resetFilter = () => {
		selectGameOne(undefined);
		selectGameCommand(undefined);
		props.filterByGameIdOne(undefined);
		props.filterByGameIdCommand(undefined);
		setTimeout(props.changeModalVisibleHandler, 1000);
	};
	
	const renderGame = game => {
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => selectGameOne(game.ID)}
				key={game.ID}
				style={[styles.game, game.ID === selectedGameOne && {backgroundColor: '#D51E49'}]}
			>
				<ImageWithLoader
					resizeMode='contain'
					style={styles.imageWithLoader}
					source={game.ICON}
				/>
			</TouchableOpacity>
		);
	};
	
	const renderCommandGame = game => {
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => selectGameCommand(game.ID)}
				key={game.ID}
				style={[styles.game, game.ID === selectedGameCommand && {backgroundColor: '#D51E49'}]}
			>
				<ImageWithLoader
					resizeMode='contain'
					static
					style={styles.imageWithLoader}
					source={game.ICON}
				/>
			</TouchableOpacity>
		);
	};
	
	return (
		<CustomModal
			modalVisible={props.modalVisible}
			setModalVisible={props.changeModalVisibleHandler}
		>
			<Text style={styles.title}>Фильтрация игр</Text>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.5} onPress={acceptFilter}>
					<Text style={styles.headerButton}>Применить</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.5} onPress={resetFilter}>
					<Text style={styles.headerButton}>Сбросить</Text>
				</TouchableOpacity>
			</View>
			<TournamentsSwitcher
				changeValue={props.setTournamentType}
				selected={props.tournamentType}
			/>
			{props.tournamentType === 'ONE' ?
				<ScrollView contentContainerStyle={styles.contentContainerStyle}>
					{props.games.map(renderGame)}
				</ScrollView>
				: <ScrollView contentContainerStyle={styles.contentContainerStyle}>
					{props.games.map(renderCommandGame)}
				</ScrollView>
			}
		</CustomModal>
	);
};

const mapStateToProps = state => ({
	games: state.tournaments.games,
	tournamentType: state.tournaments.tournamentType,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getGames,
			filterByGameIdOne,
			filterByGameIdCommand,
			setTournamentType,
		},
		dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
