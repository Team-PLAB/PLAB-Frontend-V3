import styles from "./Header.module.css";

import { useState } from "react";
import { useAuth, useCheckToken } from '~/hooks'
import { getCookie } from '~/utils'
import { Link } from "react-router-dom";
import { GBSMLOGO } from '~/assets'
import { IoMenu, IoChevronForwardOutline } from "react-icons/io5";

const Header = () => {
    const token = getCookie('accessToken')
    const { signOut } = useAuth()
    const { data: userStatus, isError } = useCheckToken()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);


    if (isError || !token) {
        return (
            <>
                <div className={styles.headerWrapper}>
                    <div className={styles.topBar}>
                        <div className={styles.logoSection}>
                            <img src={GBSMLOGO} alt="로고" />
                            <div>
                                경북소프트웨어<br />마이스터고등학교
                            </div>
                        </div>
                        <button className={styles.menuButton} onClick={toggleSidebar}>
                            <IoMenu />
                        </button>
                        <div className={styles.title}>PLAB</div>
                        <Link to={'/signin'} className={styles.loginButton}>로그인</Link>
                    </div>

                    <div className={styles.navBar}>
                        <div className={styles.navMenu}>
                            <div className={styles.navItem}>메인</div>
                            <div className={styles.navItem}>실습실 대여</div>
                            <div className={styles.navItem}>실습실 현황</div>
                        </div>
                    </div>
                </div>
                {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
                <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
                    <div className={styles.sidebarlogoSection}>
                        <img src={GBSMLOGO} alt="로고" />
                        <div>
                            경북소프트웨어<br />마이스터고등학교
                        </div>
                    </div>
                    <div className={styles.sidebarItem}>메인</div>
                    <div className={styles.sidebarItem}>실습실 대여</div>
                    <div className={styles.sidebarItem}>실습실 현황</div>
                    <div className={styles.sidebarItem} onClick={closeSidebar}>닫기 <IoChevronForwardOutline /></div>
                </div>
            </>
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
        <>
            {
                isAdmin ? (
                    <>
                        <div className={styles.headerWrapper}>
                            <div className={styles.topBar}>
                                <div className={styles.logoSection}>
                                    <img src={GBSMLOGO} alt="로고" />
                                    <div>
                                        경북소프트웨어<br />마이스터고등학교
                                    </div>
                                </div>
                                <button className={styles.menuButton} onClick={toggleSidebar}>
                                    <IoMenu />
                                </button>
                                <div className={styles.title}>PLAB</div>
                                <div>
                                    <span>ADMIN</span>
                                </div>
                            </div>
                            {/* sidebar */}
                            <div className={styles.navBar}>
                                <div className={styles.navMenu}>
                                    <div className={styles.navItem}>메인</div>
                                    <div className={styles.navItem}>실습실 대여</div>
                                    <div className={styles.navItem}>승인 페이지</div>
                                </div>
                            </div>
                        </div>
                        {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
                        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
                            <div className={styles.sidebarlogoSection}>
                                <img src={GBSMLOGO} alt="로고" />
                                <div>
                                    경북소프트웨어<br />마이스터고등학교
                                </div>
                            </div>
                            <div className={styles.sidebarItem}>메인</div>
                            <div className={styles.sidebarItem}>실습실 대여</div>
                            <div className={styles.sidebarItem}>승인페이지</div>
                            <div className={styles.sidebarItem} onClick={closeSidebar}>닫기 <IoChevronForwardOutline /></div>
                            <div className={styles.sidebarlogoutItem} onClick={handleLogout}>로그아웃</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.headerWrapper}>
                            <div className={styles.topBar}>
                                <div className={styles.logoSection}>
                                    <img src={GBSMLOGO} alt="로고" />
                                    <div>
                                        경북소프트웨어<br />마이스터고등학교
                                    </div>
                                </div>
                                <button className={styles.menuButton} onClick={toggleSidebar}>
                                    <IoMenu />
                                </button>
                                <div className={styles.title}>PLAB</div>
                                <div>
                                    {userStatus?.username}
                                </div>
                            </div>
                            {/* sidebar */}
                            <div className={styles.navBar}>
                                <div className={styles.navMenu}>
                                    <div className={styles.navItem}>메인</div>
                                    <div className={styles.navItem}>실습실 대여</div>
                                    <div className={styles.navItem}>마이페이지</div>
                                </div>
                            </div>
                        </div>
                        {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
                        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
                            <div className={styles.sidebarlogoSection}>
                                <img src={GBSMLOGO} alt="로고" />
                                <div>
                                    경북소프트웨어<br />마이스터고등학교
                                </div>
                            </div>
                            <div className={styles.sidebarItem}>메인</div>
                            <div className={styles.sidebarItem}>실습실 대여</div>
                            <div className={styles.sidebarItem}>실습실 현황</div>
                            <div className={styles.sidebarItem}>마이페이지</div>
                            <div className={styles.sidebarItem} onClick={closeSidebar}>닫기 <IoChevronForwardOutline /></div>
                            <div className={styles.sidebarlogoutItem2} onClick={handleLogout}>로그아웃</div>
                        </div>
                    </>
                )}
        </>

    );
};

export default Header;