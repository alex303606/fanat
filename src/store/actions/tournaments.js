import axios from 'axios';
import { wait } from '../../utils';
import config from '../../../config';
import {
	GET_TOURNAMENTS_SUCCESS, LOAD_MORE_TOURNAMENTS_SUCCESS,
	SORT_MULTI_TOURNAMENTS,
	SORT_SINGLE_TOURNAMENTS,
} from './actionTypes';

export const registerQrCode = (code) => {
	return dispatch => {
		return wait(2000);
	};
};

export const getTournaments = () => {
	const params = {
		TYPE: 'getTournaments',
		PAGE_NUM: 1,
		PAGE_SIZE: config.PAGE_SIZE,
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					dispatch(getTournamentsSuccess(response.data.data));
					return response.data.data;
				}
			},
		);
	};
};

export const loadMoreTournaments = (page) => {
	const params = {
		TYPE: 'getTournaments',
		PAGE_NUM: page,
		PAGE_SIZE: config.PAGE_SIZE,
	};
	return (dispatch, getState) => {
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					const store = getState();
					const tournaments = store.tournaments.tournaments;
					const updatedTournaments = [...tournaments];
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
					dispatch(loadMoreTournamentsSuccess(updatedTournaments));
					return response.data.data;
				}
			},
		);
	};
};

const loadMoreTournamentsSuccess = (tournaments) => {
	return {type: LOAD_MORE_TOURNAMENTS_SUCCESS, tournaments};
};

const getTournamentsSuccess = (tournaments) => {
	return {type: GET_TOURNAMENTS_SUCCESS, tournaments};
};

export const sortSingleTournaments = value => {
	return (dispatch, getState) => {
		const store = getState();
		const tournaments = store.tournaments.singleTournaments;
		dispatch({type: SORT_SINGLE_TOURNAMENTS, value, tournaments});
	};
};

export const sortMultiTournaments = value => {
	return (dispatch, getState) => {
		const store = getState();
		const tournaments = store.tournaments.multiTournaments;
		dispatch({type: SORT_MULTI_TOURNAMENTS, value, tournaments});
	};
};
