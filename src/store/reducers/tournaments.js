import {
	SORT_SINGLE_TOURNAMENTS,
	SORT_MULTI_TOURNAMENTS, GET_TOURNAMENTS_SUCCESS, LOAD_MORE_TOURNAMENTS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
	tournaments: [],
};

const tournamentsToArray = tournaments => {
	return Object.keys(tournaments).map(key => {
		return {
			title: key,
			data: tournaments[key],
		};
	});
};

const tournamentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TOURNAMENTS_SUCCESS:
			return {...state, tournaments: tournamentsToArray(action.tournaments)};
		case LOAD_MORE_TOURNAMENTS_SUCCESS:
			return {...state, tournaments: action.tournaments};
		case SORT_SINGLE_TOURNAMENTS:
			return {...state, singleTournaments: action.tournaments.filter(x => x.type === action.value)};
		case SORT_MULTI_TOURNAMENTS:
			return {...state, multiTournaments: action.tournaments.filter(x => x.type === action.value)};
		default:
			return state;
	}
};

export default tournamentsReducer;
