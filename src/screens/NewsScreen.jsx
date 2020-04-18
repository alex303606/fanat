import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { wait } from '../utils';

const newNews = [
	{
		id: '1',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '2',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '3',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '4',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '5',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '6',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '7',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '8',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '9',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '10',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
	{
		id: '11',
		title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	},
];

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		flexDirection: 'column',
	},
	item: {
		paddingVertical: '10rem',
		marginBottom: '10rem',
		borderBottomColor: 'white',
		borderBottomWidth: 1,
	},
	title: {
		color: 'white',
		fontSize: '16rem',
	},
});

const NewsScreen = () => {
	useEffect(() => {
		onRefresh();
	}, []);
	const navigation = useNavigation();
	const [refreshing, setRefreshing] = useState(false);
	const [news, setNews] = useState([]);
	
	const sectionKeyExtractor = item => item.id;
	
	const navigateToNewsItem = (id) => () => {
		navigation.navigate('NewsItem', {id});
	};
	
	const renderItem = ({item}) => {
		return (
			<View style={styles.item}>
				<TouchableOpacity onPress={navigateToNewsItem(item.id)}>
					<Text style={styles.title}>{item.title}</Text>
				</TouchableOpacity>
			</View>
		);
	};
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		
		wait(2000).then(() => {
			setNews(newNews);
			setRefreshing(false);
		});
	}, [refreshing]);
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<FlatList
					showsVerticalScrollIndicator={false}
					removeClippedSubviews={false}
					scrollEnabled
					scrollEventThrottle={16}
					data={news}
					contentContainerStyle={{flexGrow: 1}}
					renderItem={renderItem}
					keyExtractor={sectionKeyExtractor}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							title="Загружаем новости"
							tintColor='white'
							titleColor='white'
						/>
					}
				/>
			</View>
		
		</ScreenWrapper>
	);
};

export default NewsScreen;
