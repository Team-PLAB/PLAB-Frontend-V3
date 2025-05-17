import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authPost, userPatch, userPost } from '~/api'
import type { signInType, signUpType } from '~/types'
import { deleteCookie, getCookie } from '~/utils'

export const useAuth = () => {
  const queryClient = useQueryClient()
  
  const signIn = useMutation({
    mutationFn: async (data: signInType) => {
      const response = await authPost(null, '/auth/login', data)
      return response
    },
  })

  const signUp = useMutation({
    mutationFn: async (data: signUpType) => {
      const response = await userPost(null, '/user/signup', data)
      return response
    },
  })

  const updateUserProfile = useMutation({
    mutationFn: async (params: { id: number; data: Record<string, any> }) => {
      const accessToken = getCookie('accessToken')
      const { id, data } = params
      const response = await userPatch(accessToken, `/user/${id}/update`, data)
      return response
    },
  })

  const signOut = useMutation({
    mutationFn: async () => {
      return { success: true}
    },
    onSuccess: () => {
      deleteCookie('accessToken')
      queryClient.clear()
    }
  })

  return {
		signIn,
		signUp,
		updateUserProfile,
		signOut,
	}
}