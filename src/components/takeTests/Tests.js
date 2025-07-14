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
	const [isNoTest, setIsNoTest] = useState(null);
	const dateTimeID = DateTimeID();

	const submitHandler = async (e) => {
		e.preventDefault(); // prevent default page refresh
		console.log('pretest:', !!formData?.pretest)
		let cleanedData = {}
		let endpoint
		if (!!formData?.pretest) {
			// endpoint = '/pre-tests'
			endpoint = 'taketest/pretest'
			const { pretest, ...rest } = formData;
			cleanedData = { ...rest, id: dateTimeID };
		} else {
			endpoint = '/take-tests'
			cleanedData = { ...formData };
			console.log(
				'\nformData:', formData,
				'\nformData?.pretest:', !!formData?.pretest,
				'\ncleanedData:', cleanedData,
				'\nendpoint:', endpoint,
			)
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
				console.log('getQuestions:', getQuestions)
				if (getQuestions?.questions) {
					alert("Test questions are ready!\nClick 'ok' to start.");
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
				else if (getQuestions?.error) {
					setIsNoTest(getQuestions.error)
				}
			}
		}
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
	console.log('isNoTest:', isNoTest);
	useEffect(() => {
		if (isNoTest) {
			const delay = setTimeout(() => {
				setIsNoTest(null);
			}, 5000);
			return () => clearTimeout(delay);
		}
	}, [isNoTest])
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
					{isNoTest &&  <p style={{...styles.noTest, ...isMobile?styles.noTestMobile:styles.noTestPC}}>{isNoTest}</p>}
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
	noTest: {
		color: 'red',
		fontWeight: 450,
		textAlign: 'center',
		margin: 0,
	},
	noTestMobile: {
		fontSize: 14,
	},
	noTestPC: {
		fontSize: 16,
	},
}

