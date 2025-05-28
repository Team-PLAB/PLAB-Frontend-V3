import styles from './style.module.css'

import type { ChangeEvent } from "react"
import { labOption, timeOption } from "~/consts"
import type { rentalType } from "~/types"

type ScheduleFormProps = {
  updateFields: (fields: Partial<rentalType>) => void
} & Partial<rentalType>
  
   export const ScheduleForm = ({ rentalDate, rentalStartTime, labName, updateFields }: ScheduleFormProps) => {
			const handleChange = (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => {
				updateFields({ [e.target.name]: e.target.value })
			}

			return (
				<>
					<div className={styles.mainContainer}>
						<span>대여 희망일</span>
						<input
							type="date"
							name="rentalDate"
							value={rentalDate}
							placeholder="대여 희망일"
							onChange={handleChange}
							className={styles.rentalFormInput}
							required
						/>
					</div>
					<div className={styles.userInfoContainer}>
						<span>사용 대여 시간</span>
						<select
						name="rentalStartTime"
						value={rentalStartTime}
						onChange={handleChange}
						className={styles.rentalSelect}
						required
					>
						<option value="" disabled>
							사용 대여 시간을 선택해주세요.
						</option>
						{timeOption.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					</div>
					<div className={styles.userInfoContainer}>
						<span>대여 희망 실습실</span>
						<select
						name="labName"
						value={labName}
						onChange={handleChange}
						className={styles.rentalSelect}
						required
					>
						<option value="" disabled>
							사용 실습실을 선택해주세요.
						</option>
						{labOption.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					</div>
				</>
			)
		}