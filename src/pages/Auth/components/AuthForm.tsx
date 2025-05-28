import { useState } from 'react'
import {
	AiFillEye,
	AiFillEyeInvisible,
} from 'react-icons/ai'
import styles from './AuthForm.module.css'

interface AuthFormProps {
	type: string
	placeholder: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	error?: string
	isPending?: string
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const AuthForm = ({
	type,
	placeholder,
	value,
	onChange,
	error,
	isPending,
	onKeyDown,
}: AuthFormProps) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev)
	}

	return (
		<div className={styles.topContainer}>
			<div className={styles.inputWrapper}>
				<input
					type={type === 'password' && showPassword ? 'text' : type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				{type === 'password' && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className={styles.toggleButton}
					>
						{showPassword ? (
							<AiFillEyeInvisible size={20} />
						) : (
							<AiFillEye size={20} />
						)}
					</button>
				)}
			</div>
			{(error || isPending) && (
				<div
					className={`${styles.error} ${isPending ? styles.loading : ''}`}
					id={`${placeholder}-error`}
				>
					{isPending ? isPending : error}
				</div>
			)}
		</div>
	)
}

export default AuthForm
