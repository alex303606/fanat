import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({});

const StatisticsScreen = (props) => {
	return (
		<ScreenWrapper>
			<Text style={{
				color: 'white',
				fontSize: 30,
				fontWeight: 'bold',
			}}>Statistics</Text>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(null, mapDispatchToProps)(StatisticsScreen);
