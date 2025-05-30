import type { rentalType, signInType, signUpType } from "~/types";

const validateSignUp = (values: signUpType) => {
  const errors: Partial<signUpType> = {
		username: '',
		password: '',
	}

  if (!values.username.trim()) {
		errors.username = '아이디를 입력해주세요.'
	} else if (values.username.length < 4 || values.username.length > 15) {
		errors.username = '아이디는 4~15자리로 입력해주세요.'
	} else if (/\s/.test(values.username)) {
		errors.username = '아이디에 공백을 포함할 수 없습니다.'
	}
  
  if (!values.password.trim()) {
		errors.password = '비밀번호를 입력해주세요.'
	} else if (values.password.length < 4 || values.password.length > 20) {
		errors.password = '비밀번호는 4~20자리로 입력해주세요.'
	} else if (/\s/.test(values.password)) {
		errors.password = '비밀번호에 공백을 포함할 수 없습니다.'
	}

  return errors
}

const validateSignIn = (values: signInType) => {
  const errors: Partial<signInType> = {
		login: '',
		password: '',
	}

  if (!values.login.trim()) {
		errors.login = '아이디를 입력해주세요.'
	}
  
  if (!values.password.trim()) {
		errors.password = '비밀번호를 입력해주세요.'
	}

  return errors
}

const validateRental = (values: rentalType) => {
	const errors: Partial<rentalType> = {
		rentalDate: '',
		rentalUser: '',
		rentalUsers: '',
		rentalPurpose: '',
		rentalStartTime: '',
		labName: '',	
	}

	if (!values.rentalDate.trim()) {
		errors.rentalDate = '대여 희망일을 선택해주세요.'
	}	

	if (!values.rentalUser.trim()) {
		errors.rentalUser = '대표자를 기재해주세요.'
	}

	if (!values.rentalUsers.trim()) {
		errors.rentalUsers = '사용 인원을 전원 기재해주세요.'
	}

	if (!values.rentalPurpose.trim()) {
		errors.rentalPurpose = '사용 목적을 입력해주세요.'
	}

	if (!values.rentalStartTime.trim()) {
		errors.rentalStartTime = '사용 대여 시간을 선택해주세요.'
	}

	if (!values.labName.trim()) {
		errors.labName = '대여 희망 실습실을 선택해주세요.'
	}

	return errors
}

export { validateSignUp, validateSignIn, validateRental }