import React, { useState } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { ScrollView, Text, View } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';

const styles = EStyleSheet.create({
	page: {
		flexGrow: 1,
		paddingBottom: '30rem',
	},
	top: {
		paddingHorizontal: '20rem',
	},
	bottom: {
		paddingHorizontal: '20rem',
	},
});

const SecondScreen = () => {
	const navigation = useNavigation();
	const [code, setCode] = useState('');
	const onSuccess = e => {
		setCode(e.data);
	};
	
	return (
		<ScreenWrapper>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.page}
			>
				<View style={styles.top}>
					<Text style={{
						color: 'white',
						fontSize: 30,
						fontWeight: 'bold',
						textAlign: 'center',
					}}>Сканер</Text>
				</View>
				<QRCodeScanner
					fadeIn={false}
					reactivate={true}
					reactivateTimeout={5000}
					onRead={onSuccess}
					flashMode={Camera.Constants.FlashMode.auto}
					cameraProps={{ratio: '1:1'}}
				/>
				<View style={styles.bottom}>
					<Button
						onPress={() => {
							alert(code);
						}}
						title={'Далее'}
					/>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

export default SecondScreen;
