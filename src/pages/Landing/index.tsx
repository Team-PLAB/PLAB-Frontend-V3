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
						<div className={styles.subtitle}>경북소프트웨어마이스터고등학교</div>
						<div className={styles.title}>실습실 대여하기</div>
						<Link to="/rental" className={styles.heroButton}>실습실 대여하기</Link>
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
								<div className={styles.noticeText}>실습실 사용 후 정리는 매너이자 필수!</div>
								<div className={styles.explanation}>
									전원, 냉난방, 조명, 책상 의자 배치 등 정리 / 지켜지지 않을 시{" "}
									<span className={styles.warning}>2주간 실습실 이용 제한</span>
								</div>
							</div>
							<div className={styles.noticeRuleContainar}>
								<div className={styles.noticeText}>개인 공부 X, 멘티-멘토 X</div>
								<div className={styles.explanation}>
									대회 준비를 위한 랩실 대여는 마감 5일 전부터 가능
									<span className={styles.warning}>(목적에 대회명 기재)</span>
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