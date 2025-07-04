import * as components from '~/allFiles'
import styles from './Header.module.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Slide } from 'react-toastify'
import { IoMenu, IoChevronForwardOutline } from 'react-icons/io5'
import { useAuth, useCheckToken } from '~/hooks'
import { GBSMLOGO } from '~/assets'

const Header = ({ theme = "dark" }) => {
  const { signOut } = useAuth()
  const { data: user, isError, isLoading } = useCheckToken()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false) 
  const navigate = useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)
  const isAdmin = user?.role === 'admin'

  const openLogoutModal = () => setIsLogoutModalOpen(true)
  const closeLogoutModal = () => setIsLogoutModalOpen(false)

  const handleLogoutConfirm = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        navigate('/')
        components.Toastify({type: 'info', message: '로그아웃 되었습니다.', transition: Slide})
        closeLogoutModal()
      },
    })
  }

  const wrapperClass = `${styles.headerWrapper} ${styles[theme] || ''}`

  const renderSidebar = () => (
    <>
      {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`}>
        <div className={styles.sidebarlogoSection}>
          <img src={GBSMLOGO} alt="로고" />
          <div>경북소프트웨어<br />마이스터고등학교</div>
        </div>
        <Link to="/" className={styles.sidebarItem}>메인</Link>
        {!isAdmin && <Link to="/rental" className={styles.sidebarItem}>실습실 대여</Link>}
        {isAdmin && <Link to="/management" className={styles.sidebarItem}>승인 페이지</Link>}
        {!isAdmin && <Link to="/profile" className={styles.sidebarItem}>마이페이지</Link>}
        <Link to="/Status" className={styles.sidebarItem}>실습실 현황</Link>
        <div className={styles.sidebarItem} onClick={closeSidebar}>닫기 <IoChevronForwardOutline /></div>
        <div
          className={isAdmin ? styles.sidebarlogoutItem : styles.sidebarlogoutItem2}
          onClick={openLogoutModal} 
        >
          로그아웃
        </div>
      </div>
    </>
  )

  // 비로그인
  if (isError || isLoading || !user) {
    return (
      <>
        <div className={wrapperClass}>
          <div className={styles.topBar}>
            <div className={styles.logoSection}>
              <img src={GBSMLOGO} alt="로고" />
              <div>경북소프트웨어<br />마이스터고등학교</div>
            </div>
            <div className={styles.menuButton} onClick={toggleSidebar}><IoMenu /></div>
            <div className={styles.title}>PLAB</div>
            <Link to="/signin" className={styles.loginButton}>로그인</Link>
          </div>
          <div className={styles.navBar}>
            <div className={styles.navMenu}>
              <Link to="/" className={styles.navItem}>메인</Link>
              <Link to="/rental" className={styles.navItem}>실습실 대여</Link>
              <Link to="/Status" className={styles.navItem}>실습실 현황</Link>
            </div>
          </div>
        </div>
        {renderSidebar()}
      </>
    )
  }

  // 로그인
  return (
    <>
      <div className={wrapperClass}>
        <div className={styles.topBar}>
          <div className={styles.logoSection}>
            <img src={GBSMLOGO} alt="로고" />
            <div>경북소프트웨어<br />마이스터고등학교</div>
          </div>
          <div className={styles.menuButton} onClick={toggleSidebar}><IoMenu /></div>
          <div className={styles.title}>PLAB</div>
          <div>
            <span className={styles.username}>{isAdmin ? 'ADMIN' : user?.username}</span>
            <span className={styles.logoutButton2}>|</span>
            <span className={styles.logoutButton} onClick={openLogoutModal}>로그아웃</span>
          </div>
        </div>
        <div className={styles.navBar}>
          <div className={styles.navMenu}>
            <Link to="/" className={styles.navItem}>메인</Link>
            {!isAdmin && <Link to="/rental" className={styles.navItem}>실습실 대여</Link>}
            {isAdmin && <Link to="/management" className={styles.navItem}>승인 페이지</Link>}
            <Link to="/Status" className={styles.navItem}>실습실 현황</Link>
            {!isAdmin && <Link to="/profile" className={styles.navItem}>마이페이지</Link>}
          </div>
        </div>
      </div>
      {renderSidebar()}
      <components.LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}

export default Header