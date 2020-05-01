import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({});

const TournamentsSwitcher = () => {
	return (
		<View style={{
			flexDirection: 'row',
		}}>
			<View>
				<Text>Одиночные турниры</Text>
			</View>
			<View>
				<Text>Командные турниры</Text>
			</View>
		</View>
	);
};

export default TournamentsSwitcher;
