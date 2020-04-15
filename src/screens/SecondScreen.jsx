import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Text } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({});

const SecondScreen = () => {
	const navigation = useNavigation();
	
	return (
		<ScreenWrapper>
			<Text style={{
				color: 'white',
				fontSize: 30,
				fontWeight: 'bold',
			}}>SecondScreen</Text>
			<Button
				onPress={() => {
					navigation.navigate('First');
				}}
				title={'go to First'}
			/>
		</ScreenWrapper>
	);
};

export default SecondScreen;
