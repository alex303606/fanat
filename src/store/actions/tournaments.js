import axios from 'axios';
import { allowLoadMore, wait } from '../../utils';
import config from '../../../config';
import {
	COMMAND_TOURNAMENTS_LOADING,
	GET_COMMAND_TOURNAMENTS_SUCCESS,
	GET_GAMES_SUCCESS,
	GET_ONE_TOURNAMENTS_SUCCESS,
	LOAD_MORE_COMMAND_TOURNAMENTS_SUCCESS,
	LOAD_MORE_ONE_TOURNAMENTS_SUCCESS,
	ONE_TOURNAMENTS_LOADING,
	SET_FILTER_COMMAND,
	SET_FILTER_ONE,
	SET_TOURNAMENT_TYPE,
} from './actionTypes';

export const registerQrCode = (code) => {
	return (dispatch, getState) => {
		const store = getState();
		const login = store.profile.user.LOGIN;
		const params = {
			TYPE: 'registerInTournaments',
			LOGIN: login,
			ID: code,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data) {
					return response.data;
				}
				return undefined;
			},
		);
	};
};

export const getOneTournaments = () => {
	return (dispatch, getState) => {
		const store = getState();
		const GAME_ID = store.tournaments.one.filterGameID;
		const params = {
			TYPE: 'getTournaments',
			PAGE_NUM: 1,
			PAGE_SIZE: config.PAGE_SIZE,
			GAME_ID,
			TOURNAMENT_TYPE: 'ONE',
		};
		dispatch({type: ONE_TOURNAMENTS_LOADING});
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					dispatch(getOneTournamentsSuccess(response.data.data));
					return response.data.data;
				}
			},
		);
	};
};

const getOneTournamentsSuccess = (tournaments) => {
	const listIsOver = allowLoadMore(tournaments);
	return {type: GET_ONE_TOURNAMENTS_SUCCESS, tournaments, listIsOver};
};

export const getCommandTournaments = () => {
	return (dispatch, getState) => {
		const store = getState();
		const GAME_ID = store.tournaments.command.filterGameID;
		const params = {
			TYPE: 'getTournaments',
			PAGE_NUM: 1,
			PAGE_SIZE: config.PAGE_SIZE,
			GAME_ID,
			TOURNAMENT_TYPE: 'COMMAND',
		};
		dispatch({type: COMMAND_TOURNAMENTS_LOADING});
		
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					dispatch(getCommandTournamentsSuccess(response.data.data));
					return response.data.data;
				}
			},
		);
	};
};

export const getCommandTournamentById = (id) => {
	return (dispatch, getState) => {
		const params = {
			TYPE: 'getTournament',
			ID: id,
		};
		return axios.post('', params).then(
			response => {
				if (response && response.data && response.data.data) {
					return response.data.data;
				}
				return undefined;
			},
		);
	};
};

const getCommandTournamentsSuccess = (tournaments) => {
	const listIsOver = allowLoadMore(tournaments);
	return {type: GET_COMMAND_TOURNAMENTS_SUCCESS, tournaments, listIsOver};
};

export const loadMoreOneTournaments = () => {
	return (dispatch, getState) => {
		const store = getState();
		const tournaments = store.tournaments.one.tournaments;
		const page = store.tournaments.one.page;
		const updatedTournaments = [...tournaments];
		const GAME_ID = store.tournaments.one.filterGameID;
		const params = {
			TYPE: 'getTournaments',
			PAGE_NUM: page,
			PAGE_SIZE: config.PAGE_SIZE,
			GAME_ID,
			TOURNAMENT_TYPE: 'ONE',
		};
		dispatch({type: ONE_TOURNAMENTS_LOADING});
		
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					Object.keys(response.data.data).map(key => {
						const index = tournaments.findIndex(x => x.title === key);
						if (index !== -1) {
							updatedTournaments[index].data = tournaments[index].data.concat(response.data.data[key]);
						} else {
							updatedTournaments.push(
								{
									title: key,
									data: response.data.data[key],
								},
							);
						}
					});
					const listIsOver = allowLoadMore(response.data.data);
					dispatch(loadMoreOneTournamentsSuccess(updatedTournaments, page, listIsOver));
					return response.data.data;
				}
			},
		);
	};
};

const loadMoreOneTournamentsSuccess = (tournaments, page, listIsOver) => {
	page++;
	return {type: LOAD_MORE_ONE_TOURNAMENTS_SUCCESS, tournaments, page, listIsOver};
};

export const loadMoreCommandTournaments = () => {
	return (dispatch, getState) => {
		const store = getState();
		const tournaments = store.tournaments.command.tournaments;
		const updatedTournaments = [...tournaments];
		const GAME_ID = store.tournaments.command.filterGameID;
		const page = store.tournaments.command.page;
		const params = {
			TYPE: 'getTournaments',
			PAGE_NUM: page,
			PAGE_SIZE: config.PAGE_SIZE,
			GAME_ID,
			TOURNAMENT_TYPE: 'COMMAND',
		};
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					Object.keys(response.data.data).map(key => {
						const index = tournaments.findIndex(x => x.title === key);
						if (index !== -1) {
							updatedTournaments[index].data = tournaments[index].data.concat(response.data.data[key]);
						} else {
							updatedTournaments.push(
								{
									title: key,
									data: response.data.data[key],
								},
							);
						}
					});
					const listIsOver = allowLoadMore(response.data.data);
					dispatch(loadMoreCommandTournamentsSuccess(updatedTournaments, page, listIsOver));
					return response.data.data;
				}
			},
		);
	};
};

const loadMoreCommandTournamentsSuccess = (tournaments, page, listIsOver) => {
	page++;
	return {type: LOAD_MORE_COMMAND_TOURNAMENTS_SUCCESS, tournaments, page, listIsOver};
};

export const getGames = () => {
	const params = {
		TYPE: 'getGames',
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					dispatch(getGamesSuccess(response.data.data));
				}
			},
		);
	};
};

const getGamesSuccess = (games) => {
	return {type: GET_GAMES_SUCCESS, games};
};

export const filterByGameIdOne = (filterGameID) => {
	return dispatch => {
		dispatch({type: SET_FILTER_ONE, filterGameID});
		dispatch(getOneTournaments());
	};
};

export const filterByGameIdCommand = (filterGameID) => {
	return dispatch => {
		dispatch({type: SET_FILTER_COMMAND, filterGameID});
		dispatch(getCommandTournaments());
	};
};

export const setTournamentType = (tournamentType) => {
	return dispatch => {
		dispatch({type: SET_TOURNAMENT_TYPE, tournamentType});
	};
};






