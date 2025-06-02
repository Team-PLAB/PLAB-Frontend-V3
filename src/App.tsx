import * as route from './allFiles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Routes>
				<Route path={'/'} element={<route.Landing />} />
				<Route path={'/signup'} element={<route.SignUp />} />
				<Route path={'/signin'} element={<route.SignIn />} />
				<Route path={'/profile'} element={<route.Profile />} />
				<Route path={'/rental'} element={<route.Rental />} />
				<Route path={'/Status'} element={<route.Status />} />
				<Route path={'/management'} element={<route.Management />} />
			</Routes>
		</Router>
	)
}

export default App
