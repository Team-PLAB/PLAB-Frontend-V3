import styles from './style.module.css'

import { Link } from 'react-router-dom'
import { SuccessCheck } from '~/assets'

const Success = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.mainContainer}>
        <img src={SuccessCheck} alt="성공 이미지" className={styles.success}/>
        <h1 className={styles.successTitle}>실습실 대여가 <br /> 완료 되었습니다.</h1>
        <Link to={'/'} className={styles.successBtn}>확인</Link>
      </div>
    </div>
  )
}
export default Success