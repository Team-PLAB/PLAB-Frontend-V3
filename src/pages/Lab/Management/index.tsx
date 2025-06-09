import styles from "./style.module.css"
import { useLab } from "~/hooks"
import type { rentalRequestType } from "~/types"
import { labOption } from "~/consts"
import { Header, Tooltip } from "~/allFiles"
import { useState, useMemo } from "react"

const Management = () => {
  const { getAllLabRentals, getPendingLabRentals, patchLabStatus } = useLab()
  const { data: allLabRentals, isLoading: allLabRentalsLoading } = getAllLabRentals
  const { data: pendingRentals, isLoading: pendingRentalsLoading } = getPendingLabRentals

  const [sortKey] = useState<keyof rentalRequestType>("rentalDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [pendingSortOrder, setPendingSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedSortOrder, setSelectedSortOrder] = useState<"asc" | "desc">("asc")

  const handleSubmit = (id: number, approval: boolean) => {
    patchLabStatus.mutate(
      { id, approvalRental: approval },
      {
        onSuccess: () => {
          getPendingLabRentals.refetch()
          getAllLabRentals.refetch()
        },
        onError: (err) => console.log(err),
      }
    )
  }

  const handleChange = (id: number, labName: string) => {
    if (!labName) return
    patchLabStatus.mutate(
      { id, labName },
      {
        onSuccess: () => getPendingLabRentals.refetch(),
        onError: (err) => console.log(err),
      }
    )
  }

  const handleInquiry = () => {
    setSortOrder(pendingSortOrder)
  }

  const handleApprovedInquiry = () => {
    setSortOrder(selectedSortOrder)
  }

  const sortedPendingRentals = useMemo(() => {
    if (!pendingRentals?.body) return []
    return [...pendingRentals.body].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [pendingRentals, sortKey, sortOrder])

  const sortedLabRentals = useMemo(() => {
    if (!allLabRentals) return []
    return [...allLabRentals].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [allLabRentals, sortKey, sortOrder])

  return (
    <>
      <Header theme="light" />
      <div className={styles.container}>
        <div className={styles.manageBox}>
          <h2 className={styles.sectionTitle}>대여 요청 목록</h2>
          <div className={styles.sortControls}>
            <select
              className={styles.select}
              value={pendingSortOrder}
              onChange={(e) => setPendingSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
            <button
              className={styles.okbutton}
              onClick={handleInquiry}
            >
              조회
            </button>
          </div>
          {pendingRentalsLoading ? (
            <p>보류 중인 요청 로딩 중...</p>
          ) : sortedPendingRentals.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>대여 실습실</th>
                    <th>대표자</th>
                    <th>랩실 전체 사용자</th>
                    <th>사용 목적</th>
                    <th>대여 날짜</th>
                    <th>대여 시간</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPendingRentals.map((rental: rentalRequestType) => (
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
                              <option key={index} value={lab}>{lab}</option>
                            ))}
                        </select>
                      </td>
                      <td>{rental.rentalUser}</td>
                      <td><Tooltip text={rental.rentalUsers} maxLength={12} className={styles.user_detail} /></td>
                      <td><Tooltip text={rental.rentalPurpose} maxLength={16} className={styles.user_detail} /></td>
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
          <h2 className={styles.sectionTitle}>승인 요청 목록</h2>
          <div className={styles.sortControls}>
            <select
              className={styles.select}
              value={selectedSortOrder}
              onChange={(e) => setSelectedSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
            <button
              className={styles.okbutton}
              onClick={handleApprovedInquiry}
            >
              조회
            </button>
          </div>
          {allLabRentalsLoading ? (
            <p>승인된 대여 목록 로딩 중...</p>
          ) : sortedLabRentals.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>대여 실습실</th>
                    <th>대표자</th>
                    <th>랩실 전체 사용자</th>
                    <th>사용 목적</th>
                    <th>대여 날짜</th>
                    <th>대여 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLabRentals.map((rental: rentalRequestType) => (
                    <tr key={rental.id}>
                      <td><Tooltip text={rental.labName} maxLength={11} className={styles.user_detail} /></td>
                      <td>{rental.rentalUser}</td>
                      <td><Tooltip text={rental.rentalUsers} maxLength={12} className={styles.user_detail} /></td>
                      <td><Tooltip text={rental.rentalPurpose} maxLength={16} className={styles.user_detail} /></td>
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