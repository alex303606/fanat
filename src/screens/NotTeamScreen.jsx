import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { changeProfileType } from '../store/actions/profile';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	title: {
		color: 'white',
		fontSize: '20rem',
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: '30rem',
		textTransform: 'uppercase',
	},
	text: {
		color: 'white',
		textAlign: 'justify',
	},
	footer: {
		paddingTop: '30rem',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	button: {
		marginVertical: '15rem',
	}
});

const NotTeamScreen = (props) => {
	const navigation = useNavigation();
	const createTeam = () => navigation.navigate('CreateTeam');
	const navigateToScannerScreen = () => navigation.navigate('Scanner');
	const changeProfileType = () => {
		props.changeProfileType();
		navigation.navigate('Profile');
	};
	
	return (
		<ScreenWrapper>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flexGrow: 1}}
			>
				<View style={styles.page}>
					<Text style={styles.title}>Правила создания команды</Text>
					<Text style={styles.text}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore
						et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
						ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Text>
					<View style={styles.footer}>
						<Button
							style={styles.button}
							onPress={createTeam}
							title={'Создать команду'}
						/>
						<Button
							style={styles.button}
							onPress={navigateToScannerScreen}
							title={'Присоединиться к команде'}
						/>
						<Button
							style={styles.button}
							onPress={changeProfileType}
							title={'Переключиться на профиль игрока'}
						/>
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			changeProfileType,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(NotTeamScreen);
