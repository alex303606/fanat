import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import TournamentItem from '../components/TournamentItem';
import Button from '../components/Button';
import LoremText from '../components/LoremText';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTeam } from '../store/actions/team';
import { changeProfileType } from '../store/actions/profile';

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
		paddingVertical: '10rem',
	},
	button: {
		marginVertical: '10rem',
	},
});

const TournamentScreen = (props) => {
	const {route} = props;
	const item = route.params && route.params.item ? route.params.item : undefined;
	const navigation = useNavigation();
	const navigateToScannerScreen = () => {
		if (!item) {
			return;
		}
		navigation.navigate('Scanner', {item});
	};

	const createTeam = () => {
		props.changeProfileType();
		navigation.navigate('Profile');
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
					{item && item.TYPE === 'COMMAND' &&
						<View>
							{props.teamId && props.teamName ?
								<Text style={styles.title}>Ваша команда {props.teamName}.</Text> :
								<Button
									style={styles.button}
									onPress={createTeam}
									title={'Создать команду'}
								/>
							}
						</View>
					}
					<Button
						style={styles.button}
						onPress={navigateToScannerScreen}
						title={'Принять участие'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			changeProfileType,
		},
		dispatch);
};

const mapStateToProps = state => ({
	teamName: state.profile.team.NAME,
	teamId: state.profile.team.ID,
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentScreen);
