export type rentalType = {
	rentalDate: string
	rentalUser: string
	rentalUsers: string
	rentalPurpose: string
	rentalStartTime: string
	labName: string
}

export type rentalRequestType = {
	id: number
	userId: number
	rentalDate: string
	rentalStartTime: string
	rentalUser: string
	rentalUsers: string
	rentalPurpose: string
	deletionRental: boolean
	approvalRental: boolean
	labName: string
}

