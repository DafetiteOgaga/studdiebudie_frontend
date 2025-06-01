import React, { useState, useEffect, useMemo } from "react";
import { TestQuestions } from "./TestQuestions";
import { PreTest } from "./PreTest";
import { DateTimeID } from "../../hooks/DateTimeID";
import { FetchFromServer } from "../../hooks/fetch/FetchFromServer";
import { PageHead } from "../PageHead";
import { shuffleArray } from "../../hooks/shuffleQuestiond/shufflerHook";
import { MemoCountdown } from '../../hooks/Countdown';
import { useIsMobile } from "../../hooks/IsMobile";

export default function Tests () {
	const isMobile = useIsMobile();
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
				console.log(
					'\ngoto:', response.goto,
					'\ninfo:', response.info
				)
				const getQuestions = await FetchFromServer(response.goto, 'POST', response.info)
				if (getQuestions?.questions) {
					console.log('getQuestions:', getQuestions)
					let shuffledQuestions = getQuestions?.questions
					shuffledQuestions = shuffledQuestions.map((question) => {
						const shuffledOptions = shuffleArray(question.options);
						return {
							...question,
							options: shuffledOptions,
						};
					});
					shuffledQuestions = shuffleArray(shuffledQuestions);
					console.log(
						'\noriginalQuestions:', getQuestions?.questions,
						'\nshuffledQuestions:', shuffledQuestions
					)
					setTestQuestions(shuffledQuestions)
					console.log('getQuestions.duration:', getQuestions?.duration)
					setDuration(getQuestions?.duration)
					// console.log('getQuestions:', getQuestions.questions)
				}
			}
		}
		const alert1 = `\nResponse: \n ${JSON.stringify(response, null, 2)}`
		alert(alert1);
		// if (res?.success) {
		// 	// console.log('downloadLink:', res.downloadLink)
		// 	setDownloadLink(res.downloadLink)
		// 	// setQuestions([questionObject])
		// 	// setTotalNumberOfQuestions(0)
		// 	// setTotalFileUploadQuestions(0)
		// 	// setFormData(formValues)
		// 	// setShowSubmitArray([false, false])
		// }
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
	let futureDate
	const countdownHandler = (setduration = 1) => {
		futureDate = new Date()
		return futureDate.setHours(futureDate.getHours() + setduration);
	}
	const targetDate = useMemo(() => countdownHandler(Number(duration)), [duration]);
	console.log('formData:', formData);
	console.log('testQuestions:', testQuestions);
	console.log('duration:', duration);
	const layoutType = testQuestions?.length
	console.log({isMobile})
	return (
		<>
			<PageHead {...{title: 'test'}} />
			{/* <!-- body --> */}
			<div className="section contact_section tests_bg">
				<form onSubmit={submitHandler} className="t_Form">
					<div className={layoutType?"questionForm":"testForm"}>
						{layoutType?
						<>
							<div style={{...styles.countdown, ...!isMobile?styles.countdownPC:styles.countdownMobile}}>
								<MemoCountdown targetDate={targetDate} />
							</div>
							<TestQuestions {...args} />
						</>
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
	countdown: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	countdownPC: {
		paddingBottom: 30,
	},
	countdownMobile: {
		paddingBottom: 20,
	},
}

