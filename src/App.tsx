import * as route from './allFiles'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	useEffect(() => {
		console.log(
			'%c ⚠️ 교내 실습실 대여 시스템에 무단으로 접근하거나 해킹 시도로 인한 문제는 모두 본인에게 있습니다.',
			`font-size:40px; font-weight:900; color:white; background-color:red`
		);

		const interval = setInterval(() => {
			console.clear();
			console.log(
				'%c ⚠️ 교내 실습실 대여 시스템에 무단으로 접근하거나 해킹 시도로 인한 문제는 모두 본인에게 있습니다.',
				`font-size:40px; font-weight:900; color:white; background-color:red`
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<route.Landing />} />
				<Route path='/signup' element={<route.SignUp />} />
				<Route path='/signin' element={<route.SignIn />} />
				<Route path='/profile' element={<route.Profile />} />
				<Route path='/rental' element={<route.Rental />} />
				<Route path='/Status' element={<route.Status />} />
				<Route path='/management' element={<route.Management />} />
				<Route path='/rental/success' element={<route.Success />} />
				<Route path='*' element={<route.NotFound />} />
			</Routes>
		</Router>
	)
}

export default App