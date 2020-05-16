import React, { useCallback } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCommandTournaments, loadMoreCommandTournaments } from '../store/actions/tournaments';
import ListFooterComponent from './ListFooterComponent';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
	},
});

const MultiTournaments = (props) => {
	const onRefresh = useCallback(() => {
		props.getCommandTournaments();
	}, [props.refreshing]);
	
	const handleLoadMore = () => {
		if (props.refreshing || props.listIsOver) {
			return;
		}
		props.loadMoreCommandTournaments();
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
			getCommandTournaments,
			loadMoreCommandTournaments,
		},
		dispatch);
};

const mapStateToProps = state => ({
	tournaments: state.tournaments.command.tournaments,
	refreshing: state.tournaments.command.refreshing,
	listIsOver: state.tournaments.command.listIsOver,
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiTournaments);
