import * as componets from '~/allFiles'
import styles from './style.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Slide } from 'react-toastify'
import { useAuth } from '~/hooks'
import type { signInType } from '~/types'
import { validateSignIn, handleKeyDown } from '~/utils'
import { GBSMFULLSCREEN } from '~/assets'
import { errorOption } from '~/consts'

const SignIn = () => {
	const [signInData, setSignInData] = useState<signInType>({
		login: '',
		password: '',
	})
	const [errors, setErrors] = useState<Partial<signInType>>({
		login: '',
		password: '',
	})

	const navigate = useNavigate()
	const { signIn } = useAuth()
	const { mutate, isPending } = signIn

	const handleSubmit = () => {
		const validationErrors = validateSignIn(signInData)
		setErrors(validationErrors)

		const hasErrors = Object.values(validationErrors).some(
			error => error !== ''
		)
		if (hasErrors || isPending) return

		mutate(signInData, {
			onSuccess: () => {
				navigate('/')
				componets.Toastify({ type: 'info', message: `${signInData.login}님, 환영합니다.`, transition: Slide })
			},
			onError: error => {
				if(error.message === errorOption[400] || error.message === errorOption[401]) {
					setErrors({
						login: '',
						password: '아이디 또는 비밀번호가 잘못되었습니다.',
					})
				}
			},
		})
	}

	const handleChange = (field: keyof signInType, value: string) => {
		setSignInData({ ...signInData, [field]: value })
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
				<h1 className={styles.title}>로그인</h1>
				<div className={styles.formContainer}>
					<componets.AuthForm
						type="text"
						placeholder="아이디"
						value={signInData.login}
						onChange={e => handleChange('login', e.target.value)}
						error={errors.login}
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<componets.AuthForm
						type="password"
						placeholder="비밀번호"
						value={signInData.password}
						onChange={e => handleChange('password', e.target.value)}
						error={errors.password}
						isPending={isPending ? '로그인 중..' : ''}
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<button
						onClick={handleSubmit}
						disabled={isPending}
						className={styles.submitButton}
					>
						{isPending ? '로그인 중..' : '로그인'}
					</button>
					<Link to={'/signup'} className={styles.toSignUp}>
						회원가입
					</Link>
				</div>
			</div>
			<div className={styles.imgContainer}>
				<h1>Kyungbuk Software</h1>
				<span>Meister High School</span>
			</div>
		</div>
	)
}

export default SignIn
