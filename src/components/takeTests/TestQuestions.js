import { useEffect, useState } from 'react';
import defaultImage from '../../statics/images/sample_image.png'
import { Countdown } from '../../hooks/Countdown';

const answerOptionsArray = ['a', 'b', 'c', 'd'];
const questionObject = {
	number: '',
	question: '',
	correct_answer: '',
	wrong_answer1: '',
	wrong_answer2: '',
	wrong_answer3: '',
	image: null,
	previewImage: defaultImage,
	imageMode: '',
}

const selectedAnswerArray = {
	question: '',
	answer: '',
	correct: null,
	correctAnswer: '',
}

function TestQuestions(args) {
	const {
		setFormData,
		testQuestions,
		duration,
		submitButtonText,
	} = args;
	const [QuestionNumber, setQuestionNumber] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const selectedAnswerHandler = (question, answer) => {
		setSelectedAnswers((prevSelected) => {
			const exists = prevSelected.some(item => item.question === question);
			if (exists) {
				return prevSelected.map(item =>
					item.question === question
						? { ...item, answer: answer }
						: item
				);
			} else {
				return [
					...prevSelected,
					{
						number: QuestionNumber,
						question: question,
						answer: answer,
						correct: null,
						correctAnswer: '',
					}
				];
			}
		});
	};
	// console.log('selectedAnswers', selectedAnswers);
	useEffect(() => {
		if (selectedAnswers.length > 0) {
			setFormData(prev => ({
				...prev,
				selectedAnswers,
			}));
		}
	}, [selectedAnswers])
	const userChoice = selectedAnswers.find(item => item.question === testQuestions[QuestionNumber].question)?.answer
	const choiceLetterIndex = testQuestions[QuestionNumber].options.findIndex(option => option === userChoice);
	let futureDate
	const countdownHandler = (setduration = 1) => {
		futureDate = new Date()
		return futureDate.setHours(futureDate.getHours() + setduration);
	}
	// console.log('userChoice: ', userChoice);
	// console.log('choiceLetterIndex: ', choiceLetterIndex);
	submitButtonText('submit')
	return (
		<div>
			<div className="vertical_scroll">
				<div className="c_form">
					<div style={styles.countdown}>
						<Countdown targetDate={countdownHandler(Number(duration))} />
					</div>
					<div style={styles.rowSpaced}>
						<h5 style={{
							color: 'rgb(218, 220, 221)',
							fontSize: 16,
							paddingBottom: 0,
							}}>
							Question {QuestionNumber + 1} of {testQuestions.length}
						</h5>
						{/* <div style={styles.rowed}> */}
						<div className="prev_next_container">
							{(QuestionNumber!==0) &&
							<button
							style={{marginRight: 10}}
							className="image_upload prev_next"
							type="button"
							onClick={(e)=>setQuestionNumber(prev => prev - 1)}>
								Previous
							</button>}
							{(QuestionNumber!==testQuestions.length-1) &&
							<button
							className="image_upload prev_next"
							type="button"
							onClick={(e)=>setQuestionNumber(prev => prev + 1)}>
								Next
							</button>}
						</div>
							{/* <Countdown targetDate={countdownHandler(Number(duration))} /> */}
						{/* </div> */}
					</div>
					{testQuestions[QuestionNumber].image &&
					<div style={styles.imageContainer}>
						<img
						src={testQuestions[QuestionNumber].image}
						alt={`Preview`}
						style={styles.previewImage}/>
					</div>}
					<fieldset>
						<div className="full field">
							<h4 style={{
								color: 'rgb(218, 220, 221)',
								marginTop: 0,
								marginBottom: 10,
								}}>
								{testQuestions[QuestionNumber].question}
							</h4>
							{testQuestions[QuestionNumber].options.map((option, index) => (
								<div key={index} style={{ display: 'block' }}>
									<div className={`answer_option ${userChoice===option?'selected_option':''}`}
									onClick={()=>selectedAnswerHandler(testQuestions[QuestionNumber].question, option)}>
										<p
										style={{
											color: 'rgb(218, 220, 221)',
											fontSize: 16,
											fontWeight: 400,
											marginBottom: 8,
										}}>
											{answerOptionsArray[index]}: {option}
										</p>
									</div>
								</div>
							))}
						</div>
					</fieldset>
					<div style={{
						display: 'flex',
						justifyContent: 'flex-end',
						paddingTop: 30,
						}}>
						<p style={{color: '#d4a81e', fontSize: 16, fontWeight: 400}}>
							{userChoice ? `Selected choice: ${userChoice} (${answerOptionsArray[choiceLetterIndex].toUpperCase()})`: null}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const styles = {
	previewImage: {
		width: '100%',
		height: 'auto',
		maxWidth: 200,
		maxHeight: 200,
	},
	createLayout: {
		margin: '0 15%'
	},
	prevNextContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// paddingBottom: 10,
	},
	rowSpaced: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		paddingBottom: 10,
	},
	rowed: {
		display: 'flex',
		// justifyContent: 'space-between',
		// alignItemss: 'baseline',
		// paddingBottom: 10,
	},
	imageContainer: {
		paddingBottom: 15,
	},
	countdown: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingBottom: 30,
		marginRight: -100,
	},
};
export { TestQuestions };
