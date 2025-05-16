import { useEffect, useState } from 'react';
import { ConvertCase } from '../../hooks/ConvertCase';
// import { DateTimeID } from '../../hooks/DateTimeID';

const typeArray = ['type', 'primary/basic', 'secondary'];
const primaryArray = ['class', 'basic 1', 'basic 2', 'basic 3', 'basic 4', 'basic 5'];
const secondaryArray = ['class', 'jss 1', 'jss 2', 'jss 3', 'sss 1', 'sss 2', 'sss 3'];
const primarySubjectArray = ['subject', 'math', 'english', 'science', 'social studies'];
const secondarySubjectArray = ['subject', 'math', 'english', 'physics', 'chemistry', 'biology'];

// const testInputs = {
// 	name: "Dafetite",
// 	email: "hr@human-resource.com",
// 	type: "primary/basic",
// 	class: "basic 2",
// 	subject: "english",
// 	duration: "2",
// 	pretest: true
// }
function PreTest(args) {
	const {
		setFormData,
		submitButtonText,
	} = args;
	// const [info, setInfo] = useState(testInputs);
	const [info, setInfo] = useState({});
	// const dateTimeID = DateTimeID();
	const handleInfoChange = (e) => {
		const { name, value } = e.target;
		setInfo((prev) => ({
			...prev,
			[name]: value,
		}));
		if (name === 'typeCategory') {
			setInfo((prev) => ({
				...prev,
				classCategory: '',
				subject: '',
			}));
		}
		setFormData((prev) => ({
			...prev,
			[name]: value,
			pretest: true,
			// id: dateTimeID,
		}));
	}
	submitButtonText('start')
	// setFormData(info)
	console.log('info:', info)
	const classArray = (info?.typeCategory === 'primary/basic') ? primaryArray : (info?.typeCategory === 'secondary') ? secondaryArray : null;
	const subjectArray = (info?.typeCategory === 'primary/basic') ? primarySubjectArray : (info?.typeCategory === 'secondary') ? secondarySubjectArray : null;
	return (
		<div className="row pretest_bg">
			<div className="vertical_scroll">
				<div className="c_form">
					<fieldset>
						<div className="full field">
							<div style={styles.rowForm}>
								{/* name */}
								<input
								className="c_form_option_input"
								name="name" type="text"
								placeholder="Enter Your Name"
								value={info.name||''}
								onChange={handleInfoChange}
								required/>

								{/* email */}
								<input
								className="c_form_option_input"
								name="email" type="email"
								placeholder="Enter Your Email"
								value={info.email||''}
								onChange={handleInfoChange}/>
							</div>

							{/* typeCategory, classCategory, subject */}
							<div style={styles.rowForm}>
								{/* typeCategory */}
								<select
								// style={{width: '60%', background: formData.term ? '#f3f3f3':null}}
								className="c_form_input"
								value={info.typeCategory||''}
								onChange={handleInfoChange}
								name="typeCategory"
								required>
									{typeArray.map((type, index) => (
										<option key={index} value={type==='type'?'':type} disabled={type==='type'?true:false}>
											{ConvertCase(type||'')}
										</option>
									))}
								</select>

								{/* classCategory */}
								<select
								// style={{width: '60%', background: formData.term ? '#f3f3f3':null}}
								className="c_form_input"
								value={info.classCategory||'Class'}
								onChange={handleInfoChange}
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
								value={info.subject||'Subject'}
								onChange={handleInfoChange}
								disabled={!subjectArray}
								name="subject"
								required>
									{subjectArray?.map((subjectType, index) => (
										<option key={index} value={(subjectType==='subject')?'':subjectType}>
											{ConvertCase(subjectType||'')}
										</option>
									))||(<option>Subject</option>)}
								</select>

								{/* duration */}
								<input
								className="c_form_option_input"
								name="duration" type="duration"
								placeholder="Duration"
								value={info.duration||''}
								onChange={handleInfoChange}
								required/>
							</div>

							{/* wrong answer3 */}
							{/* <input
							className="c_form_option_input"
							name="wrong_answer3" type="text"
							placeholder="Wrong Answer"
							value={info.wrong_answer3||''}
							onChange={handleInfoChange}
							required
							/> */}
						</div>
					</fieldset>
				</div>
			</div>
		</div>
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
	},
	prevNextContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// paddingBottom: 10,
	},
	rowSpaced: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10,
	},
	imageContainer: {
		paddingBottom: 15,
	},
	rowForm: {
		flexDirection: 'row',
		display: 'flex',
		gap: 10
	},
};
export { PreTest };
