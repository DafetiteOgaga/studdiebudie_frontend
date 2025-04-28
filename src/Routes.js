// src/Routes.js
import { Routes, Route } from 'react-router-dom';
import Home from './components/index';
import Create from './components/Create';
import ContactUs from './components/ContactUs';
// import History from './components/History';
// import ContactUs from './components/ContactUs';

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<Create />} />
			<Route path="/contact" element={<ContactUs />} />
			{/* <Route path="/history" element={<History />} /> */}
		</Routes>
	);
}

export default AppRoutes;
