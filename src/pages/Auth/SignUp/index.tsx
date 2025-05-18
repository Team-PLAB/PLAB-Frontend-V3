import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks'
import type { signUpType } from '~/types'
import { validateSignUp } from '~/utils'

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
				console.log(error)
			},
		})
	}

	const handleChange = (field: keyof signUpType, value: string) => {
        setSignupData({ ...signupData, [field]: value })
        setErrors({ ...errors, [field]: '' })
    }

	return (
		<div>
			<h1>회원가입</h1>
			<div>
				<input
					type="text"
					placeholder="아이디"
					value={signupData.username}
					onChange={e => handleChange('username', e.target.value)}
				/>
				{errors.username && (
					<p
						style={{
							marginTop: '4px',
							fontSize: '14px',
							color: '#ef4444',
						}}
					>
						{errors.username}
					</p>
				)}
			</div>
			<div>
				<input
					type="password"
					placeholder="비밀번호"
					value={signupData.password}
					onChange={e => handleChange('password', e.target.value)}
				/>
				{errors.password && (
					<p
						style={{
							marginTop: '4px',
							fontSize: '14px',
							color: '#ef4444',
						}}
					>
						{errors.password}
					</p>
				)}
			</div>
			<button onClick={handleSubmit} disabled={isPending}>
				{isPending ? '가입중...' : '가입하기'}
			</button>
		</div>
	)
}

export default SignUp
