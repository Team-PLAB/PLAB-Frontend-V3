import { Toastify } from '~/allFiles'
import styles from './style.module.css'

import { Slide } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorCharacter } from '~/assets'

const NotLogin = () => {
  const navitgate = useNavigate()

  useEffect(() => {
    Toastify({ type: 'error', message: '로그인 후 다시 시도해주세요.', position: 'top-center', transition: Slide })

    setTimeout(() => {
      navitgate(-1)
    }, 1500)
  }, [])
  return (
    <>
        <div className={styles.topContainer}>
      <div className={styles.mainContainer}>
        <img src={ErrorCharacter} alt="에러 캐릭터" className={styles.errorCharacter} />
        <h1 className={styles.errorCode}>
          4<span>0</span>1
        </h1>
        <h2>로그인 후 이용해주세요.</h2>
      </div>
    </div>
    </>
  )
}
export default NotLogin