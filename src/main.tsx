import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import '~/components/Toastify/style.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<CookiesProvider>
			<App />
			<ToastContainer />
		</CookiesProvider>
	</QueryClientProvider>
)
