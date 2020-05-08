import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import TournamentsSwitcher from '../components/TournamentsSwitcher';
import SingleTournaments from '../components/SingleTournaments';
import MultiTournaments from '../components/MultiTournaments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTournaments } from '../store/actions/tournaments';
import TournamentItem from '../components/TournamentItem';

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
	const [selectedValue, setSelectedValue] = useState('single');
	
	useEffect(() => {
		onRefresh();
	}, []);
	
	const [refreshing, setRefreshing] = useState(false);
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		
		props.getTournaments().then(() => {
			setRefreshing(false);
		});
	}, [refreshing]);
	
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
	const filter = (tournaments, value) => {
		return tournaments.reduce((acc, item) => {
			const items = item.data.filter(x => x.TYPE === value);
			if (!!items.length) {
				acc.push({...item, data: items});
			}
			return acc;
		}, []);
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<TournamentsSwitcher
					changeValue={setSelectedValue}
					selected={selectedValue}
				/>
				{selectedValue === 'single' ?
					<SingleTournaments
						refreshing={refreshing}
						onRefresh={onRefresh}
						tournaments={filter(props.tournaments, 'ONE')}
						renderSectionHeader={renderSectionHeader}
						sectionKeyExtractor={sectionKeyExtractor}
						renderItem={renderItem}
					/> :
					<MultiTournaments
						refreshing={refreshing}
						onRefresh={onRefresh}
						tournaments={filter(props.tournaments, 'COMMAND')}
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
			getTournaments,
		},
		dispatch);
};

const mapStateToProps = state => ({
	tournaments: state.tournaments.tournaments,
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsScreen);
