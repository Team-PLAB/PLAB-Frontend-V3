import { Toastify } from '~/allFiles'
import styles from './style.module.css'

import { Slide } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorCharacter } from '~/assets'

const NotFound = () => {
  const navitgate = useNavigate()

  useEffect(() => {
    Toastify({ type: 'error', message: '404 - 이전 페이지로 이동됩니다.', position: 'top-center', transition: Slide })

    setTimeout(() => {
      navitgate(-1)
    }, 1500)
  }, [])

  return (
    <div className={styles.topContainer}>
      <div className={styles.mainContainer}>
        <img src={ErrorCharacter} alt="에러 캐릭터" className={styles.errorCharacter} />
        <h1 className={styles.errorCode}>
          4<span>0</span>4
        </h1>
        <h2>이 페이지는 없는 페이지입니다.</h2>
      </div>
    </div>
  )
}
export default NotFound