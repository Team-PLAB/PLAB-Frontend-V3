import type { ChangeEvent } from "react"
import type { rentalType } from "~/types"

type UserInfoFormProps = {
  updateFields: (fields: Partial<rentalType>) => void
} & Partial<rentalType>

export const UserInfoForm = ({ rentalUser, rentalUsers, updateFields }: UserInfoFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFields({ [e.target.name]: e.target.value })
  }

  return (
    <>
      <input
        type="text"
        placeholder="대표자 이름"
        name="rentalUser"
        value={rentalUser}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rentalUsers"
        value={rentalUsers}
        placeholder="사용 인원 이름"
        onChange={handleChange}
        required
      />
    </>
  )
}