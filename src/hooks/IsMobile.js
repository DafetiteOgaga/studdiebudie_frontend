import { useState, useEffect } from "react";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 767px)").matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)");
		const handleResize = () => setIsMobile(mediaQuery.matches);

		mediaQuery.addEventListener("change", handleResize);
		return () => mediaQuery.removeEventListener("change", handleResize);
	}, []);

	console.log('isMobile:', isMobile);
	return isMobile;
};
export { useIsMobile };
