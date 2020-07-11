import config from '../../../config';
import RNFetchBlob from 'rn-fetch-blob';
import {
	CREATE_TEAM_SUCCESS,
	EDIT_TEAM_SUCCESS,
	GET_TEAM_SUCCESS,
} from './actionTypes';
import axios from 'axios';
import { getPlayer } from './profile';

export const createTeam = (data: {
	teamName: string;
	photo: any;
}) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = [
			{name: 'LOGIN', data: login},
			{name: 'NAME', data: data.teamName},
			{name: 'API_KEY', data: config.apiKey},
			{name: 'TYPE', data: 'add_command'},
		];
		if (data.photo && !!data.photo.uri) {
			params.push({
				name: 'image',
				type: data.photo.type || 'image/jpg',
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
				const data = JSON.parse(resp.data);
				if (data.data && data.data.ID) {
					dispatch(createTeamSuccess(data.data.ID));
				}
				return data;
			}
		});
	};
};

const createTeamSuccess = (id) => {
	return {type: CREATE_TEAM_SUCCESS, id};
};

export const editTeam = (data: {
	teamName: string;
	photo: any;
}) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const teamId = store.profile.team.ID;
		const params = [
			{name: 'TYPE', data: 'edit_command'},
			{name: 'LOGIN', data: login},
			{name: 'ID', data: teamId},
			{name: 'NAME', data: data.teamName},
			{name: 'API_KEY', data: config.apiKey},
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
				const data = JSON.parse(resp.data);
				if (data.data) {
					dispatch(editTeamSuccess(data.data));
				}
				return data;
			}
		});
	};
};

const editTeamSuccess = (team) => {
	return {type: EDIT_TEAM_SUCCESS, team};
};

export const getCommand = (ID, onlyInfo: boolean = false) => {
	return (dispatch) => {
		const params = {
			TYPE: 'get_command',
			ID,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					if (response.data.data && !onlyInfo) {
						dispatch(getTeamSuccess(response.data.data));
					}
					return response.data;
				}
			},
		);
	};
};

const getTeamSuccess = (team) => {
	return {type: GET_TEAM_SUCCESS, team};
};

export const addPlayerInCommand = (ID) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = {
			TYPE: 'add_player_in_command',
			LOGIN: login,
			ID,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					if (response.data.result) {
						dispatch(getPlayer());
					}
					return response.data;
				}
				return undefined;
			},
		);
	};
};

export const removePlayerFromCommand = (teamID) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = {
			TYPE: 'remove_player_from_command',
			LOGIN: login,
			ID: teamID,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					if (response.data.result) {
						dispatch(getPlayer());
					}
					return response.data;
				}
			},
		);
	};
};
