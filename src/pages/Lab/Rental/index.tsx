import * as component from '~/allFiles'

import { useState } from 'react'
import { useMultiStep, useLab } from '~/hooks'
import type { rentalType } from '~/types'

const initalOption = {
	rentalDate: '',
	rentalUser: '',
	rentalUsers: '',
	rentalPurpose: '',
	rentalStartTime: '',
	labName: '',
}

const Rental = () => {
	const { requestLabRental } = useLab()
	const [formData, setFormData] = useState<rentalType>(initalOption)

	const updateFields = (fields: Partial<rentalType>) => {
		setFormData(prev => ({ ...prev, ...fields }))
	}

	const {
		currentTitle,
		currentStep,
		// currentImg,
		prev,
		next,
		isFirstStep,
		isLastStep,
	} = useMultiStep([
		{
			title: '대표자 이름과 사용 인원을 모두 입력 해주세요.',
			element: (
				<component.UserInfoForm {...formData} updateFields={updateFields} />
			),
		},
		{
			title: '사용 목적을 적어주세요.',
			element: (
				<component.PurposeForm {...formData} updateFields={updateFields} />
			),
		},
		{
			title: '대여 희망일과 대여 시간, 희망하는 실습실을 입력해주세요.',
			element: (
				<component.ScheduleForm {...formData} updateFields={updateFields} />
			),
		},
	])

	const handleSubmit = () => {
		requestLabRental.mutate(formData, {
			onSuccess: () => {
				setFormData(initalOption)
        alert('제출에 성공하셨습니다!')
			},
			onError: error => {
				console.log(error)
			},
		})
	}

	return (
		<>
			<h2>{currentTitle}</h2>
			{currentStep}
			{!isFirstStep && <button onClick={prev}>이전</button>}
			{!isLastStep && <button onClick={next}>다음</button>}
			{isLastStep && (
				<button onClick={handleSubmit} disabled={requestLabRental.isPending}>
					{requestLabRental.isPending ? '제출 중...' : '제출'}
				</button>
			)}
		</>
	)
}
export default Rental
