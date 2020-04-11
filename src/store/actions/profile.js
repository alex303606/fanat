import { SIGN_IN_SUCCESS } from './actionTypes';

export const recoverAccountSendEmail = email => {
	console.log(email);
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

export const registerNewUser = (data: {
	login: string,
	phone: string,
	email: string,
	password: string,
	confirmPassword: string
}) => {
	console.log(data);
};

export const loginUser = (data: {
	login: string,
	password: string
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
