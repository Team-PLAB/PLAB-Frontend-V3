import {
	Flip,
	toast,
	type ToastOptions,
	type ToastPosition,
  type ToastTransition,
} from 'react-toastify'
import { Success, Error, Info } from '~/assets'

interface ToastProps {
	type: 'success' | 'error' | 'info'
	message: string
	position?: ToastPosition
  transition?: ToastTransition
}

const defaultToastOptions: ToastOptions = {
	position: 'top-right',
	autoClose: 1500,
	pauseOnHover: false,
	pauseOnFocusLoss: false,
	closeOnClick: false,
	closeButton: false,
	transition: Flip,
}

export const Toastify = ({ message, type, position, transition }: ToastProps) => {
	const toastConfig = {
		...defaultToastOptions,
		position: position || defaultToastOptions.position,
		transition: transition || defaultToastOptions.transition,
	}

	const renderMessage = () => (
		<pre
			style={{
				margin: 0,
				fontFamily: 'inherit',
				whiteSpace: 'pre-wrap',
			}}
		>
			{message}
		</pre>
	)

	switch (type) {
		case 'success':
			toast.success(renderMessage(), {
				...toastConfig,
				icon: <img src={Success} alt="success" width={25} height={25} />,
			})
			return
		case 'error':
			toast.error(renderMessage(), {
				...toastConfig,
				icon: <img src={Error} alt="error" width={22} height={22} />,
			})
			return
		case 'info':
			toast.info(renderMessage(), {
				...toastConfig,
				icon: <img src={Info} alt="info" width={25} height={25} />,
			})
			return
		default:
			toast(renderMessage(), toastConfig)
	}
}
