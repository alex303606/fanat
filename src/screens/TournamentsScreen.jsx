import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import TournamentsSwitcher from '../components/TournamentsSwitcher';
import SingleTournaments from '../components/SingleTournaments';
import MultiTournaments from '../components/MultiTournaments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCommandTournaments, getOneTournaments, setTournamentType } from '../store/actions/tournaments';
import TournamentItem from '../components/TournamentItem';
import { getPlayer } from '../store/actions/profile';

const styles = EStyleSheet.create({
	page: {
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
		flex: 1,
	},
	myTournaments: {
		paddingTop: '10rem',
	},
	title: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: '15rem',
	},
	titleText: {
		color: 'white',
		paddingVertical: '3rem',
		paddingHorizontal: '15rem',
		fontWeight: 'bold',
		fontSize: '14rem',
	},
	titleInner: {
		backgroundColor: '#D51E49',
		borderRadius: 5,
		overflow: 'hidden',
	},
});

const TournamentsScreen = (props) => {
	useEffect(() => {
		props.getOneTournaments();
		props.getCommandTournaments();
		props.getPlayer();
	}, []);
	
	const renderSectionHeader = ({section: {title}}) => {
		return (
			<View style={styles.title}>
				<View style={styles.titleInner}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
			</View>
		);
	};
	
	const sectionKeyExtractor = item => item.ID;
	const renderItem = ({item}) => <TournamentItem item={item}/>;
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<TournamentsSwitcher
					changeValue={props.setTournamentType}
					selected={props.tournamentType}
				/>
				{props.tournamentType === 'ONE' ?
					<SingleTournaments
						renderSectionHeader={renderSectionHeader}
						sectionKeyExtractor={sectionKeyExtractor}
						renderItem={renderItem}
					/> :
					<MultiTournaments
						renderSectionHeader={renderSectionHeader}
						sectionKeyExtractor={sectionKeyExtractor}
						renderItem={renderItem}
					/>
				}
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getCommandTournaments,
			getOneTournaments,
			setTournamentType,
			getPlayer,
		},
		dispatch);
};

const mapStateToProps = state => ({
	tournamentType: state.tournaments.tournamentType,
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsScreen);
