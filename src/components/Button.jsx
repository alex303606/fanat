import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = EStyleSheet.create({
	button: {
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
	const pressHandler = () => props.disabled ? null : props.onPress();
	
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[styles.button, {
				backgroundColor: props.disabled ? 'rgba(213, 30, 73, 0.5)' : '#D51E49',
			}, props.style]}
			onPress={pressHandler}>
			{props.loading ?
				<ActivityIndicator size="large" color={'white'}/> :
				<Text style={styles.buttonText}>{props.title}</Text>
			}
		</TouchableOpacity>
	);
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	style: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	]),
};

export default Button;
