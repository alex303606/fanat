import config from '../config';

export const wait = (timeout) => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

export const allowLoadMore = (obj) => {
	const quantity = Object.values(obj).reduce((acc, x) => {
		return acc + x.length;
	}, 0);
	return quantity < config.PAGE_SIZE;
};

export const tournamentsToArray = tournaments => {
	return Object.keys(tournaments).map(key => {
		return {
			title: key,
			data: tournaments[key],
		};
	});
};

export const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const passReg = /^(?=.*\d)(?=.*[a-z]).{8,}/;
