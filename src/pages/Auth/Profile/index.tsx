import * as components from '~/allFiles'
import styles from './style.module.css'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Slide } from 'react-toastify'
import { useAuth, useCheckToken, useLab } from '~/hooks'
import { GBSM_Symbol, NotRentLab } from '~/assets'
import type { rentalRequestType } from '~/types'

const Profile = () => {
	const navigate = useNavigate()
	const { getUserLabRentals } = useLab()
	const { signOut } = useAuth()
	const {
		data: userStatus,
		isLoading: userLoading,
		error: userError,
	} = useCheckToken()
	const username = userStatus?.username
	const userId = userStatus?.id
	const { data: myRentals, isLoading: rentalsLoading } =
		getUserLabRentals(userId)

	const handleLogout = () => {
		signOut.mutate(undefined, {
			onSuccess: () => {
				alert('로그아웃하셨습니다.')
			},
		})
	}

	useEffect(() => {
		if (userError) {
			navigate('/login')
			components.Toastify({
				type: 'info',
				message: '세션이 만료되었습니다.',
				transition: Slide,
			})
		}
	}, [userError, navigate])

	if (userLoading || rentalsLoading || !userStatus) {
		return (
			<h1 className={styles.sectionTitle}>사용자 및 대여 정보 확인 중...</h1>
		)
	}

	const rentals: rentalRequestType[] = Array.isArray(myRentals) ? myRentals : []

	return (
		<>
			<components.Header theme="light" />
			<div className={styles.container}>
				<div className={styles.manageBox}>
					<div className={styles.mainContainer}>
						<div className={styles.mainTitleContainer}>
							<img
								src={GBSM_Symbol}
								alt="경소마고 로고"
								className={styles.mainTitleImg}
							/>
							<h2 className={styles.mainTitle}>{username}</h2>
						</div>
						<div className={styles.userBox}>
							<button className={styles.logoutBtn} onClick={handleLogout}>
								로그아웃
							</button>
						</div>
					</div>
					<hr className={styles.divider} />
					<h2 className={styles.rentalTitle}>
						<span>나의</span> 실습실 정보
					</h2>
					{rentals.length > 0 ? (
						<div className={styles.tableContainer}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>대여 실습실</th>
										<th>대여 날짜</th>
										<th>대여 시간</th>
										<th>승인 상태</th>
									</tr>
								</thead>
								<tbody>
									{rentals.map((rental: rentalRequestType) => (
										<tr key={rental.id}>
											<td>{rental.labName}</td>
											<td>{rental.rentalDate}</td>
											<td>{rental.rentalStartTime}</td>
											<td>
												<span
													className={
														rental.approvalRental
															? styles.approval
															: styles.notApproval
													}
												>
													{rental.approvalRental ? '승인됨' : '승인 안됨'}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className={styles.noneContainer}>
							<img
								src={NotRentLab}
								alt="실습실 빌리세요"
								className={styles.notRentImg}
							/>
							<div className={styles.notTitle}>
								<p>아직 빌린 실습실이 없어요</p>
								<Link to="/rental" className={styles.toRental}>
									실습실 대여하기
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Profile
