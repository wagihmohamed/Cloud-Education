/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { notification } from 'antd';

export const api = axios.create({
	baseURL:
		'https://virtserver.swaggerhub.com/alisaber272/cloud-education-api/1.0.0',
});

api.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	async (error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response.status === 500) {
			notification.open({
				message: 'Error',
				description: 'Internal Server Error',
				type: 'error',
			});
		}
	}
);
