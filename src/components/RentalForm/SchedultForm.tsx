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
					<input
						type="date"
						name="rentalDate"
						value={rentalDate}
						placeholder="대여 희망일"
						onChange={handleChange}
						required
					/>
					<select
						name="rentalStartTime"
						value={rentalStartTime}
						onChange={handleChange}
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
					<select
						name="labName"
						value={labName}
						onChange={handleChange}
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
				</>
			)
		}