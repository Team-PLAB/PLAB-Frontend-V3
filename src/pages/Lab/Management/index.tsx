import styles from "./style.module.css"

import { useEffect } from 'react'
import { useLab } from "~/hooks"
import { useNavigate } from 'react-router-dom'
import type { rentalRequestType } from "~/types"
import { labOption } from "~/consts"
import { Header, Tooltip, Unauth } from "~/allFiles"
import { useCheckToken } from '~/hooks'

const Management = () => {
	const navigate = useNavigate()
	const { data: user, isLoading: userLoading } = useCheckToken()
	const { error: userError } = useCheckToken()
	const { getApprovalRentals, getPendingLabRentals, patchLabStatus } = useLab()
	const { data: ApprovalRentals, isLoading: ApprovalRentalsLoading } = getApprovalRentals
	const { data: pendingRentals, isLoading: pendingRentalsLoading } = getPendingLabRentals

	const handleSubmit = (id: number, approval: boolean) => {
		patchLabStatus.mutate(
			{ id, approvalRental: approval },
			{
				onSuccess: () => {
					getPendingLabRentals.refetch()
					getApprovalRentals.refetch()
				},
			}
		)
	}

	const handleChange = (id: number, labName: string) => {
		if (!labName) return
		patchLabStatus.mutate(
			{ id, labName },
			{
				onSuccess: () => getPendingLabRentals.refetch(),
			}
		)
	}

	useEffect(() => {
		if (userError) {
			alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
			navigate('/', { replace: true })
		}
	}, [userError, navigate])

	if (userError) return null
	if (userLoading) return null
	if (!user || user.role !== 'admin') return <Unauth />

	return (
		<>
			<Header theme="light" />
			<div className={styles.container}>
				<div className={styles.manageBox}>
					<h2 className={styles.sectionTitle}>대여 요청 목록</h2>
					{pendingRentalsLoading ? (
						<p>보류 중인 요청 로딩 중...</p>
					) : pendingRentals?.length > 0 ? (
						<div className={styles.tableContainer}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>대여 실습실</th>
										<th>대표자</th>
										<th>실습실 전체 사용자</th>
										<th>사용 목적</th>
										<th>대여 날짜</th>
										<th>대여 시간</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{pendingRentals.map((rental: rentalRequestType) => (
										<tr key={rental.id}>
											<td>
												<select
													className={styles.select}
													value={rental.labName}
													onChange={e => handleChange(rental.id, e.target.value)}
													disabled={patchLabStatus.isPending}
												>
													<option value={rental.labName}>{rental.labName}</option>
													{labOption
														.filter(l => l !== rental.labName)
														.map((lab, index) => (
															<option key={index} value={lab}>
																{lab}
															</option>
														))}
												</select>
											</td>
											<td>{rental.rentalUser}</td>
											<td>
												<Tooltip
													text={rental.rentalUsers}
													maxLength={40}
													className={styles.user_detail}
												/>
											</td>
											<td>
												<Tooltip
													text={rental.rentalPurpose}
													maxLength={16}
													className={styles.user_detail}
												/>
											</td>
											<td>{rental.rentalDate}</td>
											<td>{rental.rentalStartTime}</td>
											<td>
												<button
													className={styles.okbutton}
													onClick={() => handleSubmit(rental.id, true)}
													disabled={patchLabStatus.isPending}
												>
													승인
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p>보류 중인 요청이 없습니다.</p>
					)}
				</div>

				<div className={styles.manageBox}>
					<h2 className={styles.sectionTitle}>대여 승인 목록</h2>
					{ApprovalRentalsLoading ? (
						<p>승인된 대여 목록 로딩 중...</p>
					) : ApprovalRentals?.length > 0 ? (
						<div className={styles.tableContainer}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>대여 실습실</th>
										<th>대표자</th>
										<th>실습실 전체 사용자</th>
										<th>사용 목적</th>
										<th>대여 날짜</th>
										<th>대여 시간</th>
									</tr>
								</thead>
								<tbody>
									{ApprovalRentals.map((rental: rentalRequestType) => (
										<tr key={rental.id}>
											<td>
												<Tooltip
													text={rental.labName}
													maxLength={15}
													className={styles.user_detail}
												/>
											</td>
											<td>{rental.rentalUser}</td>
											<td>
												<Tooltip
													text={rental.rentalUsers}
													maxLength={40}
													className={styles.user_detail}
												/>
											</td>
											<td>
												<Tooltip
													text={rental.rentalPurpose}
													maxLength={16}
													className={styles.user_detail}
												/>
											</td>
											<td>{rental.rentalDate}</td>
											<td>{rental.rentalStartTime}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p>승인된 대여 요청이 없습니다.</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Management