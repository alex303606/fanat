import React from 'react';
import { ImageBackground, ScrollView, View, Dimensions } from 'react-native';
import backGround from '../assets/img/background.jpg';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useSafeArea } from 'react-native-safe-area-context';

const styles = EStyleSheet.create({
	backGround: {
		width: Dimensions.get('window').width,
		flexGrow: 1,
	},
});

const ScreenContainer = (props) => {
	const insets = useSafeArea();
	
	return (
		<View style={{flex: 1, backgroundColor: '#19112C'}}>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flexGrow: 1}}
			>
				<ImageBackground source={backGround} style={styles.backGround}>
					{props.children}
				</ImageBackground>
				<KeyboardSpacer
					topSpacing={-insets.bottom}
					style={{backgroundColor: '#19112C'}}
				/>
			</ScrollView>
		</View>
	);
};

export default ScreenContainer;
