import React, { useState } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { ScrollView, Text, View } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';
import TournamentItem from '../components/TournamentItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerQrCode } from '../store/actions/tournaments';

const styles = EStyleSheet.create({
	page: {
		flexGrow: 1,
		paddingBottom: '20rem',
	},
	top: {
		paddingTop: '10rem',
		paddingHorizontal: '10rem',
	},
	bottom: {
		paddingHorizontal: '10rem',
	},
	title: {
		color: 'white',
		fontSize: '20rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const ScannerScreen = ({route, registerQrCode}) => {
	const navigation = useNavigation();
	const item = route.params && route.params.item ? route.params.item : undefined;
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	
	const onSuccess = e => {
		setCode(e.data);
	};
	
	const register = () => {
		if (!item || !code) {
			return;
		}
		setLoading(true);
		registerQrCode(code).then(() => {
			setLoading(false);
			return navigation.navigate('Successfully', {item})
		});
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
					{!!item && <TournamentItem item={item}/>}
				</View>
				<QRCodeScanner
					fadeIn={false}
					onRead={onSuccess}
					flashMode={Camera.Constants.FlashMode.off}
					cameraProps={{ratio: '1:1'}}
				/>
				<View style={styles.bottom}>
					{!!code ?
						<Button loading={loading} onPress={register} title={'Далее'}/> :
						<Text style={styles.title}>Отсканируйте QR код</Text>
					}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			registerQrCode,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ScannerScreen);
