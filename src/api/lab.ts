import type { rentalRequestType, rentalType } from '~/types'
import { CommonAPI } from './common'

export const labPost = async (
  url: string,
  data: rentalType
): Promise<any> => {
    const response = await CommonAPI.post(url, data, {
      withCredentials: true,
    })

    return response.data
}

export const labGet = async (
	url: string
): Promise<any> => {
		const response = await CommonAPI.get(url, {
      withCredentials: true,
    })

		return response.data
}

export const labPatch = async (
  url: string,
  data: Partial<rentalRequestType>
): Promise<any> => {
    const response = await CommonAPI.patch(url, data, {
      withCredentials: true,
    })

    return response.data
}
