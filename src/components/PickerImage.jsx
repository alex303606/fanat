import React, {Component} from 'react';
import {
	Image,
	View,
	NativeModules,
	TouchableOpacity,
	Text, Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const ImagePicker = NativeModules.ImageCropPicker;

const styles = EStyleSheet.create({
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileImageContainer: {
		width: '120rem',
		height: '120rem',
		borderRadius: '60rem',
		backgroundColor: 'rgba(200, 199, 204, 0.5)',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	text: {
		fontSize: '14rem',
		lineHeight: '16rem',
		textAlign: 'center',
		padding: '10rem',
	}
});

export default class PickerImage extends Component {
	selectPhotoTapped = () => {
		ImagePicker.openPicker({
			cropping: false,
			compressImageQuality: 1,
			compressImageMaxWidth: 1000,
			compressImageMaxHeight: 1000,
			width: 500,
			height: 500,
			includeExif: true,
			mediaType: 'photo',
		}).then(response => {
			if (!response || !response.path) {
				return;
			}
			ImagePicker.openCropper({
				path: response.path,
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').width,
			}).then(image => {
				if (!image || !image.path) {
					return;
				}
				let avatarSource = {uri: image.path, type: image.mime};
				this.props.savePhoto(avatarSource);
			});
		});
	};
	
	render() {
		return (
			<View style={styles.imageContainer}>
				<TouchableOpacity
					onPress={this.selectPhotoTapped}
					style={styles.profileImageContainer}>
					{(!!this.props.avatar && this.props.avatar.uri) ?
						<Image
							style={{width: '100%', height: '100%'}}
							resizeMode='contain'
							source={this.props.avatar}
						/> : <Text style={styles.text}>ЗАГРУЗИТЬ ФОТО</Text>
					}
				</TouchableOpacity>
			</View>
		);
	}
}
