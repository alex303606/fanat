import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Text, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';
const styles = EStyleSheet.create({});

const SecondScreen = () => {
	const navigation = useNavigation();
	const onSuccess = e => {
		alert(e.data);
	};
	return (
		<ScreenWrapper>
			<QRCodeScanner
				fadeIn={false}
				onRead={onSuccess}
				flashMode={Camera.Constants.FlashMode.auto}
				topContent={
					<Text style={styles.centerText}>
						Go to{' '}
						<Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
						your computer and scan the QR code.
					</Text>
				}
				bottomContent={
					<TouchableOpacity style={styles.buttonTouchable}>
						<Text style={styles.buttonText}>OK. Got it!</Text>
					</TouchableOpacity>
				}
			/>
		</ScreenWrapper>
	);
};

export default SecondScreen;
