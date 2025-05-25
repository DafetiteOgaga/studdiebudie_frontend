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
								<div className="slide_text slide_text_banner">
									<h3 style={{color: "lightblue"}}>
										<br />
										The perfect place to <span style={{color: '#d4a81e'}}>take tests,</span> <span style={{color: '#00C2CB'}}>create and scramble </span> your test and exam questions
									</h3>
									<br />
									<br />
									<br />
									{isMobile && <><SectionBar /></>}
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