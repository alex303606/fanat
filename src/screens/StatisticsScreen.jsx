import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenWrapper from './ScreenWrapper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({});

const StatisticsScreen = (props) => {
	return (
		<ScreenWrapper>
			<View style={{
				flex: 1,
				justifyContent: 'center',
			}}>
				<Text style={{
					color: 'white',
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
				}}>Статистика в разработке</Text>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({},
		dispatch);
};

export default connect(null, mapDispatchToProps)(StatisticsScreen);
