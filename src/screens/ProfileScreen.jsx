import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { bindActionCreators } from 'redux';
import { signOut } from '../store/actions/profile';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({});

const ProfileScreen = (props) => {
	return (
		<ScreenWrapper>
			<Text style={{
				color: 'white',
				fontSize: 30,
				fontWeight: 'bold',
			}}>Profile</Text>
			<Button
				onPress={() => {
					props.signOut();
				}}
				title={'EXIT'}
			/>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			signOut,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
