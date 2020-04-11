import { SIGN_IN_SUCCESS } from '../actions/actionTypes';

const initialState = {
	userIsLoggedIn: false,
	name: 'alex',
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			return {...state, userIsLoggedIn: true};
		default:
			return state;
	}
};

export default userReducer;
