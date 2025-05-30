import styles from './style.module.css'

import { useState, useEffect } from 'react'
import { IoIosWarning } from 'react-icons/io'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	actionFunction: () => Promise<void>
}

const RentalModal = ({ isOpen, onClose, actionFunction }: ModalProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
			setIsChecked(false)
		} else {
			const timer = setTimeout(() => setIsVisible(false), 200)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	const handleAction = async () => {
		try {
			await actionFunction()
			onClose()
		} catch (error) {}
	}

	const handleCheckboxChange = () => {
		setIsChecked(prev => !prev)
	}

	if (!isVisible) return null

	return (
		<div className={styles.modalBackground} onClick={onClose}>
			<div
				className={`${styles.modalWrapper} ${isOpen ? styles.fadeIn : styles.fadeOut}`}
				onClick={e => e.stopPropagation()}
			>
				<div className={styles.warningTextWrap}>
					<IoIosWarning className={styles.warningLogo} />
					<h1>실습실 사용 규정 안내</h1>
				</div>
				<section className={styles.regulationSection}>
					<h3>주요 규정</h3>
					<ol>
						<li>
							청결 유지: 책상, 의자, 장비 등을 사용 전 상태로 정돈
							<br />
							음식물 반입 및 취식은 금지{' '}
							<span>(일주일 대여 불가 & 벌점 2점)</span>
						</li>
						<li>
							사전 예약자만 이용 가능{' '}
							<span>(타 학생 출입 시, 일주일 대여 불가 & 벌점 3점)</span>
						</li>
						<li>
							장비 무단 분해 및 설정 변경 금지, 개인 소프트웨어 설치 금지{' '}
							<span>(벌점 20점)</span>
						</li>
						<li>실습실 출입은 반드시 본인의 학생증으로만 개방</li>
					</ol>
				</section>
				<div className={styles.checkboxWrap}>
					<input
						type="checkbox"
						id="regulation-agree"
						checked={isChecked}
						onChange={handleCheckboxChange}
						className={styles.checkboxInput}
					/>
					<label htmlFor="regulation-agree">
						위 내용을 모두 확인하였으며, 규정을 준수하겠습니다.
					</label>
				</div>
				<div className={styles.btnWrap}>
					<button
						onClick={handleAction}
						className={styles.confirmBtn}
						disabled={!isChecked}
					>
						확인
					</button>
					<button onClick={onClose} className={styles.cancelBtn}>
						취소
					</button>
				</div>
			</div>
		</div>
	)
}

export default RentalModal
