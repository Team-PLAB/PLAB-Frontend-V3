import styles from './style.module.css'

import { Board, Header } from '~/allFiles'

const Status = () => {
	return (
		<>
			<Header theme="light" />
			<div className={styles.topContainar}>

				<div className={styles.StatusBox}>
					<div className={styles.title}>실습실 현황판</div>
					<Board />
				</div>

			</div>
		</>
	)
}

export default Status;