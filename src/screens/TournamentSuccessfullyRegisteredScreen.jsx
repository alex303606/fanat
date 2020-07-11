import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import TournamentItem from '../components/TournamentItem';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
	},
	text: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '20rem',
	},
	title: {
		color: 'white',
		fontSize: '15rem',
		lineHeight: '23rem',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	footer: {
		paddingVertical: '20rem',
	},
});

const TournamentSuccessfullyRegisteredScreen = (props) => {
	let item, addedToTeamId, addedToTeam, team = undefined;
	if (props.route && props.route.params) {
		const {route: {params}} = props;
		if (params.item) {
			item = params.item;
		}
		if (!!params.COMMAND_ID) {
			addedToTeamId = params.COMMAND_ID;
		}
		if (!!params.ACTION && params.ACTION === 'ADD_TO_COMMAND') {
			addedToTeam = true;
		}
	}
	
	if (addedToTeam && !!addedToTeamId) {
		team = props.allCommands.find(x => x.ID === addedToTeamId.toString());
	}
	
	const navigation = useNavigation();
	
	const navigateToHome = () => {
		navigation.navigate('Tournaments');
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				{!!item && <TournamentItem item={item}/>}
				<View style={styles.text}>
					<Text style={styles.title}>Поздравляем!</Text>
					<Text style={styles.title}>
						{addedToTeam ?
							`Вы успешно добавлены в комманду${(team && !!team.NAME) ? ` ${team.NAME}` : ''}.`
							: 'Вы успешно зарегистрированы в турнире.'
						}
					</Text>
				</View>
				<View style={styles.footer}>
					<Button
						onPress={navigateToHome}
						title={'Готово'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const mapStateToProps = state => {
	return {
		allCommands: state.stats.command,
	};
};

export default connect(mapStateToProps, null)(TournamentSuccessfullyRegisteredScreen);
