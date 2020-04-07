import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = EStyleSheet.create({
	button: {
		backgroundColor: '#D51E49',
		height: '42rem',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: '14rem',
		lineHeight: '16rem',
	},
});

const Button = (props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={styles.button}
			onPress={props.onPress}>
			<Text style={styles.buttonText}>{props.title}</Text>
		</TouchableOpacity>
	);
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default Button;
