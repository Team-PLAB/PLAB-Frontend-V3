import * as componets from '~/allFiles'
import styles from './style.module.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks'
import type { signInType } from '~/types'
import { setCookie, validateSignIn, handleKeyDown } from '~/utils'
import { GBSMFULLSCREEN } from '~/assets'

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
			onSuccess: data => {
				const accessToken = data?.accessToken
				if (accessToken) setCookie('accessToken', accessToken)
				alert('로그인에 성공하셨습니다!')
				navigate('/')
			},
			onError: error => {
				console.log(error)
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
						onKeyDown={e => handleKeyDown(e, handleSubmit)}
					/>
					<button
						onClick={handleSubmit}
						disabled={isPending}
						className={styles.submitButton}
					>
						{isPending ? '로그인중...' : '로그인'}
					</button>
					<Link to={'/signup'} className={styles.toSignUp}>
						회원가입
					</Link>
				</div>
			</div>
			<div className={styles.imgContainer} />
		</div>
	)
}

export default SignIn
