import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import TournamentsSwitcher from '../components/TournamentsSwitcher';
import SingleTournaments from '../components/SingleTournaments';
import MultiTournaments from '../components/MultiTournaments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTournaments, loadMoreTournaments } from '../store/actions/tournaments';
import TournamentItem from '../components/TournamentItem';
import config from '../../config';

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
	footer: {
		paddingBottom: '20rem',
	},
});

const allowLoadMore = (obj) => {
	const quantity = Object.values(obj).reduce((acc, x) => {
		return acc + x.length;
	}, 0);
	return quantity < config.PAGE_SIZE;
};

const TournamentsScreen = (props) => {
	let calledLoading = true;
	const [selectedValue, setSelectedValue] = useState('single');
	let [page, setPage] = useState(2);
	const [refreshing, setRefreshing] = useState(false);
	const [listOfTournamentsEnded, setListOfTournamentsEnded] = useState(false);
	const onMomentumScrollBegin = () => calledLoading = false;
	
	useEffect(() => {
		onRefresh();
	}, []);
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		props.getTournaments().then((res) => {
			setListOfTournamentsEnded(allowLoadMore(res));
			setRefreshing(false);
			setPage(2);
		});
	}, [refreshing]);
	
	const handleLoadMore = () => {
		if (refreshing || calledLoading || listOfTournamentsEnded) {
			return;
		}
		console.log('handleLoadMore');
		setRefreshing(true);
		props.loadMoreTournaments(page).then((res) => {
			setListOfTournamentsEnded(allowLoadMore(res));
			setRefreshing(false);
			setPage(++page);
		});
	};
	
	const filter = (value) => {
		return props.tournaments.reduce((acc, item) => {
			const items = item.data.filter(x => {
				return x.TYPE === value;
			});
			if (!!items.length) {
				acc.push({...item, data: items});
			}
			return acc;
		}, []);
	};
	
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
	
	const renderFooter = () => {
		if (!refreshing) {
			return <View/>;
		}
		return <ActivityIndicator
			style={styles.footer}
			color={'white'}
			animating
			size='large'/>;
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
						tournaments={filter('ONE')}
						renderSectionHeader={renderSectionHeader}
						sectionKeyExtractor={sectionKeyExtractor}
						renderItem={renderItem}
						renderFooter={renderFooter}
						getTournaments={props.getTournaments}
						handleLoadMore={handleLoadMore}
						onMomentumScrollBegin={onMomentumScrollBegin}
					/> :
					<MultiTournaments
						refreshing={refreshing}
						onRefresh={onRefresh}
						tournaments={filter('COMMAND')}
						renderSectionHeader={renderSectionHeader}
						sectionKeyExtractor={sectionKeyExtractor}
						renderItem={renderItem}
						renderFooter={renderFooter}
						getTournaments={props.getTournaments}
						handleLoadMore={handleLoadMore}
						onMomentumScrollBegin={onMomentumScrollBegin}
					/>
				}
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getTournaments,
			loadMoreTournaments,
		},
		dispatch);
};

const mapStateToProps = state => ({
	tournaments: state.tournaments.tournaments,
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsScreen);
