import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({});

const TournamentsScreen = (props) => {
	const navigation = useNavigation();
	return (
		<ScreenWrapper>
			<Text style={{
				color: 'white',
				fontSize: 30,
				fontWeight: 'bold',
			}}>Tournaments</Text>
			<Button
				onPress={() => {
					navigation.navigate('Scanner');
				}}
				title={'Scan code'}
			/>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(null, mapDispatchToProps)(TournamentsScreen);
