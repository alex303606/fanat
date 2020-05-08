import { SIGN_IN_SUCCESS, SIGN_OUT } from './actionTypes';
import axios from 'axios';
import config from '../../../config';
import RNFetchBlob from 'rn-fetch-blob';

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

export const registerNewUser = (data) => {
	const params = [
		{name: 'login', data: data.login},
		{name: 'phone', data: data.phone},
		{name: 'email', data: data.email},
		{name: 'password', data: data.password},
		{name: 'confirmPassword', data: data.confirmPassword},
		{name: 'API_KEY', data: config.apiKey},
	];
	if (data.photo && !!data.photo.uri) {
		params.push({name: 'image', filename: 'image.jpg', data: RNFetchBlob.wrap(data.photo.uri)});
	}
	return dispatch => {
		return RNFetchBlob.config({
			trusty: true,
		}).fetch('POST', config.baseURL, {
			'Content-Type': 'multipart/form-data',
		}, params).then((resp) => {
			if (resp.data) {
				return JSON.parse(resp.data);
			}
		});
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
					if (response.data.result && !!response.data.data) {
						dispatch(loginUserSuccess(response.data.data));
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
