import type { rentalRequestType, rentalType } from '~/types'
import { CommonAPI } from './common'

export const labPost = async (
  accessToken: string | null,
  url: string,
  data: rentalType
): Promise<any> => {
  try {
    const response = await CommonAPI.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('POST Error: ', error)
    throw error
  }
}

export const labGet = async (
	accessToken: string | null,
	url: string
): Promise<any> => {
	try {
		const response = await CommonAPI.get(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
	} catch (error) {
		console.error('GET Error: ', error)
		throw error
	}
}

export const labPatch = async (
  accessToken: string | null,
  url: string,
  data: Partial<rentalRequestType>
): Promise<any> => {
  try {
    const response = await CommonAPI.patch(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('PATCH Error: ', error)
    throw error
  }
}
