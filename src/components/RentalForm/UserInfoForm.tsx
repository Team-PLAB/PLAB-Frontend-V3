import styles from './style.module.css'

import type { ChangeEvent } from 'react'
import type { rentalType } from '~/types'

type UserInfoFormProps = {
	updateFields: (fields: Partial<rentalType>) => void
	errorFields?: Partial<rentalType>
} & Partial<rentalType>

export const UserInfoForm = ({
	rentalUser = '',
	rentalUsers = '',
	updateFields,
	errorFields = {},
}: UserInfoFormProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateFields({ [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className={styles.mainContainer}>
				<span>대표자 이름 기재 (1101 홍길동)</span>
				<input
					type="text"
					placeholder="대표자 이름"
					name="rentalUser"
					value={rentalUser}
					onChange={handleChange}
					className={`${styles.rentalFormInput} ${errorFields.rentalUser ? styles.errorInput : ''}`}
					required
				/>
			</div>
			<div className={styles.mainContainer}>
				<span>사용 인원 전원 기재 (1101 홍길동, 1102 홍길순)</span>
				<input
					type="text"
					name="rentalUsers"
					value={rentalUsers}
					placeholder="사용 인원 이름"
					onChange={handleChange}
					className={`${styles.rentalFormInput} ${errorFields.rentalUsers ? styles.errorInput : ''}`}
					required
				/>
			</div>
		</>
	)
}
