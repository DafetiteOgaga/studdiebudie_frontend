import React, { useState, useEffect, useMemo, useRef } from "react";
import defaultImage from '../../statics/images/sample_image.png'
import { useHandleFileUpload } from "../../hooks/FileReaderHandler";
import { ShuffleQuestions } from "./ShuffleQuestions";
import { MoreInfo } from "../MoreInfo";
import { ConvertCase } from "../../hooks/ConvertCase";
import { PageHead } from "../PageHead";
import { FetchFromServer } from "../../hooks/fetch/FetchFromServer";
import { useIsMobile } from "../../hooks/IsMobile";

function generateUniqueId() {
	// Get date & time down to seconds
	const now = new Date();
	const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
	// Generate 6–8 random alphanumeric characters
	const randomPart = Math.random().toString(36).substring(2, 10);
	return `${timestamp}${randomPart}`;
}

const formValues = {
	school: "",
	email: "",
	subject: "",
	phone: "",
	class: "",
	term: "",
	duration: "",
	totalQs: "",
	session: "",
	instruction: "",
	noOfTypes: "",
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
	imageMode: 'side',
	uniqueId: generateUniqueId(),
}

const termArray = ['term', 'none', 'first', 'second', 'third']

export default function Scramble() {
	const isMobile = useIsMobile();
	const [showSubmitArray, setShowSubmitArray] = useState([false, false]);
	const [downloadLink, setDownloadLink] = useState(null);
	const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0)
	const [questions, setQuestions] = useState([questionObject]);
	const [fileUploadQuestions, setFileUploadQuestions] = useState([questionObject]);
	const [newFileUploadQuestions, setNewFileUploadQuestions] = useState(null);
	const [schoolData, setSchoolData] = useState(null);
	const [formData, setFormData] = useState(formValues);
	const [totalFileUploadQuestions, setTotalFileUploadQuestions] = useState(0)
	const [isImageVisible, setIsImageVisible] = useState([Array(totalFileUploadQuestions?totalFileUploadQuestions:totalNumberOfQuestions).fill(false)]);
	const [isFile, setIsFile] = useState(false)
	// const [isReload, setIsReload] = useState(false);
	// const [UploadedContent, setUploadedContent] = useState(null)

	let deleteIndexArray = useRef([])
	const { text, processedText, handleFileChange } = useHandleFileUpload();
	let infoItems
	const toggleFile = () => {
		setIsFile((prev) => {
			if (prev===true) {
				infoItems = null
			} else {
				setTotalFileUploadQuestions(0)
			}
			setFormData(formValues)
			return !prev
		})
	}
	const handleQuestionChange = (index, e) => {
		const { name, value, files } = e.target;
		let updatedQuestions = [...questions];
		// if (totalFileUploadQuestions) updatedQuestions = [...fileUploadQuestions]
		updatedQuestions[index]["number"] = index + 1; // auto-add/update question number
		if (name === "image") {
			const file = files[0];
			updatedQuestions[index].image = file; // assign image file object
			updatedQuestions[index].previewImage = URL.createObjectURL(file); // assign preview URL for the image
		} else {
			updatedQuestions[index][name] = value;
		}
		setQuestions(updatedQuestions)
		setFormData((prev) => ({...prev, ...updatedQuestions}))
		setShowSubmitArray(prev => {
			const updated = [...prev];
			updated[1] = true;
			return updated;
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'totalQs') {
			setTotalNumberOfQuestions(!isNaN(Number(value))?Number(value):0)
			setTotalFileUploadQuestions(Number(0))
			setFormData(formValues)
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
				[name]: !isNaN(Number(value))?Number(value):0,
			}))
		}
		else if (name === 'noOfTypes') {
				setFormData((prev) => ({
					...prev,
					[name]: (!isNaN(Number(value))&&value!==''&&Number(value)>0&&Number(value)<=26)?Number(value):'',
				}))
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}))
		}
	};

	const addQuestion = () => {
		console.log('addQuestion')
		console.log('fileUploadQuestions:', fileUploadQuestions)
		const newQuestionObject = [
			// ...questions,
			{
				number: '',
				question: '',
				correct_answer: '',
				wrong_answer1: '',
				wrong_answer2: '',
				wrong_answer3: '',
				image: null,
				previewImage: defaultImage,
				imageMode: 'side',
				uniqueId: generateUniqueId(),
			}
		]
		// setQuestions();
		if (totalFileUploadQuestions) {
			setNewFileUploadQuestions((prev)=>(prev?[...prev, newQuestionObject]:[...fileUploadQuestions, newQuestionObject]))
			// setTotalFileUploadQuestions(prev=>prev+1)
		} else {
			setQuestions((prev)=>[...prev, newQuestionObject[0]])
			setFormData((prev) => ({
				...prev,
				totalQs: Number(prev.totalQs)+1
			}));
		}
	};
	useEffect(() => {
		const newQuestions = Array.from({ length: totalNumberOfQuestions }, () => ({
			number: '',
			question: '',
			correct_answer: '',
			wrong_answer1: '',
			wrong_answer2: '',
			wrong_answer3: '',
			image: null,
			previewImage: defaultImage,
			imageMode: 'side',
			uniqueId: generateUniqueId(),
		}));
		setQuestions(newQuestions);
	}, [totalNumberOfQuestions]);

	const removeQuestion = (index, questionID) => {
		console.log('removeQuestion called with\nindex:', index, '\nquestionID:', questionID)
		// console.log('removeQuestion:', index)
		const updatedQuestions = totalFileUploadQuestions?[...fileUploadQuestions]:[...questions];
		// console.log({questions})
		// console.log({fileUploadQuestions})
		// updatedQuestions.splice(index, 1);
		console.log('updatedQuestions1:', updatedQuestions)
		const filteredQuestions = updatedQuestions.filter((item, i) => {
			if (item.uniqueId === questionID) {
				console.log(`removing question with ${item.uniqueId}`)
				console.log(`removing ${item.question} from questions`)
				return false;
			}
			return item.uniqueId !== questionID});
		setImageVisibility(questionID);
		console.log('filteredQuestions:', filteredQuestions)
		// console.log({updatedQuestions})
		// if (totalFileUploadQuestions) {updatedQuestions = [...fileUploadQuestions]}
		
		// if (totalFileUploadQuestions) {
		if (totalFileUploadQuestions) {
			// console.log('totalFileUploadQuestions:')
			setNewFileUploadQuestions(filteredQuestions)
		} else {
			setQuestions(filteredQuestions)
			setFormData((prev) => ({
				...prev,
				totalQs: Number(prev.totalQs)-1
			}));
		}
	};

	const toggleImage = (index, questionID, remove=false) => {
		console.log('image toggled to:', isImageVisible)
		console.log('index:', index)
		if (remove) {
			console.warn('may not need to use toggleImage fxn in remove image button')
		} else {
			console.log('questionID:', questionID)
			setIsImageVisible((prev) => prev.map((visible, i) => (i === index ? questionID : visible)))
		}
	};

	const setImageVisibility = (questionID=null) => {
		console.log('questionID:', questionID)
		console.log('isImageVisible:', isImageVisible)
		const numberOfQuestions = totalFileUploadQuestions || totalNumberOfQuestions;
		const visibleItems = (isImageVisible).filter(item => {
			if (item === false) return false;
			if (questionID&&item.includes(questionID)) {
				return false
			}
			return true});
		let visibleItemsLength = questionID?visibleItems.length:visibleItems.length-1;
		console.log('initial visibleItemsLength:', visibleItemsLength)
		if (visibleItemsLength < 0) visibleItemsLength = 0;
		const remainingCount = numberOfQuestions - visibleItemsLength;
		console.log(
			'\nvisibleItems:', visibleItems,
			'\nnumberOfQuestions:', numberOfQuestions,
			'\nvisibleItemsLength:', visibleItemsLength,
			'\nremainingCount:', remainingCount,
		)
		const falseArray = Array(remainingCount).fill(false);
		setIsImageVisible(visibleItemsLength?[...visibleItems, ...falseArray]:[...falseArray]);
		// console.log('\nReloading app'.repeat(5))
		// setIsReload(prev => !prev)
	}
	useEffect(() => {
		console.log('from useeffect:')
		setImageVisibility()
	}, [totalFileUploadQuestions, totalNumberOfQuestions]);

	useEffect(() => {
		if (downloadLink) {
			const delay = setTimeout(() => {
				setDownloadLink(null);
			}, 1000*60*60*5); // 5 hours
			return () => clearTimeout(delay);
		}
	}, [downloadLink])

	// let cleanedData;
	const submitHandler = async (e) => {
		e.preventDefault(); // prevent default page refresh
		const cleanedData = {...formData}
		const questions = []
		Object.entries(cleanedData).forEach(([key, value]) => {
			// console.log('\n', {key}, {value}, typeof(value))
			if (!isNaN(Number(key))) {
				// console.log('checking value:', value.question)
				if (deleteIndexArray.current.includes(value.uniqueId)) {
					console.log(`removing ${value.question} from cleanedData`)
					delete cleanedData[key]
				} else {
					// console.log('key1:', Number(key))
					questions.push({
						...value,
						index: Number(key)+1,
					})
					delete cleanedData[key]
				}
			}
			if (typeof(value) === 'object'&&!value.question) {
				delete cleanedData[key]
			}
		});
		cleanedData.postQuestions = questions
		console.log('cleanedData:', cleanedData);
		// return;
		const endpoint = 'shufflequestions/shuffle'
		const res = await FetchFromServer(endpoint, 'POST', cleanedData)
		console.log('Form submitted with data:', cleanedData);
		// const alert1 = `\nResponse: \n ${JSON.stringify(res, null, 2)}`
		alert("Success\nClick 'Download File' to download the shuffled questions");
		if (res?.success) {
			setDownloadLink(res.downloadLink)
			deleteIndexArray.current = [];
		}
	};
	const fileQuestionsHandle = (fileQuestions) => {
		// console.log('updating formData with fileQuestions:')
		setFormData((prev) => ({...prev, ...fileQuestions}))
	}
	
	const removeQuestionFromArray = (questionID) => {
		console.log('removeQuestionFromArray called')
		deleteIndexArray.current.push(questionID);
		console.log(`added ${questionID} to be delete array removed`);
	}
	const args = {
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
		formData,
		setFormData,
		fileQuestionsHandle,
		showSubmitArray,
		setShowSubmitArray,
		type: 'create',
		text: null,
		processedText,
		downloadLink,
		removeQuestionFromArray,
		setImageVisibility,
		generateUniqueId,
		// setIsReload,
	}
	infoItems = useMemo(() => {
		if (!schoolData) return null;

		const lines = schoolData.split('\n').filter(Boolean);
		return Object.assign({}, ...lines.map((item, index) => {
			const [key, value] = item.includes(':') ? item.split(':') : [null, item.trim()];
			return {...(key?{[key.toLowerCase().trim()]: value.trim()}:{[index]: item})}
		}));
	}, [schoolData]);

	useEffect(() => {
		if (!infoItems) return;

		setFormData((prev) => ({
		...prev,
		school: infoItems.school || "",
		email: infoItems.email || "",
		subject: infoItems.subject || "",
		phone: infoItems.phone || "",
		class: infoItems.class || "",
		term: infoItems.term.toLowerCase().includes('first')?'first':infoItems.term.toLowerCase().includes('second')?'second':infoItems.term.toLowerCase().includes('third')?'third':'none',
		duration: infoItems.duration || "",
		totalQs: "",
		session: infoItems.session || "",
		instruction: infoItems.instruction || "",
		}));
		setShowSubmitArray(prev => {
			const updated = [...prev];
			updated[0] = true;
			return updated;
		});
	}, [infoItems]);
	// console.log('formData:', formData);
	// console.log('isImageVisible:', isImageVisible);
	// console.log('formData:', formData);
	console.log('deleteIndexArray.current:', deleteIndexArray.current);
	// console.log('newFileUploadQuestions:', newFileUploadQuestions);
	return (
		<>
			<PageHead {...{title: 'create/scramble'}} />
			{/* <!-- body --> */}
			<div className="section contact_section create_bg">
				<form onSubmit={submitHandler}>
					<div className="col-sm-12" style={{padding: '3% 0 0.5% 0'}}>
						<div className="c_form">
							<fieldset className="create_fieldset">
								<div className="full field">
									<div className="totalQs">
										{/* totalQs */}
										<input
										className="c_form_input" placeholder="No. of Questions"
										value={formData.totalQs} onChange={handleChange}
										required={!!!isFile}
										disabled={!!isFile}
										type="tel" name="totalQs" />
									</div>
									<div>
										{/* school name */}
										<input
										className="c_form_input" placeholder="School Name"
										value={formData.school} onChange={handleChange}
										required
										type="text" name="school" />
									</div>

									{/* email, phone and subject */}
									<div className="rowForm">
										{/* email */}
										<input
										className="c_form_input" placeholder="Email Address"
										value={formData.email} onChange={handleChange}
										required
										type="email" name="email" />

										{/* phone */}
										<input
											className="c_form_input" placeholder="Phone Number"
											value={formData.phone} onChange={handleChange}
											required
											type="tel" name="phone" />

										{/* subject */}
										<input
										className="c_form_input" placeholder="Subject"
										value={formData.subject} onChange={handleChange}
										type="text" name="subject" />

										{/* noOfTypes */}
										<input
										className="c_form_input" placeholder="No. of Types"
										value={formData.noOfTypes} onChange={handleChange}
										required
										type="tel" name="noOfTypes" />
									</div>

									{/* class, session, term, duration, totalQs and instruction */}
									<div className="rowForm">

										{/* class and sesion */}
										<div className="rowForm rowForm2">
											{/* class */}
											<input
											style={{width: '60%'}}
											className="c_form_input" placeholder="Class"
											value={formData.class} onChange={handleChange}
											type="text" name="class" />
											{/* session */}
											<input
											style={{width: '60%'}}
											className="c_form_input" placeholder="Session"
											value={formData.session} onChange={handleChange}
											required
											type="text" name="session" />
										</div>
										<div className="rowForm rowForm2">
											{/* term */}
											<select
											style={{width: '60%'}}
											className="c_form_input"
											value={formData.term} onChange={handleChange}
											name="term">
												{termArray.map((term, index) => (
													<option key={index} value={term==='term'?'':term} disabled={term==='term'?true:false}>
														{ConvertCase(term||'')}
													</option>
												))}
											</select>

											{/* duration */}
											<input
											style={{width: '60%'}}
											className="c_form_input" placeholder="Duration"
											value={formData.duration}
											// onChange={handleChange}
											onChange={(e) => {
												const value = e.target.value;
												// Allow only numbers and one decimal point
												if (/^\d*\.?\d*$/.test(value)) {
													handleChange(e);
												}
											}}
											required
											type="tel" name="duration" />
										</div>
										{/* instruction */}
										<input
										style={{width: isMobile?null:'40%'}}
										className="c_form_input" placeholder="Instruction"
										value={formData.instruction} onChange={handleChange}
										required
										type="text" name="instruction" />
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					{(totalNumberOfQuestions&&!isFile) ?
						<div>
							<ShuffleQuestions {...args} />
						</div>
						:
						<div className="create_fieldset">
							<div className="uploadBtncreate">
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
							{isFile ?
								<>
									<div>
										<ShuffleQuestions {...args} fileMargin={{margin: 'auto'}} type="file" text={text} />
									</div>
								</>
								:
								null}
						</div>
					}
					{/* submit button */}
					<div className="center">
						<button
						style={{textWrap: 'nowrap', padding: '0 1%', width: 'fit-content'}}
						type="submit" className="c_form_button">Scramble Questions</button>
					</div>
				</form>
			</div>
		</>
	);
}
