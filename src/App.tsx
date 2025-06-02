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
				<Route path={'/rental/success'} element={<route.Success />} />
				<Route path={'*'} element={<route.NotFound />}/>
			</Routes>
		</Router>
	)
}

export default App
