import { SIGN_IN_SUCCESS, SIGN_OUT } from './actionTypes';
import axios from 'axios';

export const recoverAccountSendEmail = login => {
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

export const recoverAccountSendPass = ({login, code, password, confirmPassword}) => {
	const params = {
		TYPE: 'change_password',
		LOGIN: login,
		CHECKWORD: code,
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

export const loginUser = (login, password) => {
	const params = {
		TYPE: 'auth',
		LOGIN: login,
		PASSWORD: password,
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					if (response.data.result) {
						dispatch(loginUserSuccess(response.data.message));
					}
					return response.data;
				}
			},
		);
	};
};

const loginUserSuccess = (id) => {
	return {type: SIGN_IN_SUCCESS, id};
};

export const signOut = () => {
	return dispatch => {
		dispatch({type: SIGN_OUT});
	};
};
