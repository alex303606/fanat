import React, { useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import Loader from '../components/Loader';
import { wait } from '../utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const item = {
	title: 'Игровая студия пожертвует всю прибыль на борьбу с лесными пожарами в Австралии',
	date: '15.04.2020, 12:30',
	link: 'https://reactnavigation.org/docs/getting-started',
	text: 'React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. Don\'t worry too much about this for now, it\'ll become clear soon enough! To frontload the installation work, let\'s also install and configure dependencies used by most navigators, then we can move forward with starting to write some code. The libraries we will install now are react-native-gesture-handler, react-native-reanimated, react-native-screens and react-native-safe-area-context. If you already have these libraries installed and at the latest version, you are done here! Otherwise, read on. React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. Don worry too much about this for now, it\'ll become clear soon enough! To frontload the installation work, let\'s also install and configure dependencies used by most navigators, then we can move forward with starting to write some code. The libraries we will install now are react-native-gesture-handler, react-native-reanimated, react-native-screens and react-native-safe-area-context. If you already have these libraries installed and at the latest version, you are done here! Otherwise, read on. React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. Don\'t worry too much about this for now, it\'ll become clear soon enough! To frontload the installation work, let\'s also install and configure dependencies used by most navigators, then we can move forward with starting to write some code. The libraries we will install now are react-native-gesture-handler, react-native-reanimated, react-native-screens and react-native-safe-area-context. If you already have these libraries installed and at the latest version, you are done here! Otherwise, read on. React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. Don worry too much about this for now, it\'ll become clear soon enough! To frontload the installation work, let\'s also install and configure dependencies used by most navigators, then we can move forward with starting to write some code. The libraries we will install now are react-native-gesture-handler, react-native-reanimated, react-native-screens and react-native-safe-area-context. If you already have these libraries installed and at the latest version, you are done here! Otherwise, read on.',
};

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		flexDirection: 'column',
		paddingBottom: '20rem',
	},
	title: {
		fontSize: '18rem',
		color: 'white',
		fontWeight: 'bold',
		marginBottom: '20rem',
		textAlign: 'center',
	},
	text: {
		fontSize: '12rem',
		lineHeight: '14rem',
		color: '#ccc8cb',
	},
	contentText: {
		fontSize: '14rem',
		lineHeight: '17rem',
		color: 'white',
		textAlign: 'justify',
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '20rem',
	},
});

const NewsItemScreen = ({route}) => {
	const [newsItem, setNewsItem] = useState({
		title: '',
		date: '',
		link: '',
		text: '',
	});
	const [loading, setLoading] = useState(false);
	
	const getNewsItemById = id => {
		setLoading(true);
		wait(2000).then(() => {
			setNewsItem(item);
			setLoading(false);
		});
	};
	
	React.useEffect(() => {
		if (route.params?.id) {
			getNewsItemById(route.params.id);
		}
	}, [route.params?.post]);
	
	if (loading) {
		return <Loader/>;
	}
	
	const link = newsItem.link && newsItem.link.length > 20 ? `${newsItem.link.substring(0, 17)}...` : newsItem.link;
	
	const openLink = () => {
		try {
			Linking.canOpenURL(newsItem.link).then(() => {
				Linking.openURL(newsItem.link);
			});
		} catch (e) {
			console.log(e);
		}
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flexGrow: 1}}
				>
					<Text
						style={styles.title}>{newsItem.title}</Text>
					<View style={styles.info}>
						<Text
							numberOfLines={1}
							style={[styles.text, {marginRight: 10}]}
						>
							{newsItem.date}
						</Text>
						<Text
							numberOfLines={1}
							style={[styles.text, {marginLeft: 10}]}
							onPress={openLink}
						>
							{link}
						</Text>
					</View>
					<Text style={styles.contentText}>{newsItem.text}</Text>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

export default NewsItemScreen;
