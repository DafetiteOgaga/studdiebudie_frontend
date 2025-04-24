import i1 from "../statics/images/i1.png"
import i2 from "../statics/images/i2.png"
import i3 from "../statics/images/i3.png"
import i4 from "../statics/images/i4.png"
// import i5 from "../statics/images/i5.png"
// import i6 from "../statics/images/i6.png"
// import i7 from "../statics/images/i7.png"

export default function SectionBar() {
	return (
		<div className="section tabbar_menu">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="tab_menu">
							<ul className="ul_menu">
								<li><a href="#s"><span className="icon"><img src={i1} alt="#" /></span><span>History</span></a></li>
								<li><a href="#s"><span className="icon"><img src={i2} alt="#" /></span><span>Create</span></a></li>
								<li><a href="#s"><span className="icon"><img src={i3} alt="#" /></span><span>Scramble</span></a></li>
								<li><a href="#s"><span className="icon"><img src={i4} alt="#" /></span><span>Mark</span></a></li>
								{/* <li><a href="#s"><span className="icon"><img src={i5} alt="#" /></span><span>Location</span></a></li>
								<li><a href="#s"><span className="icon"><img src={i6} alt="#" /></span><span>Call us</span></a></li>
								<li><a href="#s"><span className="icon"><img src={i7} alt="#" /></span><span>Email</span></a></li> */}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}