import React, { useState, useEffect, useMemo,
	// useRef
} from "react";
import defaultImage from '../../statics/images/sample_image.png'
import { useHandleFileUpload } from "../../hooks/FileReaderHandler";
import { MoreInfo } from "../MoreInfo";
import { ConvertCase, ConvertToSentenceCase } from "../../hooks/ConvertCase";
import { PageHead } from "../PageHead";
import { QuestionInfo } from "../data/QuestionInfo";

const serverOrigin = 'http://localhost:4000'

const formValues = {
	subject: "",
	typeCategory: "",
	classCategory: "",
	totalQs: "",
}
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

export default function ContributeQuestions() {
	const { typeArray, primaryArray, secondaryArray, primarySubjectArray, secondarySubjectArray } = QuestionInfo();
	const [showSubmitArray, setShowSubmitArray] = useState([false, false]);
	const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0)
	const [questions, setQuestions] = useState([]);
	// const [fileUploadQuestions, setFileUploadQuestions] = useState([questionObject]);
	const [formData, setFormData] = useState({});
	const [isImageVisible, setIsImageVisible] = useState([Array(totalNumberOfQuestions).fill(false)]);
	const [isFile, setIsFile] = useState(false)
	const { text, processedText, handleFileChange } = useHandleFileUpload();
	const toggleFile = () => {
		setIsFile((prev) => {
			console.log('prev:', prev)
			if (prev===true) {
				// setFormData(formValues)
				// infoItems = null
			}
			// setFormData(formValues)
			return !prev
		})
	}
	const handleQuestionChange = (index, e) => {
		console.log({index})
		const { name, value, files } = e.target;
		console.log(
			'\nquestions ########## (1):', questions,
			'\nindex:', index,
			'\nname:', name,
			'\nvalue:', value,
		)
		let updatedQuestions = [...questions];
		console.log('updatedQuestions ########## (1):', updatedQuestions)
		// console.log('updatedQuestions:', updatedQuestions)
		// if (totalFileUploadQuestions) updatedQuestions = [...fileUploadQuestions]
		updatedQuestions[index]["number"] = index + 1; // auto-add/update question number
		console.log('updatedQuestions (number) ########## (1):', updatedQuestions)
		if (name === "image") {
			const file = files[0];
			updatedQuestions[index].image = file; // assign image file object
			updatedQuestions[index].previewImage = URL.createObjectURL(file); // assign preview URL for the image
		} else {
			updatedQuestions[index][name] = value;
		}
		console.log('updatedQuestions (value) ########## (1):', updatedQuestions)
		// console.log('questions ########## (1):', questions)
		setQuestions(updatedQuestions);
		setFormData((prev) => ({...prev, questions: [...updatedQuestions]}))
		setShowSubmitArray(prev => {
			const updated = [...prev];
			updated[1] = true;
			return updated;
		});
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'totalQs') {
			setTotalNumberOfQuestions(Number(value))
			setFormData({})
			if (!value) {
				setShowSubmitArray(prev => {
					const updated = [...prev];
					updated[0] = false;
					return updated;
				});
			} else if (value) {
				setShowSubmitArray(prev => {
					const updated = [...prev];
					updated[0] = true;
					return updated;
				});
			}
		}
		if (name === 'totalQs') {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				info: {
					...prev.info,
					[name]: value
				},
			}));
		}
	};

	const addQuestion = () => {
		console.log('addQuestion')
		// console.log('fileUploadQuestions:', fileUploadQuestions)
		const newQuestionObject = [questionObject]
		console.log('questions ########## (2):', questions)
		setQuestions((prev)=>[...prev, newQuestionObject[0]])
		setFormData((prev) => ({
			...prev,
			totalQs: Number(prev.totalQs)+1
		}));
	};

	

	const removeQuestion = (index) => {
		console.log('removeQuestion:', index)
		const updatedQuestions = [...questions];
		// console.log({fileUploadQuestions}, {updatedQuestions})
		// if (totalFileUploadQuestions) {updatedQuestions = [...fileUploadQuestions]}
		updatedQuestions.splice(index, 1);
		console.log('questions ########## (3):', questions)
		setQuestions(updatedQuestions)
		setFormData((prev) => ({
			...prev,
			totalQs: Number(prev.totalQs)-1,
			questions: updatedQuestions,
		}));
	};

	const toggleImage = (index) => {
		// console.log('image toggled to:', !isImageVisible)
		console.log('index:', index)
		setIsImageVisible((prev) => prev.map((visible, i) => (i === index ? !visible : visible))
		);
	};

	useEffect(() => {
		console.log('questions:', questions)
		const newQuestions = Array.from({ length: totalNumberOfQuestions }, () => (
			{
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
		));
		console.log(
			'\nnewQuestions:', newQuestions,
			'\nnewQuestions[index]:', newQuestions[0],
			'\nnewQuestions.length:', newQuestions.length,
		)
		console.log('questions ########## (4):', questions)
		setQuestions(newQuestions);
	}, [totalNumberOfQuestions]);

	useEffect(() => {
		setIsImageVisible(Array(totalNumberOfQuestions).fill(false));
	}, [totalNumberOfQuestions]);

	// let cleanedData;
	const submitHandler = (e) => {
		e.preventDefault(); // prevent default page refresh
		// const cleanedData = {...formData}
		// const questions = []
		// console.log('formData:', formData)
		// console.log('cleanedData1:', cleanedData)
		// Object.entries(formData).forEach(([key, value]) => {
		// 	// console.log('\n', {key}, {value}, typeof(value))
		// 	if (!isNaN(Number(key))) {
		// 		// console.log('key:', Number(key))
		// 		questions.push({
		// 			...value,
		// 			index: Number(key)+1,
		// 		})
		// 		delete cleanedData[key]
		// 	}
		// 	if (typeof(value) === 'object'&&!value.question) {
		// 		delete cleanedData[key]
		// 	}
		// });
		// cleanedData.postQuestions = questions
		// fetch(`${serverOrigin}/randomize/`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(cleanedData),
		// })
		// .then((response) => {
		// 	if (!response.ok) {
		// 		throw new Error('Network response was not ok');
		// 	}
		// 	return response.json();
		// })
		// .then((data) => {
		// 	console.log('Success:', data);
		// 	// setDownloadLink(data?.downloadLink)
		// 	// Handle success response
		// })
		// .catch((error) => {
		// 	console.error('Error:', error);
		// 	// Handle error response
		// });
		console.log('Form submitted with data:', formData);
		alert('Submitted!');
	};
	const fileQuestionsHandle = (fileQuestions) => {
		setFormData((prev) => ({...prev, ...fileQuestions}))
	}
	const showSubmit = showSubmitArray.every((item => item))
	const uploadedQuestions = text?.split(/(?:Q|q)\d+[.:]/)
	let fileInfo, finalQuestions = questions
	const filePresent = isFile && processedText?.length > 0
	// let testQ
	if (filePresent) {
		let [info, ...questions] = processedText
		fileInfo = info.question
		.split('\n')
		.filter(Boolean)
		.map(item => {
			const [key, value] = item.split(':');
			return { [key?.trim().toLowerCase()]: value?.trim() };
		})
		.reduce((accumulator, currentItem) => {
			const key = Object.keys(currentItem)[0];
			const value = currentItem[key];
			accumulator[key] = value;
			return accumulator;
		}, {});
		// console.log('questions:', questions)
		// testQ = questions?.map(questionItem => {
		// 	// console.log('questionItem:', questionItem)
		// 	const [question, ...options] = questionItem.question.split('\n').filter(Boolean)
		// 	return {question, options}
		// })
		// questions = questions.split('\n')
		finalQuestions = questions?.map(questionItem => {
			// console.log('questionItem:', questionItem)
			const [question, ...options] = questionItem.question.split('\n').filter(Boolean)
			return {question, options}
		})
	}
	useEffect(() => {
		if (filePresent&&fileInfo) {
			const { subject, class:classCategory, type:typeCategory } = fileInfo
			setFormData((prev) => ({
				...prev,
				info: {
					...prev.info,
					subject: subject,
					classCategory: classCategory,
					typeCategory: typeCategory,
				},
				questions: finalQuestions,
			}));
		}
	}, [filePresent])
	console.log(
		'\nquestions:', questions,
		'\nquestions[index]:', questions[0],
		'\ntotalNumberOfQuestions:', totalNumberOfQuestions,
		'\nisimageVisible:', isImageVisible,
		'\nformData:', formData,
		'\ntypeCategory:', formData?.typeCategory,
		// '\ntext (from file):', text,
		// '\nprocessedText:', processedText,
		'\nfileInfo:', fileInfo,
		'\nfinalQuestions:', finalQuestions,
		'\ntypeArray:', typeArray,
		// '\ntestQ:', testQ,
	)
	const contributeArgs = {
		finalQuestions,
		addQuestion,
		removeQuestion,
		handleQuestionChange,
		toggleImage,
		isImageVisible,
		totalNumberOfQuestions,
		formData,
	}
	const classArray = (formData?.info?.typeCategory === 'primary/basic') ? primaryArray : (formData?.info?.typeCategory === 'secondary') ? secondaryArray : null;
	const subjectArray = (formData?.info?.typeCategory === 'primary/basic') ? primarySubjectArray : (formData?.info?.typeCategory === 'secondary') ? secondarySubjectArray : null;
	return (
		<>
			<PageHead {...{title: 'Contribute questions'}} />
			{/* <!-- body --> */}
			<div className="section contact_section contribute_bg">
				<form onSubmit={submitHandler} style={{
					margin: '0 5%',
				}}>
				<div className="col-sm-12"
				// style={{padding: '3% 0 0.5% 0'}}
				>
						<div className="c_form">
							<fieldset
							style={{paddingBottom: '5%'}}
							>
								<div className="full field">
									<div style={styles.totalQs}>
										{/* totalQs */}
										<input
										className="c_form_input" placeholder="No. of Questions"
										value={formData.totalQs||''} onChange={handleChange}
										required={!!!isFile}
										disabled={!!isFile}
										type="tel" name="totalQs" />
									</div>
									<div style={styles.rowForm}>
										{/* typeCategory */}
										<select
										// style={{width: '60%', background: formData.term ? '#f3f3f3':null}}
										className="c_form_input"
										value={formData?.info?.typeCategory||''}
										onChange={handleChange}
										name="typeCategory"
										required>
											{typeArray?.map((type, index) => (
												<option key={index} value={type==='type'?'':type} disabled={type==='type'?true:false}>
													{ConvertCase(type||'')}
												</option>
											))}
										</select>
										
										{/* classCategory */}
										<select
										// style={{width: '60%', background: formData.term ? '#f3f3f3':null}}
										className="c_form_input"
										value={formData?.info?.classCategory||'Class'}
										onChange={handleChange}
										disabled={!classArray}
										name="classCategory"
										required>
											{classArray?.map((classType, index) => (
												<option key={index} value={classType==='class'?'':classType}>
													{ConvertCase(classType||'')}
												</option>
											))||(<option>Class</option>)}
										</select>

										{/* subject */}
										<select
										// style={{width: '60%', background: formData.term ? '#f3f3f3':null}}
										className="c_form_input"
										value={formData?.info?.subject||'Subject'}
										onChange={handleChange}
										disabled={!subjectArray}
										name="subject"
										required>
											{subjectArray?.map((subjectType, index) => (
												<option key={index} value={(subjectType==='subject')?'':subjectType}>
													{ConvertCase(subjectType||'')}
												</option>
											))||(<option>Subject</option>)}
										</select>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					{
					!filePresent&&finalQuestions?.length ?
					// totalNumberOfQuestions ?
					// <>
						<QuestionsSectionOfContribute {...contributeArgs} />
						:
						<>
							<div style={styles.uploadButton}>
								<div style={{
										display: 'flex',
										alignItems: 'center',
										gap: 3,
									}}>
									<MoreInfo info="Upload information ..." />
									<button
									className="image_upload"
									type="button"
									onClick={() => toggleFile()}>
										Upload File
									</button>
								</div>
								{isFile ?
									<div>
										<input type="file" accept=".txt,.docx" onChange={handleFileChange}/>
									</div>
									:
									null}
							</div>
							<QuestionsSectionOfContribute {...contributeArgs} />
						</>
					}
					{/* // } */}
					{/* {showSubmit && */}
					{/* // submit button */}
					<div className="center">
						<button
						type="submit" className="c_form_button">Contribute</button>
					</div>
					{/* } */}
				</form>
				
			</div>
			{/* <!-- end body --> */}
		</>
	);
}

const styles = {
	rowForm: {
		flexDirection: 'row',
		display: 'flex',
		gap: 10
	},
	totalQs: {
		width: '25%',
	},
	uploadButton: {
		margin: 0,
		display: 'flex',
		gap: 3,
	},
	downloadButton: {
		margin: '0 15%'
	},
	questionsComp: {
		margin: '0 5%'
	},
	previewImage: {
		width: '100%',
		height: 'auto',
		maxWidth: 200,
		maxHeight: 200,
	},
	createLayout: {
		margin: '0 15%'
	},
}


const optionTypes = ['correct_answer', 'wrong_answer1', 'wrong_answer2', 'wrong_answer3']
function QuestionsSectionOfContribute (contributeArgs) {
	const {
		finalQuestions:questions,
		addQuestion,
		removeQuestion,
		handleQuestionChange,
		toggleImage,
		isImageVisible,
		totalNumberOfQuestions,
		formData
	} = contributeArgs
	// console.log('questions:', questions)
	return (
		<div>
			<div
			style={styles.questionsComp}
			>
				<div className="vertical_scroll">
					{/* {Array.isArray(questionArray) && questionArray?.map((q, index) => ( */}
					{questions?.map((q, index) => (
					<div className="c_form" key={index}>
						<fieldset
						// style={type==='create'?styles.createLayout:{}}
						>
							<div className="full field">
								{/* questions */}
								<textarea
								className=""
								placeholder={`Question ${index + 1}`}
								value={q.question||''}
								onChange={(e)=>handleQuestionChange(index, e)}
								required
								style={{background:!q.question?'#f3f3f3':null}}
								name="question" />

								{/* options */}
								{Array.from({ length: 4 }, (_, i) => i).map(optionIndex => {
									const optionFromFile = q?.options?.[optionIndex]
									const optionTyped = q[optionTypes[optionIndex]]
									// console.log(
									// 	'\noptionTypes:', optionTypes,
									// 	'\noptiontypes[i]', optionTypes[optionIndex],
									// 	// '\nquestion:', q,
									// 	'\noptionFromFile:', optionFromFile,
									// 	'\noptionTyped:', optionTyped,
									// )
									return (
									<div key={optionIndex}>
										{/* correct answers */}
										<input
										className="c_form_option_input"
										name={optionTypes[optionIndex]} type="text"
										placeholder={ConvertToSentenceCase(optionTypes[optionIndex])}
										value={optionFromFile||optionTyped||''}
										onChange={(e)=>handleQuestionChange(index, e)}
										required/>
									</div>)})}

								{/* images and switch buttons */}
								<div>
									{isImageVisible[index] ? (
										<>
											<div>
												{/* {console.log(questions)} */}
												<img
													src={questions[index]?.previewImage}
													alt={`Preview ${index +1}`}
													style={styles.previewImage}
												/>
											</div>
											<div style={{display: 'flex', gap: 10}}>
												<input
												className="image_upload image_file"
												type="file"
												accept="image/*"
												name="image"
												onChange={(e)=>handleQuestionChange(index, e)}
												/>
												<select
												className="c_form_input c_form_input_select2"
												value={questions[index]?.imageMode||''}
												onChange={(e)=>handleQuestionChange(index, e)}
												style={{background:questions.imageMode ?'#f3f3f3':null}}
												name="imageMode">
													<option value="" disabled>Mode</option>
													<option value="side">Side</option>
													<option value="top">Top</option>
												</select>
												<button
												className="image_upload remove_question_image"
												type="button"
												onClick={() => toggleImage(index)}>
													Remove Image
												</button>
											</div>
										</>
									) : (
										<button
										className="image_upload"
										type="button"
										onClick={() => toggleImage(index)}>
											Add Image
										</button>
									)}
								</div>
								<button
								style={{margin: '5px 0 50px 0'}}
								className="image_upload remove_question_image"
								type="button"
								onClick={() => removeQuestion(index)}>
									Remove Question {index+1}
								</button>
							</div>
						</fieldset>
					</div>
					))}
				</div>
				{totalNumberOfQuestions ?
				<div className="center_elements"
				// style={
				// 	// type==='create'?
				// 	styles.createLayout
				// 	// :{}
				// 	}
					>
					<button
					className="image_upload add_question"
					type="button" onClick={addQuestion}>
						Add New Question
					</button>
				</div>
				:
				null}
			</div>
			{/* <ShuffleQuestions {...args} /> */}
		</div>
	)
}