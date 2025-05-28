import * as component from '~/allFiles'
import styles from './style.module.css'

import { useState } from 'react'
import { useMultiStep, useLab } from '~/hooks'
import type { rentalType } from '~/types'
import { StepOne, StepTwo, StepThree } from '~/assets'

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
		currentImg,
		prev,
		next,
		isFirstStep,
		isLastStep,
	} = useMultiStep([
		{
			title: '대표자 이름과\n사용 인원을 모두 입력 해주세요!',
			img: StepOne,
			element: (
				<div className={styles.stepOneContainer}>
					<component.UserInfoForm {...formData} updateFields={updateFields} />
				</div>
			),
		},
		{
			title: (
				<>
					사용 목적을 적어주세요!
					<h2 className={styles.subCurrentTitle}>
						프로젝트시 무슨 프로젝트인지 <br />어떤 대회인지 반드시 적어주세요.
					</h2>
				</>
			),
			img: StepTwo,
			element: (
				<div className={styles.stepTwoContainer}>
					<component.PurposeForm {...formData} updateFields={updateFields} />
				</div>
			),
		},
		{
			title: '대여 희망일과 대여 시간,\n희망하는 실습실을 입력해주세요!',
			img: StepThree,
			element: (
				<div className={styles.stepThreeContainer}>
					<component.ScheduleForm {...formData} updateFields={updateFields} />
				</div>
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
						<button onClick={prev} className={styles.prev}>
							이전
						</button>
					)}
					{!isLastStep && (
						<button onClick={next} className={styles.next}>
							다음
						</button>
					)}
					{isLastStep && (
						<button
							onClick={handleSubmit}
							disabled={requestLabRental.isPending}
							className={styles.submit}
						>
							{requestLabRental.isPending ? '제출 중..' : '제출'}
						</button>
					)}
				</div>
			</main>
		</div>
	)
}
export default Rental
