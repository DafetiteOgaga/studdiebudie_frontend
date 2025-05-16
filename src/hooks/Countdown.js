// Countdown.js
import React, { useEffect, useState } from 'react';

const Countdown = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const difference = new Date(targetDate) - new Date();
		
		if (difference <= 0) return null;

		const timeLeft = {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / (1000 * 60)) % 60),
		seconds: Math.floor((difference / 1000) % 60),
		};

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			const updated = calculateTimeLeft();
			setTimeLeft(updated);

			if (!updated) clearInterval(timer); // Stop when countdown ends
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	if (!timeLeft) {
		return <p style={{...styles.p, color: 'red',}}>⏰ Time up!</p>;
	}

	return (
		<>
			<p style={{...styles.p, color: '#49be39',}}>
				{/* {timeLeft.days}d */}
				⌚{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
			</p>
		</>
	);
};

const styles = {
	p: {
		fontSize: 19,
		fontWeight: 400,
		padding: '0 5px',
		margin: 0,
		border: '1px solid #949ea3',
		borderRadius: 5,
	}
}
export { Countdown };
