import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#19112C',
	},
});

const ScreenWrapper = (props) => {
	return <View style={styles.page} {...props}/>;
};

export default ScreenWrapper;
