import img2 from "../statics/images/img2.png"

export default function WelcomeSection() {
	return (
		<div className="section margin-top_50">
			<div className="container">
				<div className="row">
					<div className="col-md-6 layout_padding_2">
						<div className="full">
							<div className="heading_main align_left">
								<h2><span>Welcome To</span> Dafetite</h2>
							</div>
							<div className="full">
								<p className="align_left">
									Welcome to Dafetite, the ultimate platform for conducting exams, quizzes, and tests
									with ease and efficiency. Whether you're a student preparing for an exam or an educator
									creating quizzes, Dafetite makes the process seamless and interactive.
									<br /><br />
									Our app shuffles questions to create a dynamic, randomized experience for every user,
									ensuring fairness and uniqueness in every test. With real-time marking and immediate
									feedback on answers, Dafetite helps you track progress and improve every session.
									<br /><br />
									Simplify the exam process, conduct interactive quizzes, and get accurate results in no
									time. Join Dafetite today - where testing meets innovation!
								</p>
							</div>
							{/* <div className="full">
								<a className="hvr-radial-out button-theme" href="#s">About more</a>
							</div> */}
						</div>
					</div>
					<div className="col-md-6 pad_bottom">
						<div className="full">
							<img src={img2} alt="#" style={{borderRadius: 5}} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
