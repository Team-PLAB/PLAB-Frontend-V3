import type { rentalRequestType, rentalType } from '~/types'
import { CommonAPI } from './common'

export const labPost = async (
	accessToken: string | null,
	url: string,
	data: rentalType
): Promise<any> => {
	const response = await CommonAPI.post(url, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	return response.data
}

export const labGet = async (
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

export const labPatch = async (
	accessToken: string | null,
	url: string,
	data: Partial<rentalRequestType>
): Promise<any> => {
	const response = await CommonAPI.patch(url, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	return response.data
}
