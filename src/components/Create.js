import React, { useState, useEffect } from "react";
import defaultImage from '../statics/images/sample_image.png'
import { handleFileUpload } from "../hooks/FileReaderHandler";

const formValues = {
	// school: "lssmc",
	// email: "me@me.com",
	// subject: "maths",
	// phone: "22222",
	// class: "ss2",
	// term: "second",
	// duration: "3",
	// totalQs: "4",
	school: "",
	email: "",
	subject: "",
	phone: "",
	class: "",
	term: "",
	duration: "",
	totalQs: "",
	session: "",
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

export default function Create() {
	// const numberOfQuestions = 2
	const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState(0)
	const [questions, setQuestions] = useState([questionObject]);
	const [formData, setFormData] = useState(formValues);
	const [isImageVisible, setIsImageVisible] = useState([Array(totalNumberOfQuestions).fill(false)]);
	const [isFile, setIsFile] = useState(false)

	const toggleFile = () => {
		setIsFile(!isFile)
	}
	const handleQuestionChange = (index, e) => {
		const { name, value, files } = e.target;
		let updatedQuestions = [...questions];
		updatedQuestions[index]["number"] = index + 1; // auto-add/update question number
		if (name === "image") {
			const file = files[0];
			updatedQuestions[index].image = file; // assign image file object
			updatedQuestions[index].previewImage = URL.createObjectURL(file); // assign preview URL for the image
		} else {
			updatedQuestions[index][name] = value;
		}
		setQuestions(updatedQuestions);
		setFormData((prev) => ({...prev, ...updatedQuestions}))
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (name === 'totalQs') {
			setTotalNumberOfQuestions(Number(value))
		}
	};

	const addQuestion = () => {
		setQuestions([
			...questions,
			{
				question: '',
				correct_answer: '',
				wrong_answer1: '',
				wrong_answer2: '',
				wrong_answer3: '',
				image: null,
			}
		]);
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
			imageMode: '',
		}));
		setQuestions(newQuestions);
	}, [totalNumberOfQuestions]);

	const removeQuestion = (index) => {
		const updatedQuestions = [...questions];
		updatedQuestions.splice(index, 1);
		setQuestions(updatedQuestions);
	};

	const toggleImage = (index) => {
		setIsImageVisible((prev) => prev.map((visible, i) => (i === index ? !visible : visible))
		);
	};

	useEffect(() => {
		setIsImageVisible(Array(totalNumberOfQuestions).fill(false));
	}, [totalNumberOfQuestions]);

	const submitHandler = (e) => {
		e.preventDefault(); // prevent default page refresh
		Object.entries(formData).forEach(([key, value]) => {
			// console.log('\n', {key}, {value}, typeof(value))
			if (typeof(value) === 'object' && !value.question) {
				delete formData[key]
			}
		});
		console.log('Form submitted with data:', formData);
		alert('Submitted!');
	};
	// const input = document.querySelectorAll('.c_form_input, .c_form textarea')
	// input.forEach(inputElement => {
	// 	inputElement.addEventListener('input', () => {
	// 	if (inputElement.value.trim() !== '') {
	// 		inputElement.classList.add('not_empty')
	// 	} else {
	// 		inputElement.classList.remove('not_empty')
	// 	}
	// })})
	// console.log('isImageVisible:', isImageVisible)
	return (
		<>
			{/* <!-- head --> */}
			<div className="section layout_padding padding_bottom-0">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="full">
								<div className="heading_main text_align_center">
									<h2>
										<span>Create</span>
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end head --> */}
			{/* <!-- body --> */}
			<div className="section contact_section"
			style={{
				background: "#12385b",
				paddingBottom: 40
			}}
			>
				<form onSubmit={submitHandler}>
					<div className="col-sm-12" style={{padding: '40px 0'}}>
						<div className="c_form">
							<fieldset style={{margin: '0 20%'}}>
								<div className="full field">
									<div>
										{/* school name */}
										<input
										className="c_form_input" placeholder="School Name"
										value={formData.school} onChange={handleChange}
										required
										type="text" name="school" />
									</div>

									{/* email and subject */}
									<div style={styles.rowForm}>
										<input
										className="c_form_input" placeholder="Email Address"
										value={formData.email} onChange={handleChange}
										required
										type="email" name="email" />

										<input
										className="c_form_input" placeholder="Subject"
										value={formData.subject} onChange={handleChange}
										type="text" name="subject" />
									</div>

									{/* phone, class, term, duration, totalQs */}
									<div style={styles.rowForm}>

										{/* phone */}
										<div style={styles.rowForm}>
											<input
											className="c_form_input" placeholder="Phone Number"
											value={formData.phone} onChange={handleChange}
											required
											type="tel" name="phone" />
											
										</div>

										{/* term, duration and totalQs */}
										<div style={styles.rowForm}>
											{/* class */}
											<input
											className="c_form_input" placeholder="Class"
											value={formData.class} onChange={handleChange}
											type="text" name="class" />
											<select style={{
												width: '70%',
												background: formData.term ? '#f3f3f3':null
											}}
											className="c_form_input"
											value={formData.term} onChange={handleChange}
											name="term">
												<option value="" disabled>Term</option>
												<option value="none">None</option>
												<option value="first">First</option>
												<option value="second">Second</option>
												<option value="third">Third</option>
											</select>
											<input
											style={{width: '60%'}}
											className="c_form_input" placeholder="Duration"
											value={formData.duration} onChange={handleChange}
											required
											type="tel" name="duration" />
											<input
											className="c_form_input" placeholder="Total Questions"
											value={formData.totalQs} onChange={handleChange}
											required
											type="tel" name="totalQs" />
											<input
											className="c_form_input" placeholder="Session"
											value={formData.session} onChange={handleChange}
											required
											type="text" name="session" />
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<button
					className="image_upload"
					type="button"
					onClick={() => toggleFile()}
					>
						Upload File
					</button>
					{totalNumberOfQuestions ?
						<div className="row">
							<div className="col-sm-12">
								<div className="vertical_scroll">
								{/* questions, one correct and three wrong answers (for each sections), and optional image  */}
									{/* {Array.from({ length: totalNumberOfQuestions }).map((q, index) => ( */}
									{questions.map((q, index) => (
										<div className="c_form" key={index}>
											<fieldset style={{margin: '0 15%'}}>
												<div className="full field">
													{/* questions */}
													<textarea
													className=""
													placeholder={`Question ${index + 1}`}
													value={q.question}
													onChange={(e)=>handleQuestionChange(index, e)}
													required
													style={{background: q.question?'#f3f3f3':null}}
													name="question" />

													{/* correct answers */}
													<input
													className="c_form_option_input"
													name="correct_answer" type="text"
													placeholder="Correct Answer"
													value={q.correct_answer}
													onChange={(e)=>handleQuestionChange(index, e)}
													required/>

													{/* wrong answer1 */}
													<input
													className="c_form_option_input"
													name="wrong_answer1" type="text"
													placeholder="Wrong Answer"
													value={q.wrong_answer1}
													onChange={(e)=>handleQuestionChange(index, e)}
													required />

													{/* wrong answer2 */}
													<input
													className="c_form_option_input"
													name="wrong_answer2" type="text"
													placeholder="Wrong Answer"
													value={q.wrong_answer2}
													onChange={(e)=>handleQuestionChange(index, e)}
													required />

													{/* wrong answer3 */}
													<input
													className="c_form_option_input"
													name="wrong_answer3" type="text"
													placeholder="Wrong Answer"
													value={q.wrong_answer3}
													onChange={(e)=>handleQuestionChange(index, e)}
													required />

													{/* images and switch buttons */}
													<div>
														{isImageVisible[index] ? (
															<>
																<div>
																	<img
																		src={questions[index].previewImage}
																		alt={`Preview ${index + 1}`}
																		style={styles.previewImage}
																	/>
																</div>
																<div style={{display: 'flex', gap: 10}}>
																	<input
																	className="image_upload image_file"
																	type="file" accept="image/*"
																	name="image"
																	onChange={(e)=>handleQuestionChange(index, e)}
																	/>
																	<select
																	className="c_form_input c_form_input_select2"
																	value={q.imageMode}
																	onChange={(e)=>handleQuestionChange(index, e)}
																	style={{background: q.imageMode ? '#f3f3f3':null}}
																	name="imageMode">
																		<option value="" disabled>Mode</option>
																		<option value="side">Side</option>
																		<option value="top">Top</option>
																	</select>
																	<button
																	className="image_upload remove_question_image"
																	type="button"
																	// onClick={() => handleQuestionChange(index, {name: 'image', files: [null]})}
																	onClick={() => toggleImage(index)}
																	>
																		Remove Image
																	</button>
																</div>
															</>
														) : (
															<button
															className="image_upload"
															type="button"
															// onClick={() => document.getElementById(`image-${index}`).click()}
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
													// className="remove-btn"
													onClick={() => removeQuestion(index)}
													>
														Remove Question {index + 1}
													</button>
												</div>
												{index === totalNumberOfQuestions-1 ?
												<button
												className="image_upload add_question"
												type="button" onClick={addQuestion}>
													Add New Question
												</button>
												:
												null}
											</fieldset>
										</div>
									))}
								</div>
								<div>
									{/* submit button */}
									<div className="center">
										<button
										type="submit" className="c_form_button">Send</button>
									</div>
								</div>
							</div>
						</div>
						:
						(isFile ?
							<div>
								<input type="file" accept=".txt,.docx" onChange={handleFileUpload} />
							</div>
							:
							null)
					}
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
	previewImage: {
		width: '100px',
		height: 'auto',
		marginBottom: '5px',
		border: '1px solid #464642',
		borderRadius: 5,
		background: '#f3f3f3',
		// backgroundSize: 'contain',
	},
	// select: {
	// 	color: '#676767'
	// }
}
