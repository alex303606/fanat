import { GET_PLAYER_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
	userIsLoggedIn: false,
	user: {
		EMAIL: '',
		ID: '',
		LOGIN: '',
		PHONE: '',
		PHOTO: '',
		COUNT_GAMES: '',
		POINTS: 0,
		TOURNAMENT: [],
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			return {...state, user: action.user, userIsLoggedIn: true};
		case GET_PLAYER_SUCCESS:
			const {COUNT_GAMES, POINTS, TOURNAMENT} = action.data;
			return {...state, user: {...state.user, COUNT_GAMES, POINTS, TOURNAMENT}};
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
