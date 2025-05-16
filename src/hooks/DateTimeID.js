

function DateTimeID () {
	const randomStr = Math.random().toString(36).substring(2, 6); // 4 random chars
	const now = new Date();
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const date = now.getDate().toString().padStart(2, '0');
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	const variantId = `${year}${month}${date}_${hours}${minutes}${seconds}_${randomStr}`;
	return variantId
}
export { DateTimeID }
