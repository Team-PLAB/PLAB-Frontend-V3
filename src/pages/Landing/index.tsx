import { Link } from 'react-router-dom'
import { useAuth, useCheckToken } from '~/hooks'
import { getCookie } from '~/utils'

const Landing = () => {
	const token = getCookie('accessToken')
	const { signOut } = useAuth()
	const { data: userStatus, isLoading, isError } = useCheckToken()

	if (isLoading) {
		return <h1>로딩 중...</h1>
	}

	if (isError || !token) {
		return (
			<div>
				<h1>메인</h1>
				<Link to={'/signin'}>로그인</Link> <br />
				<Link to={'/signup'}>회원가입</Link>
			</div>
		)
	}

	const isAdmin = userStatus?.role === 'admin'

	const handleLogout = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        alert('로그아웃하셨습니다.')
      },
    })
  }

	return (
		<div>
			{isAdmin ? (
				<>
					<h1>선생님 메인</h1>
					<Link to={'/profile'}>마이페이지</Link> <br />
					<Link to={'/management'}>대여 관리</Link> <br />
					<button onClick={handleLogout}>로그아웃</button>
				</>
			) : (
				<>
					<h1>학생 메인</h1>
					<Link to={'/rental'}>실습실 대여하기</Link> <br />
					<Link to={'/profile'}>마이페이지</Link> <br />
					<button onClick={handleLogout}>로그아웃</button>
				</>
			)}
		</div>
	)
}

export default Landing
