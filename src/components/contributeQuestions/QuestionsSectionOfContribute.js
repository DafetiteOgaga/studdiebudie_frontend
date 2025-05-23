const { ConvertToSentenceCase } = require("../../hooks/ConvertCase")

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
	console.log('\nquestions.length:', questions.length)
	return (
		<div
		style={{marginTop: '5%'}}
		>
			<div
			className="questionForm">
				<div className="vertical_scroll">
					{/* {Array.isArray(questionArray) && questionArray?.map((q, index) => ( */}
					{questions?.map((q, index) => (
					<div className="c_form" key={index}>
						{/* {console.log('q:', q)} */}
						<fieldset>
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
				{(questions?.length!==0) ?
				<div className="center_elements centerAddQuestionBtn">
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
export { QuestionsSectionOfContribute };

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
		margin: '1% 0 0 0',
		display: 'flex',
		gap: 3,
	},
	downloadButton: {
		margin: '0 15%'
	},
	// questionsComp: {
	// 	margin: '0 10%'
	// },
	previewImage: {
		width: '100%',
		height: 'auto',
		maxWidth: 200,
		maxHeight: 200,
	},
	// createLayout: {
	// 	// margin: '0 15%'
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// },
}
