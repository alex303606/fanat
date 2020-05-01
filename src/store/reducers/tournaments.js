import { GET_MULTI_TOURNAMENTS_SUCCESS, GET_SINGLE_TOURNAMENTS_SUCCESS } from '../actions/actionTypes';

const initialState = {
	singleTournaments: [],
	multiTournaments: [],
};

const tournamentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SINGLE_TOURNAMENTS_SUCCESS:
			return {...state, singleTournaments: action.tournaments};
		case GET_MULTI_TOURNAMENTS_SUCCESS:
			return {...state, multiTournaments: action.tournaments};
		default:
			return state;
	}
};

export default tournamentsReducer;
