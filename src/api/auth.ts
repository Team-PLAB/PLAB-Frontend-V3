import type { signInType } from '~/types'
import { CommonAPI } from './common'

export const authGet = async (url: string): Promise<any> => {
	const response = await CommonAPI.get(url, {
		withCredentials: true,
	})
	return response.data
}

export const authPost = async (url: string, data: signInType): Promise<any> => {
	const response = await CommonAPI.post(url, data, {
		withCredentials: true,
	})
	return response.data
}

export const logout = async (): Promise<any> => {
	const response = await CommonAPI.post('/auth/logout', {}, {
		withCredentials: true,
	})
	return response.data
}