

function ConvertCase(str) {
	if (!str) return str
	if (str.includes('-')) {
		const strArray = str.split('-')
		return strArray.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('-')
	}
	if (str.includes('_')) {
		const strArray = str.split('_')
		return strArray.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('_')
	}
	if (str.includes(' ')) {
		const strArray = str.split(' ')
		return strArray.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
	}
	if (str.includes('/')) {
		const strArray = str.split('/')
		return strArray.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('/')
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}
export { ConvertCase }
