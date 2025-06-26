import Landing from './pages/Landing'
import SignUp from './pages/Auth/SignUp'
import SignIn from './pages/Auth/SignIn'
import Header from './components/Header/Header'
import Profile from './pages/Auth/Profile'
import Rental from './pages/Lab/Rental'
import Status from './pages/Status'
import Management from './pages/Lab/Management'
import NotFound from './pages/Error/NotFound'
import Unauth from './pages/Error/Unauth'
import NotLogin from './pages/Error/NotLogin'
import Success from './pages/Lab/Rental/Success'
import {
	PurposeForm,
	ScheduleForm,
	UserInfoForm,
} from './components/RentalForm'
import { RentalModal, LogoutModal } from './components/Modal'
import AuthForm from './pages/Auth/components/AuthForm'
import { Toastify } from './components/Toastify'
import Tooltip from './components/Tooltip'
import Board from './components/Board'
import Footer from './components/Footer'

export {
	Landing,
	SignUp,
	SignIn,
	Profile,
	Header,
	Rental,
	Status,
	Management,
	NotFound,
	Unauth,
	NotLogin,
	Success,
	PurposeForm,
	ScheduleForm,
	UserInfoForm,
	RentalModal,
	LogoutModal,
	AuthForm,
	Toastify,
	Tooltip,
	Board,
	Footer,
}