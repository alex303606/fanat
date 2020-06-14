import React from 'react';
import { ScrollView, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import EStyleSheet from 'react-native-extended-stylesheet';
import LoremText from '../components/LoremText';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '10rem',
		flexDirection: 'column',
		paddingVertical: '10rem',
	},
});

const AboutAppScreen = () => {
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flexGrow: 1}}
				>
					<LoremText style={{color: 'white', textAlign: 'justify'}}/>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

export default AboutAppScreen;
