import { useEffect, useState } from 'react';
import defaultImage from '../../statics/images/sample_image.png'
import { PageHead } from '../PageHead';

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

function CreateQuestions(args) {
	const [isImageVisible, setIsImageVisible] = useState([false]);
	// const [questionArrayState, setQuestionArrayState] = useState([]);
	// const {
	// 	questions,
	// 	totalNumberOfQuestions,
	// 	isImageVisible,
	// 	toggleImage,
	// 	addQuestion,
	// 	removeQuestion,
	// 	handleQuestionChange,
	// 	totalFileUploadQuestions,
	// 	setTotalFileUploadQuestions,
	// 	setFileUploadQuestions,
	// 	newFileUploadQuestions,
	// 	questionObject,
	// 	setSchoolData,
	// 	// formData,
	// 	// setFormData,
	// 	fileQuestionsHandle,
	// 	showSubmitArray,
	// 	setShowSubmitArray,
	// 	type,
	// 	text } = args;
	const [editQuestions, setEditQuestions] = useState([questionObject]);
	// console.log({type}, {text})
	// const uploadedQuestions = text?.split?.(`Q${[Number]}`||`q${[Number]}`);
	// const uploadedQuestions = text?.split(/(?:Q|q)\d+[.:]/)  // split using Q1., Q2: etc.
	// .map(q => q.trim())       // clean up extra spaces
	// .filter(Boolean)          // remove any empty strings
	// .map((q, index) => ({
	// 	id: index,
	// 	question: q,
	// }));
	// const uploadedQuestionsLength = uploadedQuestions?.length
	// let questionArray = questions
	// useEffect(() => {
	// 	const newQuestions = Array.from({ length: (uploadedQuestions?.length - 1) }, () => ({
	// 		number: '',
	// 		question: '',
	// 		correct_answer: '',
	// 		wrong_answer1: '',
	// 		wrong_answer2: '',
	// 		wrong_answer3: '',
	// 		image: null,
	// 		previewImage: defaultImage,
	// 		imageMode: '',
	// 	}));
	// 	setQuestionArrayState(newQuestions);
	// }, [text]);
	// if (text?.length) {questionArray = questionObject}
	// if (text?.length) {questionArray = questionArrayState}
	// const numberOfQuestions = 
	// console.log('uploadedQuestions:', uploadedQuestions)
	// let info, fileQuestions
	// if (uploadedQuestions) {[info, ...fileQuestions] = uploadedQuestions}
	// if (text?.length) {questionArray = questionArrayState}
	// useEffect(() => {
	// 	// const newQuestions = Array.from({ length: (uploadedQuestions?.length - 1) }, () => fileQuestions.map((q, index) => {
	// 	const newQuestions = fileQuestions?.map((q, index) => {
	// 		// console.log({q})
	// 		const [question, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3] = q.question.split('\n').filter(Boolean);
	// 		return ({
	// 			number: q.id,
	// 			question: question.trim(),
	// 			correct_answer: correct_answer.trim(),
	// 			wrong_answer1: wrong_answer1.trim(),
	// 			wrong_answer2: wrong_answer2.trim(),
	// 			wrong_answer3: wrong_answer3.trim(),
	// 			image: null,
	// 			previewImage: defaultImage,
	// 			imageMode: '',
	// 		})
	// 	})
	// 	if (newQuestions) {
	// 		// console.log('newQuestions:', newQuestions)
	// 		setEditQuestions(newQuestions);
	// 		// setFormData(prev => ({...prev, ...newQuestions}));
	// 	}
	// }, [text]);
	// if (text?.length) {questionArray = questionArrayState}
	const handleQuestionChange = (index, e) => {
		const { name, value, files } = e.target;
		// let updatedQuestions = [...formData];
		let updatedQuestions = [...editQuestions];
		updatedQuestions[index]["number"] = index + 1; // auto-add/update question number
		if (name === "image") {
			const file = files[0];
			updatedQuestions[index].image = file; // assign image file object
			updatedQuestions[index].previewImage = URL.createObjectURL(file); // assign preview URL for the image
		} else {
			updatedQuestions[index][name] = value;
		}
		// console.log({updatedQuestions})
		// console.log('newFileUploadQuestions:', newFileUploadQuestions)
		// console.log('updatedQuestions:', updatedQuestions)
		// setFormData(newFileUploadQuestions??updatedQuestions);
		setEditQuestions(updatedQuestions);
	};
	// const fileUpload = text?.length
	// if (fileUpload) {
	// 	const total = newFileUploadQuestions?(newFileUploadQuestions.length):(uploadedQuestionsLength-1)
	// 	// console.log(newFileUploadQuestions?'newFileUploadQuestions': 'editQuestions')
	// 	// console.log({newFileUploadQuestions})
	// 	// console.log('total num passed up:', total)
	// 	// console.log(formData)
	// 	// console.log('questionArray1:', questionArray)
	// 	// console.log('newFileUploadQuestions:', newFileUploadQuestions)
	// 	// console.log('formData:', formData)
	// 	// questionArray = newFileUploadQuestions??formData
	// 	questionArray = newFileUploadQuestions??editQuestions
	// 	setTotalFileUploadQuestions(total)
	// 	setFileUploadQuestions(questionArray)
	// 	// setFileUploadQuestions(newFileUploadQuestions??editQuestions)
	// 	setSchoolData(info.question)
	// 	// console.log('questionArray2:', questionArray)
	// }
	// useEffect(() => {
	// 	fileQuestionsHandle(editQuestions)
	// }, [editQuestions])
	// console.log('info:', info)
	// console.log('fileQuestions:', fileQuestions)
	// console.log('one:', uploadedQuestions?.[1])
	// console.log('uploadedQuestions:', uploadedQuestions?.length)
	// // console.log({questionArrayState})
	// console.log({editQuestions})
	// console.log('fileQuestions?.[0]:', fileQuestions?.[0])
	// console.log({editQuestions})
	// console.log({newFileUploadQuestions})
	// console.log('info:', info)
	// console.log({type})
	// console.log('\nquestions:', questions)
	// console.log('questionArray:', questionArray)
	// console.log('formData2:', formData)
	// if (fileUpload && !showSubmitArray[1]) {
	// 	setShowSubmitArray(prev => {
	// 		const updated = [...prev];
	// 		updated[1] = true;
	// 		return updated;
	// 	});
	// }
	return (
		<>
			<PageHead {...{title: 'Contribute questions'}} />
			<div className="row">
				<div className="vertical_scroll">
					{/* {Array.isArray(questionArray) && questionArray?.map((q, index) => ( */}
					{/* {[].map((q, index) => ( */}
					<div className="c_form"
					// key={index}
					>
						<fieldset
						style={styles.createLayout}
						>
							<div className="full field">
								{/* questions */}
								<textarea
								className=""
								placeholder={`Question ${
									// index
									+ 1}`}
								value={'q.question'}
								onChange={(e)=>
									handleQuestionChange(
										// index,
										e)}
								required
								style={{background:
									// q.question?
									'#f3f3f3'
									// :null
								}}
								name="question" />

								{/* correct answers */}
								<input
								className="c_form_option_input"
								name="correct_answer" type="text"
								placeholder="Correct Answer"
								value={'q.correct_answer'}
								onChange={(e)=>
									handleQuestionChange(
										// index,
										e)}
								required/>

								{/* wrong answer1 */}
								<input
								className="c_form_option_input"
								name="wrong_answer1" type="text"
								placeholder="Wrong Answer"
								value={'q.wrong_answer1'}
								onChange={(e)=>
									handleQuestionChange(
										// index,
										e)}
								required />

								{/* wrong answer2 */}
								<input
								className="c_form_option_input"
								name="wrong_answer2" type="text"
								placeholder="Wrong Answer"
								value={'q.wrong_answer2'}
								onChange={(e)=>
									handleQuestionChange(
										// index,
										e)}
								required />

								{/* wrong answer3 */}
								<input
								className="c_form_option_input"
								name="wrong_answer3" type="text"
								placeholder="Wrong Answer"
								value={'q.wrong_answer3'}
								onChange={(e)=>
									handleQuestionChange(
										// index,
										e)}
								required />

								{/* images and switch buttons */}
								<div>
									{/* {isImageVisible[index] ? ( */}
										<>
											<div>
												{/* {console.log(questions)} */}
												{/* <img
													src={fileUpload?editQuestions[index].previewImage:questions[index].previewImage}
													alt={`Preview ${index + 1}`}
													style={styles.previewImage}
												/> */}
											</div>
											<div style={{display: 'flex', gap: 10}}>
												<input
												className="image_upload image_file"
												type="file" accept="image/*"
												name="image"
												onChange={(e)=>
													handleQuestionChange(
														// index,
														e)}
												/>
												<select
												className="c_form_input c_form_input_select2"
												value={'q.imageMode'}
												onChange={(e)=>
													handleQuestionChange(
														// index,
														e)}
												style={{background:
													// q.imageMode ? 
													'#f3f3f3'
													// :null
												}}
												name="imageMode">
													<option value="" disabled>Mode</option>
													<option value="side">Side</option>
													<option value="top">Top</option>
												</select>
												{/* <button
												className="image_upload remove_question_image"
												type="button"
												onClick={() => toggleImage(index)}
												>
													Remove Image
												</button> */}
											</div>
										</>
									{/* ) : (
										<button
										className="image_upload"
										type="button"
										onClick={() => toggleImage(index)}
										>
											Add Image
										</button>
									) */}
									{/* } */}
								</div>
								{/* <button
								style={{margin: '5px 0 50px 0'}}
								className="image_upload remove_question_image"
								type="button"
								onClick={() => removeQuestion(index)}
								>
									Remove Question {index + 1}
								</button> */}
							</div>
						</fieldset>
					</div>
					{/* ))} */}
				</div>
				{/* {totalNumberOfQuestions||totalFileUploadQuestions ? */}
				<div className="center_elements"
				// style={type==='create'?styles.createLayout:{}}
				>
					{/* <button
					className="image_upload add_question"
					type="button" onClick={addQuestion}>
						Add New Question
					</button> */}
				</div>
				{/* :
				null} */}
			</div>
		</>
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
	}
};
export { CreateQuestions };
