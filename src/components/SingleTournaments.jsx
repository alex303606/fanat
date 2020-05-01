import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import TournamentItem from './TournamentItem';
import { bindActionCreators } from 'redux';
import { getSingleTournaments } from '../store/actions/tournaments';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
	},
});

const SingleTournaments = (props) => {
	useEffect(() => {
		onRefresh();
	}, []);
	
	const [refreshing, setRefreshing] = useState(false);
	const sectionKeyExtractor = item => item.id;
	
	const renderItem = ({item}) => {
		return <TournamentItem item={item}/>;
	};
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		
		props.getSingleTournaments().then(() => {
			setRefreshing(false);
		});
	}, [refreshing]);
	
	return (
		<View style={styles.page}>
			<FlatList
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={false}
				scrollEnabled
				scrollEventThrottle={16}
				data={props.singleTournaments}
				contentContainerStyle={{flexGrow: 1}}
				renderItem={renderItem}
				keyExtractor={sectionKeyExtractor}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						title="Загружаем турниры"
						tintColor='white'
						titleColor='white'
					/>
				}
			/>
		</View>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getSingleTournaments,
		},
		dispatch);
};

const mapStateToProps = state => ({
	singleTournaments: state.tournaments.singleTournaments,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTournaments);
