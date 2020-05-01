import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import TournamentItem from '../components/TournamentItem';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
	},
	text: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '20rem',
	},
	title: {
		color: 'white',
		fontSize: '15rem',
		lineHeight: '23rem',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	footer: {
		paddingVertical: '20rem',
	},
});

const TournamentSuccessfullyRegisteredScreen = ({route}) => {
	const item = route.params && route.params.item ? route.params.item : undefined;
	const navigation = useNavigation();
	const navigateToHome = () => {
		navigation.navigate('Tournaments');
	};
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				{!!item && <TournamentItem item={item}/>}
				<View style={styles.text}>
					<Text style={styles.title}>Поздравляем!</Text>
					<Text style={styles.title}>Вы успешно зарегистрированы в турнире.</Text>
				</View>
				<View style={styles.footer}>
					<Button
						onPress={navigateToHome}
						title={'Готово'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default TournamentSuccessfullyRegisteredScreen;
