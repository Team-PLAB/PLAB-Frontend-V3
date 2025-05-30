import * as component from '~/allFiles'
import styles from './style.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiStep, useLab } from '~/hooks'
import type { rentalType } from '~/types'
import { StepOne, StepTwo, StepThree } from '~/assets'
import { validateRental } from '~/utils'
import { errorOption } from '~/consts'

const initialOption: rentalType = {
	rentalDate: '',
	rentalUser: '',
	rentalUsers: '',
	rentalPurpose: '',
	rentalStartTime: '',
	labName: '',
}

const Rental = () => {
	const { requestLabRental } = useLab()
	const [formData, setFormData] = useState<rentalType>(initialOption)
	const [errorFields, setErrorFields] = useState<Partial<rentalType>>({})
	const [isModalOpen, setIsModalOpen] = useState(false)

	const navigate = useNavigate()

	const updateFields = (fields: Partial<rentalType>) => {
		setFormData(prev => ({ ...prev, ...fields }))
		setErrorFields(prev => {
			const newErrors = { ...prev }
			Object.keys(fields).forEach(
				key => delete newErrors[key as keyof rentalType]
			)
			return newErrors
		})
	}

	const {
		currentTitle,
		currentStep,
		currentImg,
		prev,
		next,
		isFirstStep,
		isLastStep,
		currentStepIndex,
	} = useMultiStep([
		{
			title: '대표자 이름과\n사용 인원을 모두 입력 해주세요!',
			img: StepOne,
			element: (
				<div className={styles.stepOneContainer}>
					<component.UserInfoForm
						{...formData}
						updateFields={updateFields}
						errorFields={errorFields}
					/>
				</div>
			),
		},
		{
			title: (
				<>
					사용 목적을 적어주세요!
					<h2 className={styles.subCurrentTitle}>
						프로젝트시 무슨 프로젝트인지 <br />
						어떤 대회인지 반드시 적어주세요.
					</h2>
				</>
			),
			img: StepTwo,
			element: (
				<div className={styles.stepTwoContainer}>
					<component.PurposeForm
						{...formData}
						updateFields={updateFields}
						errorFields={errorFields}
					/>
				</div>
			),
		},
		{
			title: '대여 희망일과 대여 시간,\n희망하는 실습실을 입력해주세요!',
			img: StepThree,
			element: (
				<div className={styles.stepThreeContainer}>
					<component.ScheduleForm
						{...formData}
						updateFields={updateFields}
						errorFields={errorFields}
					/>
				</div>
			),
		},
	])

	const handleNext = () => {
		const stepFields: (keyof rentalType)[][] = [
			['rentalUser', 'rentalUsers'],
			['rentalPurpose'],
			['rentalDate', 'rentalStartTime', 'labName'],
		]

		const errors = validateRental(formData)
		const relevantFields = stepFields[currentStepIndex]
		const hasErrors = relevantFields.some(field => errors[field] !== '')

		if (hasErrors) {
			const newErrorFields: Partial<rentalType> = {}
			relevantFields.forEach(field => {
				if (errors[field]) {
					newErrorFields[field] = errors[field]
				}
			})
			setErrorFields(newErrorFields)

			relevantFields.forEach(field => {
				if (errors[field]) {
					component.Toastify({
						type: 'error',
						message: errors[field],
					})
				}
			})
			return
		}

		setErrorFields({})
		next()
	}

	const handleSubmit = () => {
		const errors = validateRental(formData)
		const hasErrors = Object.values(errors).some(error => error !== '')

		if (hasErrors) {
			setErrorFields(errors)

			Object.values(errors).forEach(error => {
				if (error) {
					component.Toastify({
						type: 'error',
						message: error,
					})
				}
			})
			return
		}

		setErrorFields({})
		setIsModalOpen(true)
	}

	const handleModalConfirm = async () => {
		await requestLabRental.mutateAsync(formData, {
			onSuccess: () => {
				setFormData(initialOption)
				component.Toastify({
					type: 'success',
					message: '제출에 성공했습니다.',
				})
			},
			onError: error => {
				if (error.message === errorOption[401]) {
					alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
					navigate('/signin')
				}
			},
		})
	}

	return (
		<div className={styles.topContainer}>
			<header>
				<h4 className={styles.headerTitle}>실습실 대여</h4>
				<img src={currentImg} alt="순서 이미지" className={styles.stepImg} />
			</header>
			<main className={styles.mainContainer}>
				<h2 className={styles.currentTitle}>
					<pre>{currentTitle}</pre>
				</h2>
				{currentStep}
				<div className={styles.buttonContainer}>
					{!isFirstStep && (
						<button
							onClick={prev}
							className={styles.rentalButton}
							id={styles.prev}
						>
							이전
						</button>
					)}
					{!isLastStep && (
						<button
							onClick={handleNext}
							className={styles.rentalButton}
							id={styles.next}
						>
							다음
						</button>
					)}
					{isLastStep && (
						<button
							onClick={handleSubmit}
							disabled={requestLabRental.isPending}
							className={styles.rentalButton}
							id={styles.submit}
						>
							{requestLabRental.isPending ? '제출 중..' : '제출'}
						</button>
					)}
				</div>
			</main>
			<component.RentalModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				actionFunction={handleModalConfirm}
			/>
		</div>
	)
}

export default Rental
