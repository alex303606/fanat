import React, { useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TournamentsSwitcher from '../components/TournamentsSwitcher';
import SingleTournaments from '../components/SingleTournaments';
import MultiTournaments from '../components/MultiTournaments';

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

const TournamentsScreen = () => {
	const [selectedValue, setSelectedValue] = useState('single');
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<TournamentsSwitcher
					changeValue={setSelectedValue}
					selected={selectedValue}
				/>
				<View style={styles.title}>
					<View style={styles.titleInner}>
						<Text style={styles.titleText}>Мои турниры</Text>
					</View>
				</View>
				{selectedValue === 'single' ?
					<SingleTournaments/> : <MultiTournaments/>
				}
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(null, mapDispatchToProps)(TournamentsScreen);
