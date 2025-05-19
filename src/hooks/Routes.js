// src/Routes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../components/index';
import Scramble from '../components/scrambleQuestions/Scramble';
import ContactUs from '../components/ContactUs';
import Tests from '../components/takeTests/Tests';
import ContributeQuestions from '../components/contributeQuestions/ContributeQuestions';

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/scramble" element={<Scramble />} />
			<Route path="/tests" element={<Tests />} />
			<Route path="/contribute" element={<ContributeQuestions />} />
			<Route path="/contact" element={<ContactUs />} />
			{/* <Route path="/history" element={<History />} /> */}
		</Routes>
	);
}

export default AppRoutes;

// 57cef8
// e91327
// 3a4149
// 528780
// d4a81e //
// 70c6eb //
// 002147 //
// 095a83
// 07528d

