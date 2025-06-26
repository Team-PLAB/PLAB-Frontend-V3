import { useMutation, useQuery } from '@tanstack/react-query'
import { Toastify } from '~/allFiles'
import { labPost, labGet, labPatch, authGet } from '~/api'
import type { rentalRequestType, rentalType } from '~/types'

export const useLab = () => {
	const requestLabRental = useMutation({  
		mutationFn: async (data: rentalType) => {
			const response = await labPost('/lab', data)
			return response
		},
	})

  const getAllLabRentals = useQuery({
    queryKey: ['allLabRentals'],
    queryFn: async () => {
      const response = await labGet('/lab/list')

      return response.data.labs
    },
  })

  const getApprovalRentals = useQuery({
    queryKey: ['approvalRentals'],
    queryFn: async () => {
      const response = await labGet('/lab/approval')

      return response.data.labs
    },
  })
  
  const getUserLabRentals = (userId: number | undefined) =>
    useQuery<rentalRequestType[]>({
      queryKey: ['userLabRentals', userId],
      queryFn: async () => {
        const response = await authGet('/auth/me')

        return response.data.user.lab
      },
      enabled: !!userId,
    });

  const getPendingLabRentals = useQuery({
    queryKey: ['pendingLabRentals'],
    queryFn: async () => {
      const response = await labGet('/lab/approved')

      return response.data.labs
    },
  })

  const patchLabStatus = useMutation({
    mutationFn: async ({ id, labName, approvalRental }: { id: number; labName?: string; approvalRental?: boolean }) => {
      const payload: { labName?: string; approvalRental?: boolean } = {}
      if (labName !== undefined) payload.labName = labName
      if (approvalRental !== undefined) {
        payload.approvalRental = approvalRental
        Toastify({type: 'success', message: '대여 승인이 완료되었습니다.'})
      }
      
      const response = await labPatch(`/lab/${id}`, payload)
      return response.body
    },
})

	return {
		requestLabRental,
		getAllLabRentals,
    getApprovalRentals,
    getUserLabRentals,
		getPendingLabRentals,
		patchLabStatus,
	}
}