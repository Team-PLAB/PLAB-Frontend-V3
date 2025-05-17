import { useMutation, useQuery } from '@tanstack/react-query'
import { labPost, labGet, labPatch } from '~/api'
import type { rentalRequestType, rentalType } from '~/types'
import { getCookie } from '~/utils'

export const useLab = () => {
  const accessToken = getCookie('accessToken')

	const requestLabRental = useMutation({
		mutationFn: async (data: rentalType) => {
			const response = await labPost(accessToken, '/lab', data)
			return response
		},
	})

  const getAllLabRentals = useQuery({
    queryKey: ['allLabRentals', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('토큰 없음')
      const response = await labGet(accessToken, '/lab')
      const filteredData = response.body.filter(
				(lab: rentalRequestType) => lab.approvalRental === true
			)
      return filteredData
    },
    enabled: !!accessToken, 
  })

  const getPendingLabRentals = useQuery({
    queryKey: ['pendingLabRentals', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('토큰 없음')
      const response = await labGet(accessToken, '/lab/approved')
      return response
    },
    enabled: !!accessToken, 
  })

  const patchLabStatus = useMutation({
    mutationFn: async ({ id, labName, approvalRental }: { id: number; labName?: string; approvalRental?: boolean }) => {
      if (!accessToken) throw new Error('토큰 없음')
      const payload: { labName?: string; approvalRental?: boolean } = {}
      if (labName !== undefined) payload.labName = labName
      if (approvalRental !== undefined) payload.approvalRental = approvalRental
      
      const response = await labPatch(accessToken, `/lab/${id}`, payload)
      return response.body
    },
})

	return {
		requestLabRental,
		getAllLabRentals,
		getPendingLabRentals,
		patchLabStatus,
	}
}