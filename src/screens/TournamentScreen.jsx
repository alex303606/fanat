import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import TournamentItem from '../components/TournamentItem';
import Button from '../components/Button';
import LoremText from '../components/LoremText';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
	},
	title: {
		color: 'white',
		fontSize: '20rem',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: '20rem',
	},
	footer: {
		paddingVertical: '20rem',
	},
});

const TournamentScreen = ({route}) => {
	const item = route.params && route.params.item ? route.params.item : undefined;
	const navigation = useNavigation();
	const navigateToScannerScreen = () => {
		if (!item) {
			return;
		}
		navigation.navigate('Scanner', {item});
	};
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				{!!item && <TournamentItem item={item}/>}
				<Text style={styles.title}>ПРАВИЛА ТУРНИРА</Text>
				<ScrollView contentContainerStyle={{flexGrow: 1}}>
					<LoremText style={{color: 'white', textAlign: 'justify'}}/>
				</ScrollView>
				<View style={styles.footer}>
					<Button
						onPress={navigateToScannerScreen}
						title={'Принять участие'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default TournamentScreen;
