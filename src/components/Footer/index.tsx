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
                            <div>팀원</div> <div>|</div>  <div>성홍제</div> <div>최성욱</div> <div>변예현</div> <div>김승환</div> <div>김은찬</div>
                        </div>
                    </div>
                </div>

                <div className={styles.explain}>
                    <div>기존의 실습실 대여 시스템을 편하게 이용할 수 있도록 하는것을 목표로 두고 있습니다.</div>
                    <div>또한 단순히 개발에서 끝나는 것이 아닌 편리하게 사용할 수 있도록 조금씩 개선해 나가며 관리하고 있습니다.</div>
                </div>

                <div className={styles.contact}>
                    <div>전화번호: 054-832-2903</div> <div>|</div> <div>주소: 경상북도 의성군 봉양면 봉호로 14</div>
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