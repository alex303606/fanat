import axios from 'axios';
import { wait } from '../../utils';
import { GET_MULTI_TOURNAMENTS_SUCCESS, GET_SINGLE_TOURNAMENTS_SUCCESS } from './actionTypes';

const multiTournaments = [
	{
		id: '8',
		type: 'cs',
		players: '25',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '30',
		date: '20.02.20',
	},
	{
		id: '9',
		type: 'dota',
		players: '3',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '10',
		type: 'warface',
		players: '10',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '11',
		type: 'def',
		players: '17',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '12',
		type: 'fifa',
		players: '15',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '30',
		date: '20.02.20',
	},
	{
		id: '13',
		type: 'pes',
		players: '13',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '14',
		type: 'ufc',
		players: '10',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
];

const singleTournaments = [
	{
		id: '1',
		type: 'fifa',
		name: 'FIFA 20',
		players: '15',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '30',
		date: '20.02.20',
	},
	{
		id: '2',
		type: 'pes',
		name: 'PES 2020',
		players: '13',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '3',
		type: 'ufc',
		name: 'UFC',
		players: '10',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '4',
		type: 'cs',
		name: 'CS GO',
		players: '25',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '30',
		date: '20.02.20',
	},
	{
		id: '5',
		type: 'dota',
		name: 'DOTA 2',
		players: '3',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '6',
		type: 'warface',
		name: 'WARFACE',
		players: '10',
		address: 'ул. Киевская, 190',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
	{
		id: '7',
		type: 'def',
		players: '17',
		address: 'ул. Ахунбаева, 94/3',
		price: '15000',
		maxPlayers: '20',
		date: '20.02.20',
	},
];

export const registerQrCode = (code) => {
	return dispatch => {
		return wait(2000);
	};
};

export const getSingleTournaments = () => {
	return dispatch => {
		return wait(2000).then(() => {
			dispatch(getSingleTournamentsSuccess(singleTournaments));
			return true;
		});
	};
};

const getSingleTournamentsSuccess = (tournaments) => {
	return {type: GET_SINGLE_TOURNAMENTS_SUCCESS, tournaments};
};

export const getMultiTournaments = () => {
	return dispatch => {
		return wait(2000).then(() => {
			dispatch(getMultiTournamentsSuccess(multiTournaments));
			return true;
		});
	};
};

const getMultiTournamentsSuccess = (tournaments) => {
	return {type: GET_MULTI_TOURNAMENTS_SUCCESS, tournaments};
};
