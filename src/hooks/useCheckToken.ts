import { useQuery } from '@tanstack/react-query'
import { authGet } from '~/api'

export const useCheckToken = () => {
	return useQuery({
		queryKey: ['checkToken'],
		queryFn: async () => {
			try {
				const res = await authGet('/auth/me')
				return res.data.user
			} catch {
				return null
			}
		},
		retry: false,
	})
}