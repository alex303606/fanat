/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.baseURL;

axios.interceptors.request.use(conf => {
	// Do something before request is sent
	conf.data = {
		params: {
			API_KEY: config.apiKey,
			...conf.data,
		},
	};
	return conf;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
	GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);
