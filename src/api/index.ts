/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
	baseURL: process.env.REACT_APP_DEV_SERVER,
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
		if (error.response?.status === 500) {
			toast.error('Something went wrong, please try again later');
		}
	}
);
