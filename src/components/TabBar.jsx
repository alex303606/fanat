import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageWithLoader from './ImageWithLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';
import rewardIcon from '../assets/img/reward.png';

const tabs = ['Игры', 'Статистика', 'Награды'];
const stats = [
	{
		date: '02.01.20',
		game: 'FIFA20',
		points1: '0',
		points2: '24',
		points3: '55',
	},
	{
		date: '20.02.20',
		game: 'DOTA2',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '25.03.20',
		game: 'PES2013',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '1.05.20',
		game: 'CS-GO',
		points1: '0',
		points2: '10',
		points3: '2',
	},
	{
		date: '19.05.20',
		game: 'UFC',
		points1: '50',
		points2: '50',
		points3: '49',
	},
	{
		date: '02.01.20',
		game: 'FIFA20',
		points1: '0',
		points2: '24',
		points3: '55',
	},
	{
		date: '20.02.20',
		game: 'DOTA2',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '25.03.20',
		game: 'PES2013',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '1.05.20',
		game: 'CS-GO',
		points1: '0',
		points2: '10',
		points3: '2',
	},
	{
		date: '19.05.20',
		game: 'UFC',
		points1: '50',
		points2: '50',
		points3: '49',
	},
	{
		date: '02.01.20',
		game: 'FIFA20',
		points1: '0',
		points2: '24',
		points3: '55',
	},
	{
		date: '20.02.20',
		game: 'DOTA2',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '25.03.20',
		game: 'PES2013',
		points1: '30',
		points2: '20',
		points3: '5',
	},
	{
		date: '1.05.20',
		game: 'CS-GO',
		points1: '0',
		points2: '10',
		points3: '2',
	},
	{
		date: '19.05.20',
		game: 'UFC',
		points1: '50',
		points2: '50',
		points3: '49',
	},
];
const games = [
	{
		name: 'FIFA20',
		rating: 4,
		image: 'https://i.ytimg.com/vi/Z3LuCxXh1e0/maxresdefault.jpg',
	},
	{
		name: 'PES2013',
		rating: 5,
		image: 'https://lh3.googleusercontent.com/proxy/kaRnScVDBH4dEXIFpbExnaY3QF8NaNe5WwLnKmOhXtvPe4cl3gNLBIVZhuQMOrcPy1siymSzxrD-NCQOS6VBp4d_gDXMeA',
	},
	{
		name: 'FIFA20',
		rating: 4,
		image: 'https://i.ytimg.com/vi/Z3LuCxXh1e0/maxresdefault.jpg',
	},
	{
		name: 'PES2013',
		rating: 5,
		image: 'https://lh3.googleusercontent.com/proxy/kaRnScVDBH4dEXIFpbExnaY3QF8NaNe5WwLnKmOhXtvPe4cl3gNLBIVZhuQMOrcPy1siymSzxrD-NCQOS6VBp4d_gDXMeA',
	},
	{
		name: 'FIFA20',
		rating: 4,
		image: 'https://i.ytimg.com/vi/Z3LuCxXh1e0/maxresdefault.jpg',
	},
	{
		name: 'PES2013',
		rating: 5,
		image: 'https://lh3.googleusercontent.com/proxy/kaRnScVDBH4dEXIFpbExnaY3QF8NaNe5WwLnKmOhXtvPe4cl3gNLBIVZhuQMOrcPy1siymSzxrD-NCQOS6VBp4d_gDXMeA',
	},
	{
		name: 'FIFA20',
		rating: 4,
		image: 'https://i.ytimg.com/vi/Z3LuCxXh1e0/maxresdefault.jpg',
	},
	{
		name: 'PES2013',
		rating: 5,
		image: 'https://lh3.googleusercontent.com/proxy/kaRnScVDBH4dEXIFpbExnaY3QF8NaNe5WwLnKmOhXtvPe4cl3gNLBIVZhuQMOrcPy1siymSzxrD-NCQOS6VBp4d_gDXMeA',
	},
	{
		name: 'FIFA20',
		rating: 4,
		image: 'https://i.ytimg.com/vi/Z3LuCxXh1e0/maxresdefault.jpg',
	},
	{
		name: 'PES2013',
		rating: 5,
		image: 'https://lh3.googleusercontent.com/proxy/kaRnScVDBH4dEXIFpbExnaY3QF8NaNe5WwLnKmOhXtvPe4cl3gNLBIVZhuQMOrcPy1siymSzxrD-NCQOS6VBp4d_gDXMeA',
	},
];

const awards = [
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
	{name: 'lorem ipsum'},
];

const styles = EStyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		paddingVertical: '10rem',
	},
	tab: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 3,
		borderColor: 'white',
		paddingVertical: '15rem',
	},
	tabText: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '14rem',
		fontWeight: 'bold',
	},
	gameImage: {
		width: '90rem',
		height: '50rem',
		borderRadius: '5rem',
		overflow: 'hidden',
		marginBottom: '5rem',
	},
	$starSize: '15rem',
	game: {
		marginVertical: '10rem',
	},
	gameName: {
		color: 'white',
		textAlign: 'center',
		fontSize: '12rem',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	games: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	awardImage: {
		width: '64rem',
		height: '64rem',
		marginBottom: '5rem',
	},
	award: {
		flexDirection: 'column',
		alignItems: 'center',
		marginVertical: '10rem',
	},
	statsText: {
		color: 'white',
		width: '20%',
		fontWeight: 'bold',
		fontSize: '14rem',
		textAlign: 'center',
	},
	statsItemText: {
		color: 'white',
		width: '20%',
		fontSize: '12rem',
		textAlign: 'center',
	},
	statsRow: {
		marginBottom: '10rem',
		flexDirection: 'row',
	},
});

const TabBar = () => {
	const [activeTab, changeActiveTab] = useState(0);
	
	const renderTab = (name, index) => (
		<TouchableOpacity
			key={index}
			activeOpacity={0.7}
			onPress={() => changeActiveTab(index)}
			style={[styles.tab, {borderColor: activeTab === index ? '#D51E49' : 'white'}]}
		>
			<Text style={[styles.tabText, {color: activeTab === index ? '#D51E49' : 'white'}]}>{name}</Text>
		</TouchableOpacity>
	);
	
	const renderGame = (game, index) => (
		<View key={index} style={styles.game}>
			<ImageWithLoader
				resizeMode='cover'
				source={game.image}
				style={styles.gameImage}
			/>
			<Text style={styles.gameName}>{game.name}</Text>
			<Stars
				disabled
				default={game.rating}
				count={5}
				starSize={styles.$starSize}
				spacing={5}
				fullStar={<Icon size={styles.$starSize} color={'#D51E49'} name={'ios-star'}/>}
				emptyStar={<Icon size={styles.$starSize} color={'#D51E49'} name={'ios-star-outline'}/>}
			/>
		</View>
	);
	
	const renderGames = () => (
		<View style={styles.games}>
			{games.map(renderGame)}
		</View>
	);
	
	const renderStats = () => (
		<View>
			<View style={styles.statsRow}>
				<Text style={styles.statsText}>ДАТА</Text>
				<Text style={styles.statsText}>ИГРА</Text>
				<Text style={styles.statsText}>ОЧКИ</Text>
				<Text style={styles.statsText}>ОЧКИ</Text>
				<Text style={styles.statsText}>ОЧКИ</Text>
			</View>
			{stats.map(renderStatsItem)}
		</View>
	);
	
	const renderStatsItem = (item, index) => (
		<View style={styles.statsRow} key={index}>
			<Text style={styles.statsItemText}>{item.date}</Text>
			<Text style={styles.statsItemText}>{item.game}</Text>
			<Text style={styles.statsItemText}>{item.points1}</Text>
			<Text style={styles.statsItemText}>{item.points2}</Text>
			<Text style={styles.statsItemText}>{item.points3}</Text>
		</View>
	);
	
	const renderAwards = () => (
		<View style={styles.games}>
			{awards.map(renderAward)}
		</View>
	);
	
	const renderAward = (award, index) => (
		<View key={index} style={styles.award}>
			<Image
				resizeMode='cover'
				source={rewardIcon}
				style={styles.awardImage}
			/>
			<Text style={styles.gameName}>{award.name}</Text>
		</View>
	);
	
	return (
		<View style={{paddingHorizontal: 10}}>
			<View style={styles.tabBar}>
				{tabs.map(renderTab)}
			</View>
			{activeTab === 0 ? renderGames() : activeTab === 1 ? renderStats() : renderAwards()}
		</View>
	);
};

export default TabBar;
