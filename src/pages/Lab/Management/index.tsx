import { useLab } from "~/hooks"
import type { rentalRequestType } from "~/types"
import { labOption } from "~/consts"

const Management = () => {
  const { getAllLabRentals, getPendingLabRentals, patchLabStatus } = useLab()
  const { data: allLabRentals, isLoading: allLabRentalsLoading } = getAllLabRentals
  const { data: pendingRentals, isLoading: pendingRentalsLoading } = getPendingLabRentals

  const handleSubmit = (id: number, approval: boolean) => {
    patchLabStatus.mutate(
      { id, approvalRental: approval },
      {
        onSuccess: () => {
          getPendingLabRentals.refetch()
          getAllLabRentals.refetch() 
        },
        onError: error => {
          console.log(error)
        }
      }
    )
  }

  const handleChange = (id: number, labName: string) => {
    if (!labName) return
    patchLabStatus.mutate(
      { id, labName },
      {
        onSuccess: () => {
          getPendingLabRentals.refetch()
        },
        onError: (error) => {
          console.log(error)
        },
      }
    )
  }

  const tableHeader = [
		'대여 실습실',
		'대표자',
		'랩실 전체 사용자',
		'사용 목적',
		'대여 날짜',
		'대여 시간',
	]

  return (
    <>
      <h1>실습실 대여 요청</h1>
      {pendingRentalsLoading ? (
        <p>보류 중인 요청 로딩 중...</p>
      ) : pendingRentals?.body.length > 0 ? (
        <table>
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {pendingRentals.body.map((rental: rentalRequestType) => (
              <tr key={rental.id}>
                <td>
                  <select
                    value={rental.labName}
                    onChange={e => handleChange(rental.id, e.target.value)}
                    disabled={patchLabStatus.isPending}
                  >
                    <option value={rental.labName}>{rental.labName}</option>
                    {labOption
                      .filter(lab => lab !== rental.labName)
                      .map((lab, index) => (
                        <option key={`${lab}-${index}`} value={lab}>
                          {lab}
                        </option>
                      ))}
                  </select>
                </td>
                <td>{rental.rentalUser}</td>
                <td>{rental.rentalUsers}</td>
                <td>{rental.rentalPurpose}</td>
                <td>{rental.rentalDate}</td>
                <td>{rental.rentalStartTime}</td>
                <td>
                  <button
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
      ) : (
        <p>보류 중인 요청이 없습니다.</p>
      )}

      <h1>승인된 실습실 대여 목록</h1>
      {allLabRentalsLoading ? (
        <p>승인된 대여 목록 로딩 중...</p>
      ) : allLabRentals?.length > 0 ? (
        <table>
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {allLabRentals.map((rental: rentalRequestType) => (
              <tr key={rental.id}>
                <td>{rental.labName}</td>
                <td>{rental.rentalUser}</td>
                <td>{rental.rentalUsers}</td>
                <td>{rental.rentalPurpose}</td>
                <td>{rental.rentalDate}</td>
                <td>{rental.rentalStartTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>승인된 대여 요청이 없습니다.</p>
      )}
    </>
  )
}

export default Management