

function QuestionInfo () {
	const typeArray = ['type', 'primary/basic', 'secondary'];
	const primaryArray = ['class', 'basic 1', 'basic 2', 'basic 3', 'basic 4', 'basic 5'];
	const secondaryArray = ['class', 'jss 1', 'jss 2', 'jss 3', 'sss 1', 'sss 2', 'sss 3'];
	const primarySubjectArray = ['subject', 'math', 'english', 'science', 'social studies'];
	const secondarySubjectArray = ['subject', 'math', 'english', 'physics', 'chemistry', 'biology'];
	return {
		typeArray,
		primaryArray,
		secondaryArray,
		primarySubjectArray,
		secondarySubjectArray
	}
	// return { infoArrays }
}
export { QuestionInfo }
