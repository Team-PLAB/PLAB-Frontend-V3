import * as components from '~/allFiles'
import styles from './style.module.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks'
import type { signUpType } from '~/types'
import { validateSignUp, handleKeyDown } from '~/utils'
import { GBSMFULLSCREEN } from '~/assets'

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
				alert('회원가입에 성공하셨습니다!')
				navigate('/signin')
			},
			onError: error => {
				console.error('Sign-up error:', error)
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
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<button
						onClick={handleSubmit}
						disabled={isPending}
						className={styles.submitButton}
					>
						{isPending ? '회원가입중...' : '회원가입'}
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
