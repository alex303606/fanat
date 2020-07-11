import axios from 'axios';
import {
	GET_STATS_COMMANDS_SUCCESS,
	GET_STATS_PLAYERS_SUCCESS,
} from './actionTypes';

export const getStatsPlayers = () => {
	return (dispatch) => {
		const params = {
			TYPE: 'get_stats_players',
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return dispatch(getStatsPlayersSuccess(response.data.data));
				}
			},
		);
	};
};

const getStatsPlayersSuccess = (data) => {
	return {type: GET_STATS_PLAYERS_SUCCESS, data};
};

export const getStatsCommands = () => {
	return (dispatch) => {
		const params = {
			TYPE: 'get_stats_commands',
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return dispatch(getStatsPlayersCommands(response.data.data));
				}
			},
		);
	};
};

const getStatsPlayersCommands = (data) => {
	return {type: GET_STATS_COMMANDS_SUCCESS, data};
};
