import React, { useEffect, useState } from 'react';
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
import { getCommandTournamentById, registerQrCode } from '../store/actions/tournaments';

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
		marginBottom: '20rem',
	},
	title: {
		color: 'white',
		fontSize: '16rem',
		lineHeight: '18rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	error: {
		color: '#D51E49',
		fontSize: '16rem',
		lineHeight: '18rem',
		marginBottom: '20rem',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const ScannerScreen = (props) => {
	const navigation = useNavigation();
	const [item, setItem] = useState(undefined);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	useEffect(() => {
		if (props.route.params && props.route.params.item) {
			setItem(props.route.params.item);
		}
	}, []);
	
	const onSuccess = e => {
		if (!e.data) {
			return;
		}
		setCode(e.data);
		props.getCommandTournamentById(e.data).then(result => {
			if (!!result) {
				setItem(result);
			}
		});
	};
	
	const register = () => {
		if (!code) {
			return;
		}
		setLoading(true);
		props.registerQrCode(code).then((res) => {
			setLoading(false);
			if (res && res.result) {
				return navigation.navigate('Successfully', {item});
			}
			
			if (res && !!res.message) {
				setError(res.message);
			}
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
					{!!error && <Text style={styles.error}>{error}</Text>}
					<View style={styles.bottom}>
						{!!code && !!item ?
							<Button loading={loading} onPress={register} title={'Зарегистрироваться'}/> :
							<Text style={styles.title}>Отсканируйте QR код</Text>
						}
					</View>
				</View>
				<QRCodeScanner
					fadeIn={false}
					onRead={onSuccess}
					flashMode={Camera.Constants.FlashMode.off}
					cameraProps={{ratio: '1:1'}}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			registerQrCode,
			getCommandTournamentById,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ScannerScreen);
