import { Toastify } from '~/allFiles'
import styles from './style.module.css'

import { Slide } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorCharacter } from '~/assets'
import { useCheckToken } from '~/hooks'


const Unauth = () => {
    const navitgate = useNavigate()
    const { data: user } = useCheckToken()
    const isAdmin = user?.role === 'admin'

    useEffect(() => {
        Toastify({ type: 'error', message: '401 - 이 페이지는 권한이 있어야합니다.', position: 'top-center', transition: Slide })

        setTimeout(() => {
            navitgate(-1)
        }, 1500)
    }, [])
    if (!isAdmin) {
        return (
            <div className={styles.topContainer}>
                <div className={styles.mainContainer}>
                    <img src={ErrorCharacter} alt="에러 캐릭터" className={styles.errorCharacter} />
                    <h1 className={styles.errorCode}>
                        4<span>0</span>1
                    </h1>
                    <h2>관리자 페이지에 비정상 접근이 확인되었습니다.</h2>
                    <h2>관리자로 로그인후 다시 이용해주세요.</h2>
                </div>
            </div>
        )
    }
}
export default Unauth