import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	footer: {
		paddingBottom: '20rem',
	},
});

const ListFooterComponent = ({loading}) => {
	if (!loading) {
		return <View/>;
	}
	return <ActivityIndicator
		style={styles.footer}
		color={'white'}
		animating
		size='large'/>;
};

export default ListFooterComponent;
