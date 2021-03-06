import {
	CHANGE_PROFILE_TYPE,
	GET_PLAYER_SUCCESS,
	SIGN_IN_SUCCESS,
	SIGN_OUT,
} from './actionTypes';
import axios from 'axios';
import config from '../../../config';
import RNFetchBlob from 'rn-fetch-blob';
import { getCommand } from './team';

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
		{name: 'LOGIN', data: data.login},
		{name: 'PHONE', data: data.phone},
		{name: 'EMAIL', data: data.email},
		{name: 'PASSWORD', data: data.password},
		{name: 'CONFIRM_PASSWORD', data: data.confirmPassword},
		{name: 'API_KEY', data: config.apiKey},
		{name: 'TYPE', data: 'register'},
	];
	if (data.photo && !!data.photo.uri) {
		params.push({
			name: 'image',
			type: data.photo.type || 'image/jpg',
			filename: 'image.jpg',
			data: RNFetchBlob.wrap(data.photo.uri),
		});
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

export const changePassword = (password, rePassword) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = {
			TYPE: 'change_password_profile',
			LOGIN: login,
			PASSWORD: password,
			CONFIRM_PASSWORD: rePassword,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return response.data;
				}
			},
		);
	};
};

const loginUserSuccess = (user) => {
	return {type: SIGN_IN_SUCCESS, user};
};

export const signOut = () => {
	return dispatch => {
		dispatch({type: SIGN_OUT});
	};
};

export const editUser = (data) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = [
			{name: 'LOGIN', data: login},
			{name: 'EMAIL', data: data.email},
			{name: 'API_KEY', data: config.apiKey},
			{name: 'TYPE', data: 'edit_user'},
		];
		if (data.photo && !!data.photo.uri && !!data.photo.type) {
			params.push({
				name: 'image',
				type: data.photo.type,
				filename: 'image.jpg',
				data: RNFetchBlob.wrap(data.photo.uri),
			});
		}
		return RNFetchBlob.config({
			trusty: true,
		}).fetch('POST', config.baseURL, {
			'Content-Type': 'multipart/form-data',
		}, params).then((resp) => {
			if (resp.data) {
				const userData = JSON.parse(resp.data);
				if (userData.result && userData.data) {
					dispatch(getPlayer());
				}
				return userData;
			}
		});
	};
};

export const getPlayer = () => {
	return (dispatch, getState) => {
		const store = getState();
		const ID = store.profile.user.ID;
		const params = {
			TYPE: 'get_player',
			ID,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data && response.data.data) {
					const {data: {COMMAND_CAPTAIN}} = response.data;
					if (!!COMMAND_CAPTAIN) {
						dispatch(getCommand(COMMAND_CAPTAIN));
					}
					return dispatch(getPlayerSuccess(response.data.data));
				}
			},
		);
	};
};

const getPlayerSuccess = (data) => {
	return {type: GET_PLAYER_SUCCESS, data};
};

export const changeProfileType = () => {
	return (dispatch, getState) => {
		const store = getState();
		const profileType = store.profile.profileType;
		return dispatch({type: CHANGE_PROFILE_TYPE, profileType});
	};
};
