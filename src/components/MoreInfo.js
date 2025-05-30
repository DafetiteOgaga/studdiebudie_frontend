import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const iconColor = "#193c4b"
const infoText = "Here is some sample information..."
function MoreInfo({ info = infoText }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	return (
		<div
		style={styles.mainContainer}>
		<FaInfoCircle
			size={16}
			color={iconColor}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => setIsClicked(prev => !prev)}
			style={styles.icon}
		/>
		{(isHovered||isClicked) && (
			<div style={styles.info}>
				{info}
			</div>
		)}
		</div>
	);
}

const styles = {
	mainContainer: {
		position: "relative",
		display: "inline-block",
	}, icon: {
		cursor: "pointer",
		border: '1px solid #aaa',
		borderRadius: '50%',
		background: '#aaa',
	},
	info: {
		position: "absolute",
		top: 20,
		left: 0,
		background: iconColor,
		border: "1px solid #777",
		padding: "8px",
		borderRadius: "4px",
		boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
		zIndex: 10,
		minWidth: 200,
	}
}
export { MoreInfo };
