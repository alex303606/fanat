import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';

const styles = EStyleSheet.create({
	modalContainer: {
		backgroundColor: '#19112C',
		borderRadius: '12rem',
		paddingVertical: '25rem',
		paddingHorizontal: '25rem',
		flex: 1,
	},
	close: {
		height: '150rem',
	},
});

const CustomModal = (props) => {
	const insets = useSafeArea();
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.modalVisible}>
			<SafeAreaView style={{flex: 1}} initialSafeAreaInsets={{top: insets.top, bottom: insets.bottom}}>
				<TouchableOpacity
					activeOpacity={1} style={styles.close}
					onPress={props.setModalVisible}/>
				<View style={styles.modalContainer}>
					{props.children}
				</View>
			</SafeAreaView>
		</Modal>
	);
};

CustomModal.propTypes = {
	setModalVisible: PropTypes.func.isRequired,
	modalVisible: PropTypes.bool.isRequired,
	keyboardIsVisible: PropTypes.bool,
	modalStyle: PropTypes.object,
};

export default CustomModal;
