import {
	GET_STATS_COMMANDS_SUCCESS,
	GET_STATS_PLAYERS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
	one: [],
	command: [],
};

const statsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_STATS_COMMANDS_SUCCESS:
			return {...state, command: action.data};
		case GET_STATS_PLAYERS_SUCCESS:
			return {...state, one: action.data};
		default:
			return state;
	}
};

export default statsReducer;
