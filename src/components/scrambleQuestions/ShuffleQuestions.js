import { useEffect, useState } from 'react';
import defaultImage from '../../statics/images/sample_image.png'
import { useIsMobile } from '../../hooks/IsMobile';
import { ConvertCase } from '../../hooks/ConvertCase';
import { MoreInfo } from "../MoreInfo";
import { serverOrigin } from "../../hooks/fetch/FetchFromServer";

// const questionObject = {
// 	number: '',
// 	question: '',
// 	correct_answer: '',
// 	wrong_answer1: '',
// 	wrong_answer2: '',
// 	wrong_answer3: '',
// 	image: null,
// 	previewImage: defaultImage,
// 	imageMode: '',
// }

const imageScapeOption = ['mode', 'side', 'top']

function ShuffleQuestions(args) {
	// const [questionArrayState, setQuestionArrayState] = useState([]);
	const {
		questions,
		totalNumberOfQuestions,
		isImageVisible,
		toggleImage,
		addQuestion,
		removeQuestion,
		handleQuestionChange,
		totalFileUploadQuestions,
		setTotalFileUploadQuestions,
		setFileUploadQuestions,
		newFileUploadQuestions,
		questionObject,
		setSchoolData,
		// formData,
		// setFormData,
		fileQuestionsHandle,
		showSubmitArray,
		setShowSubmitArray,
		type,
		text,
		processedText,
		downloadLink,
		fileMargin,
	} = args;
	const isMobile = useIsMobile();
	const [editFileQuestions, setEditFileQuestions] = useState([questionObject]);
	// console.log({type}, {text})
	// const uploadedQuestions = text?.split?.(`Q${[Number]}`||`q${[Number]}`);
	// const uploadedQuestions = text?.split(/(?:Q|q)\d+[.:]/)  // split using Q1., Q2: etc.
	// .map(q => q.trim())       // clean up extra spaces
	// .filter(Boolean)          // remove any empty strings
	// .map((q, index) => ({
	// 	id: index,
	// 	question: q,
	// }));
	const uploadedQuestionsLength = processedText?.length
	// const uploadedQuestionsLength = uploadedQuestions?.length
	let questionArray = questions
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
	let info, fileQuestions
	if (processedText) {[info, ...fileQuestions] = processedText}
	// if (uploadedQuestions) {[info, ...fileQuestions] = uploadedQuestions}
	// if (text?.length) {questionArray = questionArrayState}
	useEffect(() => {
		// const newQuestions = Array.from({ length: (uploadedQuestions?.length - 1) }, () => fileQuestions.map((q, index) => {
		const newQuestions = fileQuestions?.map((q, index) => {
			// console.log({q})
			const [question, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3] = q.question.split('\n').filter(Boolean);
			return ({
				number: q.id,
				question: question.trim(),
				correct_answer: correct_answer.trim(),
				wrong_answer1: wrong_answer1.trim(),
				wrong_answer2: wrong_answer2.trim(),
				wrong_answer3: wrong_answer3.trim(),
				image: null,
				previewImage: defaultImage,
				imageMode: '',
			})
		})
		if (newQuestions) {
			// console.log('newQuestions:', newQuestions)
			setEditFileQuestions(newQuestions);
			// setFormData(prev => ({...prev, ...newQuestions}));
		}
	}, [text]);
	// if (text?.length) {questionArray = questionArrayState}
	const handleFileQuestionChange = (index, e) => {
		const { name, value, files } = e.target;
		// let updatedQuestions = [...formData];
		let updatedQuestions = [...editFileQuestions];
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
		setEditFileQuestions(newFileUploadQuestions??updatedQuestions);
	};
	const fileUpload = text?.length
	if (fileUpload) {
		const total = newFileUploadQuestions?(newFileUploadQuestions.length):(uploadedQuestionsLength-1)
		// const total = newFileUploadQuestions?(newFileUploadQuestions.length):(uploadedQuestionsLength-1)
		// console.log(newFileUploadQuestions?'newFileUploadQuestions': 'editFileQuestions')
		// console.log({newFileUploadQuestions})
		// console.log('total num passed up:', total)
		// console.log(formData)
		// console.log('questionArray1:', questionArray)
		// console.log('newFileUploadQuestions:', newFileUploadQuestions)
		// console.log('formData:', formData)
		// questionArray = newFileUploadQuestions??formData
		questionArray = newFileUploadQuestions??editFileQuestions
		setTotalFileUploadQuestions(total)
		setFileUploadQuestions(questionArray)
		// setFileUploadQuestions(newFileUploadQuestions??editFileQuestions)
		setSchoolData(info.question)
		// console.log('questionArray2:', questionArray)
	}
	useEffect(() => {
		fileQuestionsHandle(editFileQuestions)
	}, [editFileQuestions])
	// console.log('info:', info)
	// console.log('fileQuestions:', fileQuestions)
	// console.log('one:', uploadedQuestions?.[1])
	// console.log('uploadedQuestions:', uploadedQuestions?.length)
	// // console.log({questionArrayState})
	// console.log({editFileQuestions})
	// console.log('fileQuestions?.[0]:', fileQuestions?.[0])
	// console.log({editFileQuestions})
	// console.log({newFileUploadQuestions})
	// console.log('info:', info)
	// console.log({type})
	// console.log('\nquestions:', questions)
	// console.log('questionArray:', questionArray)
	// console.log('formData2:', formData)
	if (fileUpload && !showSubmitArray[1]) {
		setShowSubmitArray(prev => {
			const updated = [...prev];
			updated[1] = true;
			return updated;
		});
	}
	console.log({fileMargin})
	return (
		<div
		style={isMobile?styles.verticalContainerMobile:fileUpload?styles.verticalContainerPCwFile:styles.verticalContainerPCwoFile}
		className="mobileQuestionRow">
			<div className="vertical_scroll">
				{Array.isArray(questionArray) && questionArray?.map((q, index) => (
				<div
				// style={(!isMobile&&!fileUpload)?styles.questionsCompPCwoFile:(!isMobile&&fileUpload)?styles.questionsCompPCwFile:{margin: fileMargin?.margin||{...styles.questionsCompMobileIndexX}}}
				className="c_form" key={index}>
					<fieldset style={type==='create'?styles.createLayout:{}}>
						<div className="full field">
							{/* questions */}
							<textarea
							className=""
							placeholder={`Question ${index + 1}`}
							value={q.question}
							onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
							required
							style={{background: !q.question?'#f3f3f3':null}}
							name="question" />

							{/* correct answers */}
							<input
							className="c_form_option_input"
							name="correct_answer" type="text"
							placeholder="Correct Answer"
							value={q.correct_answer}
							onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
							required/>

							{/* wrong answer1 */}
							<input
							className="c_form_option_input"
							name="wrong_answer1" type="text"
							placeholder="Wrong Answer"
							value={q.wrong_answer1}
							onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
							required />

							{/* wrong answer2 */}
							<input
							className="c_form_option_input"
							name="wrong_answer2" type="text"
							placeholder="Wrong Answer"
							value={q.wrong_answer2}
							onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
							required />

							{/* wrong answer3 */}
							<input
							className="c_form_option_input"
							name="wrong_answer3" type="text"
							placeholder="Wrong Answer"
							value={q.wrong_answer3}
							onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
							required />

							{/* images and switch buttons */}
							<div>
								{isImageVisible[index] ? (
									<>
										<div>
											<img
												src={fileUpload?editFileQuestions[index].previewImage:questions[index].previewImage}
												alt={`Preview ${index + 1}`}
												style={{...styles.previewImage, ...(!isMobile?styles.previewImagePC:{})}}
											/>
										</div>
										<div style={!isMobile?styles.imageUploadContainerPC:styles.imageUploadContainerMobile}>
											<input
											className="image_upload image_file"
											type="file" accept="image/*"
											name="image"
											onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
											/>
											<div style={{display: 'flex', gap: 3, marginTop: isMobile?5:undefined}}>
												<select
												className="c_form_input c_form_input_select2"
												value={q.imageMode}
												onChange={(e)=>fileUpload?handleFileQuestionChange(index, e):handleQuestionChange(index, e)}
												style={{
													background: q.imageMode ? '#f3f3f3':null,
													margin: isMobile?0:undefined
												}}
												name="imageMode">
													{imageScapeOption.map((option, i) => (
															<option key={i} disabled={!i} value={!i?'':option}>
																{ConvertCase(option)}
															</option>
														))}
													{/* <option value="" disabled>Mode</option>
													<option value="side">Side</option>
													<option value="top">Top</option> */}
												</select>
												<button
												className="image_upload remove_question_image"
												type="button"
												onClick={() => toggleImage(index)}
												>
													Remove Image
												</button>
											</div>
										</div>
									</>
								) : (
									<button
									className="image_upload"
									type="button"
									onClick={() => toggleImage(index)}
									>
										Add Image
									</button>
								)}
							</div>
							<button
							style={{margin: '5px 0 50px 0'}}
							className="image_upload remove_question_image"
							type="button"
							onClick={() => removeQuestion(index)}
							>
								Remove Question {index + 1}
							</button>
						</div>
					</fieldset>
				</div>
				))}
			</div>
			{(totalNumberOfQuestions||totalFileUploadQuestions) ?
			<div className="center_elements"
			style={!isMobile?(fileUpload?undefined:styles.addQuestionBtnPC):styles.addQuestionBtnMobile}>
				<button
				className="image_upload add_question"
				type="button" onClick={addQuestion}>
					Add New Question
				</button>
			</div>:null}
			{downloadLink &&
				<div className="center_downloadBtn"
				style={!isMobile?(fileUpload?undefined:styles.addQuestionBtnPC):styles.addQuestionBtnMobile}>
					<div className="downloadBtnBorder"
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 3,
					}}>
						<MoreInfo info="Download information ..." />
						<a
						href={`${serverOrigin}${downloadLink}`}
						download
						className="image_upload downloadBtn"
						role="button"
						>
							Download File
						</a>
					</div>
				</div>}
		</div>
	)
}

const styles = {
	previewImage: {
		width: '100%',
		height: 'auto',
		padding: 5,
		borderRadius: 10,
	},
	previewImagePC: {
		maxWidth: 300,
		maxHeight: 300,
	},
	createLayout: {
		margin: '0 5%'
	},
	addQuestionBtnPC: {
		margin: '0 5%',
	},
	addQuestionBtnMobile: {
		display: 'flex',
		justifyContent: 'center'
	},
	questionsCompPCwoFile: {
		margin: '5% 10% 0 10%',
	},
	questionsCompPCwFile: {
		margin: '5% -10% 0 -10%',
	},
	questionsCompMobileIndex0: {
		marginTop: '10%'
	},
	questionsCompMobileIndexX: {
		marginTop: 0,
	},
	verticalContainerPCwFile: {
		margin: '5% -10% 0 -10%'
	},
	verticalContainerPCwoFile: {
		margin: '5% 10% 0 10%'
	},
	verticalContainerMobile: {
		marginTop: 40,
	},
	imageUploadContainerPC: {
		display: 'flex',
		gap: 3,
	},
	imageUploadContainerMobile: {
		display: 'flex',
		flexDirection: 'column',
		// gap: 3,
	},
};
export { ShuffleQuestions };
