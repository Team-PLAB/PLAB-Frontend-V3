import styles from './style.module.css'

import { Link } from 'react-router-dom'
import { Header } from '~/allFiles'
import { Background, Edit } from '~/assets'

const Landing = () => {
	return (
		<>
			<Header />
			<div className={styles.topContainar}>
				<div className={styles.backgroundHero} style={{ backgroundImage: `url(${Background})` }}>
					<div className={styles.overlay} />
					<div className={styles.heroContent}>
						<div className={styles.subtitle}>경북소프트웨어고등학교</div>
						<div className={styles.title}>실습실 대여하기</div>
						<Link to="/student/rental" className={styles.heroButton}>실습실 대여하기</Link>
					</div>
				</div>

				<div className={styles.noticeContainar}>
					<div className={styles.noticeSubContainar}>
						<div className={styles.noticeImageContainar}>
							<img className={styles.noticeIcon} src={Edit} alt="로고" />
						</div>
						<div>
							<div className={styles.importantText}>매일 점심 시간 (13시 40분) 신청 마감</div>
							<div className={styles.noticeRuleContainar}>
								<div className={styles.noticeText}>야자 시간 전 미리 문 열어놓기!</div>
								<div className={styles.explanation}>
									미리 안 열어놓고 야자시간에 열쇠 달라고 해도 안 열어줌,
									손으로 따다 적발 시 <span className={styles.warning}>벌점 20점</span>
								</div>
							</div>
							<div className={styles.noticeRuleContainar}>
								<div className={styles.noticeText}>실습실 사용 후 정리는 매너이자 필수!</div>
								<div className={styles.explanation}>
									전원, 냉난방, 조명, 책상 의자 배치 등 정리 / 지켜지지 않을 시{" "}
									<span className={styles.warning}>2주간 실습실 이용 제한</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing