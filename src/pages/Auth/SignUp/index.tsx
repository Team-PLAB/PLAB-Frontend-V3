import * as components from '~/allFiles'
import styles from './style.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '~/hooks'
import type { signUpType } from '~/types'
import { validateSignUp, handleKeyDown } from '~/utils'
import { GBSMFULLSCREEN } from '~/assets'
import { errorOption } from '~/consts'

const SignUp = () => {
	const [signupData, setSignupData] = useState<signUpType>({
		username: '',
		password: '',
	})
	const [errors, setErrors] = useState<Partial<signUpType>>({
		username: '',
		password: '',
	})

	const navigate = useNavigate()
	const { signUp } = useAuth()
	const { mutate, isPending } = signUp

	const handleSubmit = () => {
		const validationErrors = validateSignUp(signupData)
		setErrors(validationErrors)

		const hasErrors = Object.values(validationErrors).some(
			error => error !== ''
		)
		if (hasErrors || isPending) return

		mutate(signupData, {
			onSuccess: () => {
				alert('회원가입이 완료되었습니다.')
				navigate('/signin')
			},
			onError: error => {
				if(error.message === errorOption[409]) {
					setErrors({
						username: '',
						password: '이미 사용 중인 아이디입니다.',
					})
				}
			},
		})
	}

	const handleChange = (field: keyof signUpType, value: string) => {
		setSignupData({ ...signupData, [field]: value })
		setErrors({ ...errors, [field]: '' })
	}

	return (
		<div className={styles.topContainer}>
			<div className={styles.mainContainer}>
				<img
					src={GBSMFULLSCREEN}
					alt="경북소프트웨어마이스터고등학교 로고"
					className={styles.logo}
				/>
				<h1 className={styles.title}>회원가입</h1>
				<div className={styles.formContainer}>
					<components.AuthForm
						type="text"
						placeholder="아이디"
						value={signupData.username}
						onChange={e => handleChange('username', e.target.value)}
						error={errors.username}
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<components.AuthForm
						type="password"
						placeholder="비밀번호"
						value={signupData.password}
						onChange={e => handleChange('password', e.target.value)}
						error={errors.password}
						isPending={isPending ? '회원가입 중..' : ''}
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<button
						onClick={handleSubmit}
						disabled={isPending}
						className={styles.submitButton}
					>
						{isPending ? '회원가입 중..' : '회원가입'}
					</button>
					<Link to="/signin" className={styles.toSignIn}>
						로그인
					</Link>
				</div>
			</div>
			<div className={styles.imgContainer} />
		</div>
	)
}

export default SignUp
