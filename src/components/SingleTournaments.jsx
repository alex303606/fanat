import React, { useCallback } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { getOneTournaments, loadMoreOneTournaments } from '../store/actions/tournaments';
import { connect } from 'react-redux';
import ListFooterComponent from './ListFooterComponent';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
	},
});

const SingleTournaments = (props) => {
	const onRefresh = useCallback(() => {
		props.getOneTournaments();
	}, [props.refreshing]);
	
	const handleLoadMore = () => {
		if (props.refreshing || props.listIsOver) {
			return;
		}
		props.loadMoreOneTournaments();
	};
	
	return (
		<View style={styles.page}>
			<SectionList
				sections={props.tournaments}
				keyExtractor={props.sectionKeyExtractor}
				renderItem={props.renderItem}
				renderSectionHeader={props.renderSectionHeader}
				contentContainerStyle={{flexGrow: 1}}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={false}
				scrollEnabled
				scrollEventThrottle={16}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={<ListFooterComponent loading={props.refreshing}/>}
				refreshControl={
					<RefreshControl
						refreshing={props.refreshing}
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
			getOneTournaments,
			loadMoreOneTournaments,
		},
		dispatch);
};

const mapStateToProps = state => ({
	tournaments: state.tournaments.one.tournaments,
	refreshing: state.tournaments.one.refreshing,
	listIsOver: state.tournaments.one.listIsOver,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTournaments);
