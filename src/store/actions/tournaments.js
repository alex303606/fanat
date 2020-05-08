import axios from 'axios';
import { wait } from '../../utils';
import {
	GET_TOURNAMENTS_SUCCESS,
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
		PAGE_NUM: '1',
		PAGE_SIZE: '20',
	};
	return dispatch => {
		return axios.post('', params).then(
			response => {
				if (response.data.data) {
					dispatch(getTournamentsSuccess(response.data.data));
				}
			},
		);
	};
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
