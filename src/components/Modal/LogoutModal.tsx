import styles from './style.module.css'

import { useState, useEffect } from 'react'
import { GBSM_Symbol } from '~/assets'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
		} else {
			const timer = setTimeout(() => setIsVisible(false), 200)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	const confirmLogout = () => {
		onConfirm()
		onClose()
	}

	if (!isVisible) return null

	return (
		<div className={styles.modalBackground} onClick={onClose}>
			<div
				className={`${styles.modalLogoutWrapper} ${isOpen ? styles.fadeIn : styles.fadeOut}`}
				onClick={e => e.stopPropagation()}
			>
				<div className={styles.modalLogoContainer}>
					<img src={GBSM_Symbol} alt="경소마고 로고" />
				</div>
				<div style={{ fontSize: '1rem' }}>
					<span style={{ color: '#00AA87' }}>
						경북소프트웨어 마이스터고등학교
					</span>
				</div>
				<div style={{ fontSize: '1rem' }}>
					<span style={{ color: '#7d7d7d' }}>실습실 대여 시스템</span>
				</div>
				<p style={{ marginTop: '1rem'}}>정말로 로그아웃 하시겠습니까?</p>
				<div className={styles.btnWrap}>
					<button onClick={confirmLogout} className={styles.confirmBtn}>
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
