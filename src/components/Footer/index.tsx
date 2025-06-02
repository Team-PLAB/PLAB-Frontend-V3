import styles from "./style.module.css"

import { PLAB_SYMBOL_TRANSPARENT } from '~/assets'
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.topRow}>
                    <div className={styles.logo}>
                        <img className={styles.symbol} src={PLAB_SYMBOL_TRANSPARENT} alt="로고" /> Plab
                        <div className={styles.team}>
                            <span>팀원</span> <span>|</span>  <span>성홍제</span> <span>최성욱</span> <span>변예현</span> <span>김승환</span> <span>김은찬</span>
                        </div>
                    </div>
                </div>

                <div className={styles.explain}>
                    <div>기존의 실습실 대여 시스템을 편하게 이용할 수 있도록 하는것을 목표로 두고 있습니다.</div>
                    <div>또한 단순히 개발에서 끝나는 것이 아닌 편리하게 사용할 수 있도록 조금씩 개선해 나가며 관리하고 있습니다.</div>
                </div>

                <div className={styles.contact}>
                    <span>전화번호: 054-832-2903</span> <span>|</span> <span>주소: 경상북도 의성군 봉양면 봉호로 14</span>
                </div>

                <div className={styles.bottomRow}>
                    <span className={styles.Copyright}>© 2025 PLAB Lending the lab room</span>
                    <div className={styles.icons}>
                        <FaGithub />
                        <MdEmail />
                        <FaYoutube />
                        <FaInstagram />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;