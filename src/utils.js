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
	console.log(quantity);
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
