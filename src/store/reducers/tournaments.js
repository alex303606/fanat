import {
	GET_GAMES_SUCCESS,
	SET_TOURNAMENT_TYPE,
	GET_ONE_TOURNAMENTS_SUCCESS,
	GET_COMMAND_TOURNAMENTS_SUCCESS,
	LOAD_MORE_ONE_TOURNAMENTS_SUCCESS,
	LOAD_MORE_COMMAND_TOURNAMENTS_SUCCESS,
	ONE_TOURNAMENTS_LOADING,
	COMMAND_TOURNAMENTS_LOADING, SET_FILTER_COMMAND, SET_FILTER_ONE,
} from '../actions/actionTypes';
import { tournamentsToArray } from '../../utils';

const initialState = {
	one: {
		tournaments: [],
		refreshing: false,
		page: 2,
		listIsOver: false,
		filterGameID: undefined,
	},
	command: {
		tournaments: [],
		refreshing: false,
		page: 2,
		listIsOver: false,
		filterGameID: undefined,
	},
	games: [],
	tournamentType: 'ONE',
};

const tournamentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ONE_TOURNAMENTS_SUCCESS:
			return {
				...state,
				one: {
					...state.one,
					refreshing: false,
					page: 2,
					listIsOver: action.listIsOver,
					tournaments: tournamentsToArray(action.tournaments),
				},
			};
		
		case GET_COMMAND_TOURNAMENTS_SUCCESS:
			return {
				...state,
				command: {
					...state.command,
					refreshing: false,
					page: 2,
					listIsOver: action.listIsOver,
					tournaments: tournamentsToArray(action.tournaments),
				},
			};
		
		case ONE_TOURNAMENTS_LOADING:
			return {...state, one: {...state.one, refreshing: true}};
		
		case COMMAND_TOURNAMENTS_LOADING:
			return {...state, command: {...state.command, refreshing: true}};
		
		case LOAD_MORE_ONE_TOURNAMENTS_SUCCESS:
			return {
				...state,
				one: {
					...state.one,
					refreshing: false,
					page: action.page,
					listIsOver: action.listIsOver,
					tournaments: action.tournaments,
				},
			};
		
		case LOAD_MORE_COMMAND_TOURNAMENTS_SUCCESS:
			return {
				...state,
				command: {
					...state.command,
					refreshing: false,
					page: action.page,
					listIsOver: action.listIsOver,
					tournaments: action.tournaments,
				},
			};
		
		case GET_GAMES_SUCCESS:
			return {...state, games: action.games};
		
		case SET_FILTER_COMMAND:
			return {...state, command: {...state.command, filterGameID: action.filterGameID}};
		
		case SET_FILTER_ONE:
			return {...state, one: {...state.one, filterGameID: action.filterGameID}};
		
		case SET_TOURNAMENT_TYPE:
			return {...state, tournamentType: action.tournamentType};
		
		default:
			return state;
	}
};

export default tournamentsReducer;
