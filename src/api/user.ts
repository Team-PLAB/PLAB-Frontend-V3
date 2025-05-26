import type { signUpType } from '~/types'
import { CommonAPI } from './common'

export const userPost = async (
	accessToken: string | null,
	url: string,
	data: signUpType
): Promise<any> => {
		const response = await CommonAPI.post(url, data, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
}

export const userPatch = async (
	accessToken: string | null,
	url: string,
	data: Partial<signUpType>
): Promise<any> => {
		const response = await CommonAPI.patch(url, data, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
}
