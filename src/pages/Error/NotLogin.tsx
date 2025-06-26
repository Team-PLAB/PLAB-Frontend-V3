import { Toastify } from '~/allFiles'

import { Slide } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotLogin = () => {
  const navitgate = useNavigate()

  useEffect(() => {
    Toastify({ type: 'error', message: '로그인후 다시 시도해주세요.', position: 'top-center', transition: Slide })

    setTimeout(() => {
      navitgate(-1)
    }, 2500)
  }, [])
  return (
    <></>
  )
}
export default NotLogin