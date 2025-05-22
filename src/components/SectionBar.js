import { Link } from "react-router-dom"
import i1 from "../statics/images/i1.png"
import i2 from "../statics/images/i2.png"
import i3 from "../statics/images/i3.png"
import i4 from "../statics/images/i4.png"
import { ConvertCase } from "../hooks/ConvertCase"

export default function SectionBar() {
	const sectionArray = [
		{
			id: 1,
			name: 'scramble questions',
			icon: i1,
			link: '/scramble',
			backgroundColor: '#e4e4e2'
		},
		{
			id: 2,
			name: 'take test',
			icon: i2,
			link: '/tests',
			backgroundColor: 'lightblue'
		},
		{
			id: 3,
			name: 'contribute',
			icon: i3,
			link: '/contribute',
			backgroundColor: 'rgb(212, 168, 30)'
		},
		{
			id: 4,
			name: 'contact us',
			icon: i4,
			link: '/contact',
			backgroundColor: '#095a83'
		}
	]
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="tab_menu">
							<ul className="ul_menu" style={{margin: '0.5rem 0'}}>
								{sectionArray.map((item, index) => (
									<li key={index} className="menu-out" style={{backgroundColor: item.backgroundColor}}>
										<Link to={item.link} className="menu-out-anchor">
											<span className="icon">
												<img src={item.icon} alt={item.name} />
											</span>
											<span>{ConvertCase(item.name)}</span>
										</Link>
									</li>))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
