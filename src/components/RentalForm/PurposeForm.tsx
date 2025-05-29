import styles from './style.module.css'

import type { ChangeEvent } from 'react'
import type { rentalType } from '~/types'

type PurposeFormProps = {
	updateFields: (fields: Partial<rentalType>) => void
	errorFields?: Partial<rentalType>
} & Partial<rentalType>

export const PurposeForm = ({
	rentalPurpose = '',
	updateFields,
	errorFields = {},
}: PurposeFormProps) => {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		updateFields({ rentalPurpose: e.target.value })
	}

	return (
		<div className={styles.purposeContainer}>
			<span>사용 목적</span>
			<textarea
				name="rentalPurpose"
				value={rentalPurpose}
				placeholder="사용 목적을 입력하세요."
				onChange={handleChange}
				className={`${styles.rentalFormInput} ${errorFields.rentalPurpose ? styles.errorTextarea : ''}`}
				required
			/>
		</div>
	)
}
