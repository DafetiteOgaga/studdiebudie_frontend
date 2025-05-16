import { Link } from "react-router-dom"
import i1 from "../statics/images/i1.png"
import i2 from "../statics/images/i2.png"
import i3 from "../statics/images/i3.png"
import i4 from "../statics/images/i4.png"
// import i5 from "../statics/images/i5.png"
// import i6 from "../statics/images/i6.png"
// import i7 from "../statics/images/i7.png"

export default function SectionBar() {
	const itemColor = [
		'#e4e4e2',
		'lightblue',
		'rgb(212, 168, 30)',
		// '#12385b'
		'#095a83'
	]
	return (
		<div className="section tabbar_menu">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="tab_menu">
							<ul className="ul_menu" style={{margin: '0.5rem 0'}}>
								<li className="menu-out" style={{backgroundColor: itemColor[0]}}>
									<a href="#s" className="menu-out-anchor">
										<span className="icon"><img src={i1} alt="#" /></span>
										<span>History</span>
									</a>
								</li>
								<li className="menu-out" style={{backgroundColor: itemColor[1]}}>
									<Link to={'/scramble'} className="menu-out-anchor">
										<span className="icon">
											<img src={i2} alt="#" />
										</span>
										<span>
											Create
										</span>
									</Link>
								</li>
								<li className="menu-out" style={{backgroundColor: itemColor[2]}}>
									<Link to={'/tests'} className="menu-out-anchor">
										<span className="icon">
											<img src={i3} alt="#" />
										</span>
										<span>
											Take Test
										</span>
									</Link>
								</li>
								<li className="menu-out" style={{backgroundColor: itemColor[3]}}>
									<Link to={'/contribute'} className="menu-out-anchor">
										<span className="icon">
											<img src={i4} alt="#" />
										</span>
										<span>
											Contribute
										</span>
									</Link>
								</li>
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
