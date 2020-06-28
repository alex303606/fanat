import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TournamentsSwitcher from '../components/TournamentsSwitcher';
import { getStatsPlayers, getStatsCommands } from '../store/actions/stats';
import ImageWithLoader from '../components/ImageWithLoader';
import userAvatar from '../assets/img/userAvatar.jpg';

const styles = EStyleSheet.create({
	page: {
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
		flex: 1,
	},
	headerText: {
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: '12rem',
	},
	text: {
		color: 'white',
		fontSize: '12rem',
	},
	avatar: {
		width: '20rem',
		height: '20rem',
		borderRadius: '10rem',
		overflow: 'hidden',
		marginRight: '10rem',
	},
	contentContainerStyle: {
		paddingTop: '10rem',
		flexGrow: 1,
	},
	row: {
		flexDirection: 'row',
		paddingVertical: '5rem',
	},
	playerRow: {
		width: '50%',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

const StatisticsScreen = (props) => {
	useEffect(() => {
		onRefresh();
	}, []);
	
	const [tournamentType, setTournamentType] = useState('ONE');
	const [refreshingOne, setRefreshingOne] = useState(false);
	const [refreshingCommand, setRefreshingCommand] = useState(false);
	
	const onRefresh = useCallback(() => {
		setRefreshingCommand(true);
		setRefreshingOne(true);
		props.getStatsPlayers().then(() => setRefreshingOne(false));
		props.getStatsCommands().then(() => setRefreshingCommand(false));
	}, [refreshingOne, refreshingCommand]);
	
	const renderHeaderText = (title, style) => (
		<Text numberOfLines={1} style={[style, styles.headerText]}>{title}</Text>
	);
	
	const renderItemText = (title, style) => (
		<Text numberOfLines={1} style={[styles.text, style]}>{title}</Text>
	);
	
	const sectionKeyExtractor = item => item.ID;
	
	const renderHeader = () => (
		<View style={styles.row}>
			{renderHeaderText('#', {width: '10%'})}
			{renderHeaderText('Игрок', {width: '50%'})}
			{renderHeaderText('Игры', {width: '20%', textAlign: 'center'})}
			{renderHeaderText('Очки', {width: '20%', textAlign: 'center'})}
		</View>
	);
	
	const renderItem = ({index, item}) => (
		<View style={styles.row}>
			{renderItemText(++index, {width: '10%'})}
			<View style={styles.playerRow}>
				{!!item.PICTURE ?
					<ImageWithLoader resizeMode='cover' style={styles.avatar} source={item.PICTURE}/> :
					<Image resizeMode='cover' source={userAvatar} style={styles.avatar}/>
				}
				<Text
					numberOfLines={1}
					style={[styles.text, {flex: 1}]}>
					{item.NAME}
				</Text>
			</View>
			{renderItemText(item.COUNT_GAMES || 0, {width: '20%', textAlign: 'center'})}
			{renderItemText(item.POINTS || 0, {width: '20%', textAlign: 'center'})}
		</View>
	);
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<TournamentsSwitcher
					changeValue={setTournamentType}
					selected={tournamentType}
				/>
				<FlatList
					ListHeaderComponent={renderHeader}
					data={tournamentType === 'ONE' ? props.one : props.command}
					renderItem={renderItem}
					contentContainerStyle={styles.contentContainerStyle}
					keyExtractor={sectionKeyExtractor}
					refreshControl={
						<RefreshControl
							refreshing={refreshingOne && refreshingCommand}
							onRefresh={onRefresh}
							title="Загружаем статистику"
							tintColor='white'
							titleColor='white'
						/>
					}
				/>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			getStatsPlayers,
			getStatsCommands,
		},
		dispatch);
};

const mapStateToProps = state => ({
	one: state.stats.one,
	command: state.stats.command,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
