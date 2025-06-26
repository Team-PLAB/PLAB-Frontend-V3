import type { signUpType } from '~/types'
import { CommonAPI } from './common'

export const userPost = async (url: string, data: signUpType): Promise<any> => {
	const response = await CommonAPI.post(url, data, {
		withCredentials: true,
	})
	return response.data
}

export const userPatch = (
	url: string,
	data: signUpType
): Promise<any> => {
	return CommonAPI.patch(url, data, {
		withCredentials: true,
	})
}