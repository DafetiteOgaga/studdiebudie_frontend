import React, { useState, useEffect, useMemo } from "react";
import { TestQuestions } from "./TestQuestions";
import { PreTest } from "./PreTest";
import { DateTimeID } from "../../hooks/DateTimeID";
import { FetchFromServer } from "../../hooks/fetch/FetchFromServer";
import { PageHead } from "../PageHead";


// const serverOrigin = 'http://localhost:4000'

export default function Tests () {
	const [submitText, setSubmitText] = useState('submit');
	const [testQuestions, setTestQuestions] = useState([]);
	const [duration, setDuration] = useState(null);
	const [formData, setFormData] = useState({})
	const dateTimeID = DateTimeID();
	const toggleImage = (index) => {
		// console.log('image toggled to:', !isImageVisible)
		console.log('index:', index)
		// setIsImageVisible((prev) => prev.map((visible, i) => (i === index ? !visible : visible)));
	};

	// let getQuestions
	// let cleanedData;
	const submitHandler = async (e) => {
		e.preventDefault(); // prevent default page refresh
		console.log('pretest:', !!formData?.pretest)
		let cleanedData = {}
		let endpoint
		if (!!formData?.pretest) {
			endpoint = '/pre-tests'
			const { pretest, ...rest } = formData;
			cleanedData = { ...rest, id: dateTimeID };
		} else {
			endpoint = '/take-tests'
			cleanedData = { ...formData };
		}

		const response = await FetchFromServer(endpoint, 'POST', cleanedData)

		console.log('Form submitted with data:', cleanedData);
		console.log('Response:', response);
		if (response?.success) {
			if (response?.goto) {
				console.log('goto:', response.goto)
				const getQuestions = await FetchFromServer(response.goto, 'GET')
				if (getQuestions?.questions) {
					console.log('getQuestions:', getQuestions)
					setTestQuestions(getQuestions?.questions)
					setDuration(getQuestions?.duration)
					// console.log('getQuestions:', getQuestions.questions)
				}
			}
		}
		alert('Submitted!');
	};

	const submitButtonText = (text) => {
		setSubmitText(text)
	}
	const args = {
		setFormData,
		testQuestions,
		duration,
		submitButtonText,
	}
	console.log('formData:', formData);
	console.log('testQuestions:', testQuestions);
	console.log('duration:', duration);
	return (
		<>
			<PageHead {...{title: 'test'}} />
			{/* <!-- body --> */}
			<div className="section contact_section tests_bg">
				<form onSubmit={submitHandler}>
					<div style={styles.questionsComp}>
						{testQuestions?.length?
						<TestQuestions {...args} />
						:
						<PreTest {...args} />}
					</div>
					{/* // submit button */}
					<div className="center">
						<button
						type="submit"
						className="c_form_button">
							{submitText}
						</button>
					</div>
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
		margin: '0 20%'
	},
	downloadButton: {
		margin: '0 15%'
	},
	questionsComp: {
		margin: '0 15%',
	},
}

