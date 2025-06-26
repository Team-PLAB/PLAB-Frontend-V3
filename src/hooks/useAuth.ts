import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authPost, userPatch, userPost, logout } from '~/api'
import type { signInType, signUpType } from '~/types'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const signIn = useMutation({
    mutationFn: async (data: signInType) => {
      return await authPost('/auth/login', data)
    },
  })

  const signUp = useMutation({
    mutationFn: async (data: signUpType) => {
      return await userPost('/user/signup', data)
    },
  })

  const updateUserProfile = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: signUpType }) => {
      return await userPatch(`/user/${id}/update`, data)
    },
  })

  const signOut = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })

  return {
    signIn,
    signUp,
    updateUserProfile,
    signOut
  }
}