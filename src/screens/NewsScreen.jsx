import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const NewsScreen = () => {
	return (
		<ScreenWrapper>
			<Text style={{
				color: 'white',
				fontSize: 30,
				fontWeight: 'bold',
			}}>News</Text>
		
		</ScreenWrapper>
	);
};

export default NewsScreen;
