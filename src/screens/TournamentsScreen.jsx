import React from 'react';
import { ScrollView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TournamentsSwitcher from '../components/TournamentsSwitcher';

const styles = EStyleSheet.create({});

const TournamentsScreen = (props) => {
	const navigation = useNavigation();
	return (
		<ScreenWrapper>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flexGrow: 1}}
			>
				<TournamentsSwitcher/>
				<Button
					onPress={() => {
						navigation.navigate('Scanner');
					}}
					title={'Scan code'}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(null, mapDispatchToProps)(TournamentsScreen);
