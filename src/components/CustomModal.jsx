import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	modalContainer: {
		backgroundColor: '#19112C',
		paddingVertical: '25rem',
		paddingHorizontal: '25rem',
		flex: 1,
	},
	close: {
		height: '150rem',
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
});

const CustomModal = (props) => {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.modalVisible}>
			<View style={{flex: 1}}>
				<TouchableOpacity
					activeOpacity={1} style={styles.close}
					onPress={props.setModalVisible}/>
				<View style={styles.modalContainer}>
					{props.children}
				</View>
			</View>
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
