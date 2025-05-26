import type { signInType } from '~/types'
import { CommonAPI } from './common'

export const authPost = async (
	accessToken: string | null,
	url: string,
	data: signInType
): Promise<any> => {
	const response = await CommonAPI.post(url, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	return response.data
}

export const authGet = async (
	accessToken: string | null,
	url: string
): Promise<any> => {
	const response = await CommonAPI.get(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	return response.data
}
