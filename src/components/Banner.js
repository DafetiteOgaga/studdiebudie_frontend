import banner from "../statics/images/banner_img.png"
import SectionBar from "./SectionBar"
import { useIsMobile } from "../hooks/IsMobile"

export default function Banner () {
	const isMobile = useIsMobile()
	return (
		<>
			<div>
				<div
				style={{
					backgroundImage: `url(${banner})`,
				}}>
					<div className="container">
						<div className="row">
							<div>
								<div className="slide_text">
									<h3 style={{color: "lightblue"}}>
										<br/>
										The perfect place to <span style={{color: '#d4a81e'}}>create, scramble and mark </span> your test and  examiniation
									</h3>
									<br/><br />
									{isMobile && <SectionBar />}
									{/* <h4>Free Educations</h4> */}
									{/* <br/> */}
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