import banner from "../statics/images/banner_img.png"

export default function Banner () {
	return (
		<>
			<div className="pogoSlider">
				<div
				style={{
					backgroundImage: `url(${banner})`,
					backgroundSize: 'contain',
				}}>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="slide_text">
									<h3 style={{color: "lightblue"}}>
										<br/>
										The perfect place to <span style={{color: '#d4a81e'}}>create, scramble and mark </span> your test and  examiniation
									</h3>
									<br/>
									{/* <h4>Free Educations</h4> */}
									<br/>
									<div className="full center">
										{/* <a className="contact_bt" href="courses.html">Start a Course</a> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}