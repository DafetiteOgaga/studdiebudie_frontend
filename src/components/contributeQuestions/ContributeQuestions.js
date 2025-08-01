import React, { useState, useEffect } from "react";
import defaultImage from '../../statics/images/sample_image.png'
import { useHandleFileUpload } from "../../hooks/FileReaderHandler";
import { MoreInfo } from "../MoreInfo";
import { ConvertCase } from "../../hooks/ConvertCase";
import { PageHead } from "../PageHead";
import { QuestionInfo } from "../data/QuestionInfo";
import { QuestionsSectionOfContribute } from "./QuestionsSectionOfContribute";
import { FetchFromServer } from "../../hooks/fetch/FetchFromServer";

const questionObject = {
	options: ['', '', '', ''],
	number: '',
	question: '',
	image: null,
	previewImage: defaultImage,
	imageMode: '',
	correct_answer: '',
}

const optionTypes = ['correct_answer', 'wrong_answer1', 'wrong_answer2', 'wrong_answer3']
export default function ContributeQuestions() {
	const { typeArray, primaryArray, secondaryArray, primarySubjectArray, secondarySubjectArray } = QuestionInfo();
	const [totalNumberOfFileUploadQuestions, setTotalNumberOfFileUploadQuestions] = useState(0)
	const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0)
	const [questions, setQuestions] = useState([]);
	// const [fileUploadQuestions, setFileUploadQuestions] = useState([questionObject]);
	const [formData, setFormData] = useState({});
	const [isImageVisible, setIsImageVisible] = useState([Array(totalNumberOfFileUploadQuestions?totalNumberOfFileUploadQuestions:totalNumberOfQuestions).fill(false)]);
	const [isFile, setIsFile] = useState(false)
	const { text, processedText, handleFileChange } = useHandleFileUpload();
	const toggleFile = () => {
		setIsFile((prev) => !prev)
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
		// let updatedQuestions = [...questions];
		let updatedQuestions = [...questions];
		console.log('updatedQuestions ########## (1):', updatedQuestions)
		console.log('AAAAAAAAAA',
			'\nupdatedQuestions:', updatedQuestions,
			'\nupdatedQuestions[index]:', updatedQuestions[index],
			// '\nupdatedQuestions[index][number]:', updatedQuestions[index][number],
			'\nupdatedQuestions[index][name]:', updatedQuestions[index][name],
			// '\nupdatedQuestions[index][name]===null:', updatedQuestions[index][name]===null,
		)
		updatedQuestions[index]["number"] = index + 1; // auto-add/update question number
		// updatedQuestions.questions[index]["number"] = index + 1;
		console.log(
			'\nupdatedQuestions (number) ########## (1):', updatedQuestions,
			'\nname:', name,
			'\nvalue:', value,
		)
		// if (updatedQuestions.length !== 0) {
		if (name === "image") {
			const file = files[0];
			updatedQuestions[index].image = file; // assign image file object
			updatedQuestions[index].previewImage = URL.createObjectURL(file); // assign preview URL for the image
		} else if (optionTypes.includes(name)&&updatedQuestions[index]['options']) {
			const optionIndex = optionTypes.indexOf(name);
			console.log(updatedQuestions)
			console.log(updatedQuestions[index])
			console.log(updatedQuestions[index]['options'])
			console.log(updatedQuestions[index]['options'][optionIndex])
			console.log('optionIndex:', optionIndex)
			if (name==='correct_answer') {
				updatedQuestions[index].correct_answer = value;
			}
			updatedQuestions[index].options[optionIndex] = value;
			console.log(
				'\nupdatedQuestions (option) ########## (1):', updatedQuestions,
				'\nupdatedQuestions[index][name]:', updatedQuestions[index][name],
			)
		} else {
			console.log('updateQuestions XXXXXXXXX', updatedQuestions)
			updatedQuestions[index][name] = value;
			console.log(
				'\nupdateQuestions XXXXXXXXX', updatedQuestions,
				'\nupdatedQuestions[index][name]:', updatedQuestions[index][name],
			)
		}
		console.log('updatedQuestions (value) ########## (1):', updatedQuestions)
		// console.log('questions ########## (1):', questions)
		setQuestions(updatedQuestions);
		setFormData((prev) => ({...prev, questions: [...updatedQuestions]}))
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'totalQs') {
			setTotalNumberOfQuestions(() => {
				const num = +value;
				return num > 0 ? num : 0;
			});
			setFormData({})
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

	const toggleImage = (index) => {
		console.log('image toggled from:', isImageVisible[index], 'to:', !isImageVisible[index])
		console.log('index:', index)
		setIsImageVisible((prev) => prev.map((visible, i) => (i === index ? !visible : visible))
		);
	};

	useEffect(() => {
		console.log('questions:', questions)
		const newQuestions = Array.from({ length: totalNumberOfQuestions }, () => (
			{
				options: ['', '', '', ''],
				number: '',
				question: '',
				image: null,
				previewImage: defaultImage,
				imageMode: '',
				correct_answer: '',
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
		setIsImageVisible(Array(totalNumberOfFileUploadQuestions?totalNumberOfFileUploadQuestions:totalNumberOfQuestions).fill(false));
		// setIsImageVisible(Array(totalNumberOfQuestions).fill(false));
	}, [totalNumberOfQuestions, totalNumberOfFileUploadQuestions]);

	// let cleanedData;
	const submitHandler = async (e) => {
		e.preventDefault(); // prevent default page refresh
		const cleanedData = { ...formData };
		console.log(
			'\nformData:', formData,
			'\ncleanedData:', cleanedData,
		);
		const endpoint = 'contribute/subjects'
		const res = await FetchFromServer(endpoint, 'POST', cleanedData)
		console.log('Form submitted with data:', cleanedData);
		// const alert1 = `\nResponse: \n ${JSON.stringify(res, null, 2)}`
		alert(`${ConvertCase(res?.success||'')}\n${res?.message||''}`);
	};
	let fileInfo, finalQuestions = questions
	const filePresent = isFile && processedText?.length > 0
	// let testQ
	console.log('questions (typed) RRRRRRRRRR:', questions)
	if (filePresent) {
		let [info, ...questionsFromFile] = processedText
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

		console.log(
			'\nquestionsFromFile (from file) RRRRRRRRRR:', questionsFromFile,
			'\nquestions (typed) QQQQQQQQQQQQ:', questions,
			'\nformData:', formData,
		)
		if (questions?.some(item => item.hasOwnProperty('number'))) {
			console.log('111111111111111111111')
			finalQuestions = questions
		} else {
			console.log('22222222222222222222')
			finalQuestions = questionsFromFile?.map(questionItem => {
				console.log('questionItem:', questionItem)
				const [question, ...options] = questionItem.question.split('\n').filter(Boolean)
				const id = questionItem.id
				const number = questionItem.id
				const correct_answer = options[0]
				// console.log({correct_answer})
				const image = null
				const previewImage = defaultImage
				const imageMode = ''
				const objectToReturn = {
					id,
					number,
					question,
					options,
					correct_answer,
					image,
					previewImage,
					imageMode,
				}
				return objectToReturn
			})
		}
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
			setQuestions((prev) => ([
				...prev,
				...finalQuestions,
			]));
		}
		if (!!Number(formData.totalQs)) {
			setTotalNumberOfFileUploadQuestions(0)
		} else {
			const value = processedText?.length
			setTotalNumberOfFileUploadQuestions(() => {
				const num = +value - 1;
				return num > 0 ? num : 0;
			});
		}
		
	}, [filePresent, totalNumberOfQuestions])

	const addQuestion = () => {
		console.log('addQuestion')
		// console.log('fileUploadQuestions:', fileUploadQuestions)
		const newQuestionObject = [questionObject]
		console.log('questions ########## (2):', questions)
		setQuestions((prev)=>[...prev, newQuestionObject[0]])
		console.log(
			'\nnewQuestionObject:', newQuestionObject,
			'\nquestions ########## (2):', questions,
			'\nformData:', formData,
		)
		if (!filePresent) {
			setFormData((prev) => ({
				...prev,
				totalQs: Number(prev.totalQs)+1
			}));
		}
	};

	useEffect(() => {
		if (filePresent) {
			setFormData((prev) => ({
				...prev,
				questions: [...questions],
			}));
		}
	}, [questions])

	const removeQuestion = (index) => {
		console.log('removeQuestion:', index)
		const updatedQuestions = [...questions];
		updatedQuestions.splice(index, 1);
		console.log('questions ########## (3):', questions)
		setQuestions(updatedQuestions)
		if (!filePresent) {
			setFormData((prev) => ({
				...prev,
				totalQs: Number(prev.totalQs)-1
			}));
		}
	};
	console.log(
		'\nquestions[index]:', questions[0],
		'\ntotalNumberOfQuestions:', totalNumberOfQuestions,
		'\ntypeCategory:', formData?.typeCategory,
		// '\ntext (from file):', text,
		// '\nprocessedText:', processedText,
		'\nfileInfo:', fileInfo,
		'\nformData:', formData,
		'\nquestions:', questions,
		'\nfinalQuestions:', finalQuestions,
		'\ntotalNumberOfFileUploadQuestions:', totalNumberOfFileUploadQuestions,
		'\ntotalNumberOfQuestions:', totalNumberOfQuestions,
		'\nisimageVisible:', isImageVisible,
		'\nformData.totalQs:', formData.totalQs,
		'\nformData.totalQs?', !!Number(formData.totalQs),
		// '\ntypeArray:', typeArray,
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
				<form onSubmit={submitHandler} className="testForm">
					<div className="col-sm-12 removePadding">
						<div className="c_form">
							<fieldset className="contribute_fieldset">
								<div className="full field">
									<div className="totalQs">
										{/* totalQs */}
										<input
										className="c_form_input" placeholder="No. of Questions"
										value={formData.totalQs||''} onChange={handleChange}
										required={!!!isFile}
										disabled={!!isFile}
										type="tel" name="totalQs" />
									</div>
									<div className="rowForm">
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
					<>
					{!filePresent&&finalQuestions?.length ?
						<QuestionsSectionOfContribute {...contributeArgs} />
						:
						<>
							<div className="uploadButtons_row">
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
										<input className="uploadFileInput" type="file" accept=".txt,.docx" onChange={handleFileChange}/>
									</div>
									:
									null}
							</div>
							<QuestionsSectionOfContribute {...contributeArgs} />
						</>}
					</>
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
