import axios from 'axios'
import { refreshTokenStatus, verifyRefreshToken } from './auth'

const apiServer = import.meta.env.VITE_API_SERVER

export const CommonAPI = axios.create({
	baseURL: apiServer,
	withCredentials: true,
})

CommonAPI.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await verifyRefreshToken()
				await refreshTokenStatus()
				return CommonAPI(originalRequest)
			} catch (err) {
				return Promise.reject(err)
			}
		}

		return Promise.reject(error)
	}
)