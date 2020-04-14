import { SIGN_IN_SUCCESS, SIGN_OUT } from './actionTypes';
import axios from 'axios';

export const recoverAccountSendSms = login => {
	const params = {
		TYPE: 'remember_password',
		LOGIN: login,
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return response.data;
				}
			},
		);
	};
};

export const confirmationCode = (login, code) => {
	const params = {
		TYPE: 'confirmation_code',
		LOGIN: login,
		CODE: code,
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return response.data;
				}
			},
		);
	};
};

export const recoverAccountSendCode = code => {
	console.log(code);
};

export const recoverAccountSendPass = (data: {
	password: string,
	confirmPassword: string
}) => {
	console.log(data);
};

export const registerNewUser = ({login, phone, email, password, confirmPassword}) => {
	const params = {
		TYPE: 'register',
		LOGIN: login,
		PHONE: `${phone.replace('0', '996').replace(/[^0-9]/ig, '')}`,
		EMAIL: email,
		PASSWORD: password,
		CONFIRM_PASSWORD: confirmPassword,
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return response.data;
				}
			},
		);
	};
};

export const loginUser = (data: {
	login: string,
	password: string,
}) => {
	console.log(data);
	
	return dispatch => {
		setTimeout(() => {
			return dispatch(loginUserSuccess(data));
		}, 2000);
	};
};

const loginUserSuccess = (data) => {
	return {type: SIGN_IN_SUCCESS, data};
};

export const signOut = () => {
	return dispatch => {
		dispatch({type: SIGN_OUT});
	};
};
